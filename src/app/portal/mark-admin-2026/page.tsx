"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ShieldAlert, Key, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // In a real app, this would be an API call
      // For now, we simulate the validation against env vars via a server action or API
      const res = await fetch("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ password, secretKey }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        const data = await res.json();
        setError(data.message || "Invalid credentials. Attempt logged.");
      }
    } catch (err) {
      setError("System error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent)] pointer-events-none"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#06b6d4]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#f43f5e]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#06b6d4]/10 border border-[#06b6d4]/20 text-[#06b6d4] mb-6 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">Secure <span className="text-[#06b6d4]">Portal</span></h1>
          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Authorized Personnel Only</p>
        </div>

        <div className="card-styled p-8 border-white/5 bg-[#0B1121]/50 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#06b6d4]/50 to-transparent"></div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-[#f43f5e]/10 border border-[#f43f5e]/30 text-[#f43f5e] p-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 animate-shake">
                <ShieldAlert size={16} />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[9px] font-black text-white/40 uppercase tracking-widest">Master Password</label>
              <div className="relative">
                <input 
                  required
                  type={showPass ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:outline-none focus:border-[#06b6d4]/50 transition-colors"
                  placeholder="••••••••••••"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-white/40 uppercase tracking-widest">Secret Vault Key</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
                  <Key size={18} />
                </div>
                <input 
                  required
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-[#06b6d4]/50 transition-colors"
                  placeholder="MARK-XXXX-XXXX"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#06b6d4] text-[#0A0F1C] font-black py-4 rounded-xl text-[11px] uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all group/btn"
            >
              <div className="flex items-center justify-center gap-2">
                {loading ? "Decrypting..." : "Access Dashboard"}
                {!loading && <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />}
              </div>
            </Button>
          </form>
        </div>

        <p className="text-center mt-8 text-[9px] font-black text-white/10 uppercase tracking-[0.4em]">
          All access attempts are logged with IP & Geolocation
        </p>
      </div>
    </div>
  );
}
