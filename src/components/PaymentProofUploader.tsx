// @ts-nocheck
"use client";

import React, { useState, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/Button";
import { Upload, X, Loader2, Image as ImageIcon, CheckCircle, AlertCircle, Eye } from "lucide-react";

interface PaymentProofUploaderProps {
  quoteId: any;
}

export function PaymentProofUploader({ quoteId }: PaymentProofUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const savePaymentProof = useMutation(api.payments.savePaymentProof);
  const updateProofStatus = useMutation(api.payments.updateProofStatus);
  const proofs = useQuery(
    api.payments.getPaymentProofs, 
    typeof quoteId === "string" && quoteId.startsWith("offline_") ? "skip" : { quoteId }
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      // 1. Get upload URL
      const postUrl = await generateUploadUrl();

      // 2. Upload file to storage
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": selectedFile.type },
        body: selectedFile,
      });

      const { storageId } = await result.json();

      // 3. Save metadata
      await savePaymentProof({
        quoteId,
        fileId: storageId,
        notes: `Manual upload by admin at ${new Date().toLocaleString()}`,
      });

      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload proof. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Transaction Proofs</h4>
        <span className="text-[9px] font-bold text-[#06b6d4] bg-[#06b6d4]/10 px-2 py-0.5 rounded uppercase tracking-widest">
          Secure Storage Active
        </span>
      </div>

      {/* UPLOADER */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-grow">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
            id={`file-upload-${quoteId}`}
          />
          <label
            htmlFor={`file-upload-${quoteId}`}
            className="group flex items-center justify-center gap-3 w-full h-12 bg-white/5 border border-dashed border-white/10 rounded-xl cursor-pointer hover:border-[#06b6d4]/50 hover:bg-[#06b6d4]/5 transition-all text-white/40 hover:text-[#06b6d4]"
          >
            {selectedFile ? (
              <span className="text-xs font-bold truncate max-w-[200px]">{selectedFile.name}</span>
            ) : (
              <>
                <Upload size={14} className="group-hover:animate-bounce" />
                <span className="text-[10px] font-black uppercase tracking-widest">Select Payment Screenshot</span>
              </>
            )}
          </label>
        </div>
        
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          variant="cyan"
          className="h-12 px-8 min-w-[120px] font-black text-[10px] uppercase tracking-widest gap-2 disabled:opacity-30"
        >
          {uploading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>Ingest Proof</>
          )}
        </Button>
      </div>

      {/* PROOF LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {proofs?.map((proof) => (
          <div key={proof._id} className="group relative flex items-center gap-4 p-4 bg-[#0F172A] border border-white/5 rounded-xl hover:border-[#06b6d4]/30 transition-all">
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden border border-white/10">
              <img src={proof.url} alt="Proof" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-1.5 h-1.5 rounded-full ${
                  proof.status === "verified" ? "bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" : 
                  proof.status === "rejected" ? "bg-rose-500" : "bg-amber-500"
                }`}></span>
                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">{proof.status}</span>
              </div>
              <p className="text-[10px] font-bold text-white/60 truncate italic opacity-50">Uploaded {new Date(proof.uploadedAt).toLocaleDateString()}</p>
            </div>

            <div className="flex gap-2">
               <a href={proof.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 text-white/20 hover:text-white hover:bg-white/10 transition-all">
                 <Eye size={12} />
               </a>
               <button 
                 onClick={() => updateProofStatus({ proofId: proof._id, status: "verified" })}
                 className="p-2 rounded-lg bg-white/5 text-emerald-500/20 hover:text-emerald-500 hover:bg-emerald-500/10 transition-all"
               >
                 <CheckCircle size={12} />
               </button>
            </div>
          </div>
        ))}

        {!proofs?.length && !uploading && (
          <div className="sm:col-span-2 p-8 border border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center opacity-20">
             <ImageIcon size={24} className="mb-2" />
             <p className="text-[10px] font-black uppercase tracking-[0.2em]">No Transaction Artifacts Found</p>
          </div>
        )}
      </div>
    </div>
  );
}
