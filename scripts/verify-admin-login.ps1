param(
  [string]$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path,
  [int]$BasePort = 3200
)

function Stop-TestServer {
  param([System.Management.Automation.Job]$Job)

  if (-not $Job) {
    return
  }

  Stop-Job -Job $Job -ErrorAction SilentlyContinue | Out-Null
  Receive-Job -Job $Job -ErrorAction SilentlyContinue | Out-Null
  Remove-Job -Job $Job -Force -ErrorAction SilentlyContinue | Out-Null
}

function Wait-ForServer {
  param([int]$Port)

  $deadline = (Get-Date).AddSeconds(90)
  while ((Get-Date) -lt $deadline) {
    Start-Sleep -Seconds 3
    try {
      $response = Invoke-WebRequest -Uri "http://127.0.0.1:$Port/portal/mark-admin-2026" -UseBasicParsing -TimeoutSec 5
      if ($response.StatusCode -ge 200) {
        return
      }
    } catch {
    }
  }

  throw "Server on port $Port did not become ready in time."
}

function Invoke-LoginRequest {
  param([int]$Port)

  $body = @{
    password = "Super_Marky_06"
    secretKey = "marky_key_99"
  } | ConvertTo-Json

  try {
    $response = Invoke-WebRequest -Uri "http://127.0.0.1:$Port/api/admin/login" -Method POST -ContentType "application/json" -Body $body -UseBasicParsing -TimeoutSec 10
    return @{
      StatusCode = [int]$response.StatusCode
      Body = $response.Content
    }
  } catch {
    if (-not $_.Exception.Response) {
      throw
    }

    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    return @{
      StatusCode = [int]$_.Exception.Response.StatusCode
      Body = $reader.ReadToEnd()
    }
  }
}

function Invoke-Case {
  param(
    [string]$Name,
    [int]$Port,
    [string]$AdminPassword,
    [string]$AdminSecretKey,
    [int]$ExpectedStatus,
    [string]$ExpectedBodyPattern,
    [bool]$UseLocalEnvFile = $true
  )

  $envFilePath = Join-Path $RepoRoot ".env.local"
  $envBackupPath = Join-Path $RepoRoot ".env.local.test-backup"

  if (-not $UseLocalEnvFile -and (Test-Path $envFilePath)) {
    Move-Item -LiteralPath $envFilePath -Destination $envBackupPath -Force
  }

  $job = Start-Job -ScriptBlock {
    param($RepoRoot, $Port, $AdminPassword, $AdminSecretKey)
    Set-Location $RepoRoot
    $env:ADMIN_PASSWORD = $AdminPassword
    $env:ADMIN_SECRET_KEY = $AdminSecretKey
    npm run dev -- --port $Port
  } -ArgumentList $RepoRoot, $Port, $AdminPassword, $AdminSecretKey

  try {
    Wait-ForServer -Port $Port
    $result = Invoke-LoginRequest -Port $Port

    if ($result.StatusCode -ne $ExpectedStatus) {
      throw "$Name failed. Expected status $ExpectedStatus but got $($result.StatusCode). Body: $($result.Body)"
    }

    if ($ExpectedBodyPattern -and $result.Body -notmatch $ExpectedBodyPattern) {
      throw "$Name failed. Response body did not match '$ExpectedBodyPattern'. Body: $($result.Body)"
    }

    Write-Output "PASS: $Name"
  } finally {
    Stop-TestServer -Job $job

    if (-not $UseLocalEnvFile -and (Test-Path $envBackupPath)) {
      Move-Item -LiteralPath $envBackupPath -Destination $envFilePath -Force
    }
  }
}

Invoke-Case -Name "configured admin login succeeds" -Port $BasePort -AdminPassword "Super_Marky_06" -AdminSecretKey "marky_key_99" -ExpectedStatus 200 -ExpectedBodyPattern '"success":true'
Invoke-Case -Name "missing admin auth config returns setup error" -Port ($BasePort + 1) -AdminPassword "" -AdminSecretKey "" -ExpectedStatus 500 -ExpectedBodyPattern "not configured" -UseLocalEnvFile $false
