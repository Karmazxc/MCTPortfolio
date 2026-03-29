// @ts-nocheck
"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/Button";
import { Inbox, CheckCircle, Database, Search, Filter, ExternalLink, Mail, Trash2, Plus, Loader2, Award, Camera, LogOut, ShieldAlert, FileCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"projects" | "inquiries" | "about" | "logs">("inquiries");
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Form States for New Project
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "Web",
    tech: "",
    image: "",
    demoLink: "",
  });
  const [uploadMode, setUploadMode] = useState<"url" | "file">("url");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);

  // About Proof States
  const [newProof, setNewProof] = useState({ title: "", category: "technical" });
  const [isUploadingProof, setIsUploadingProof] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  
  // Convex Mutations
  const updateQuoteStatus = useMutation(api.quotations.updateStatus);
  const deleteQuote = useMutation(api.quotations.deleteQuotation);
  const createProject = useMutation(api.projects.addProject);
  const generateUploadUrl = useMutation(api.proofs.generateUploadUrl);
  const saveProof = useMutation(api.proofs.saveProof);
  const deleteProof = useMutation(api.proofs.deleteProof);
  // Fallback to saveProof hook reference if logs aren't generated yet to prevent useMutation(undefined) crash
  const addLog = useMutation(api.logs ? api.logs.addLog : api.proofs.saveProof);

  // Convex Queries
  const proofs = useQuery(api.proofs.getProofs, {}) || [];
  const logs = useQuery(api.logs ? api.logs.getLogs : api.proofs.getProofs, {}) || [];
  
  /*
# Portfolio Refinement & Phase 5: Payment Proofs

We are extending the Admin Dashboard with a secure "Payment Proof" uploader. This allows the administrator to associate transaction screenshots (e.g., GCash, Bank Transfer receipts) with specific client inquiries/quotations using Convex's file storage.

## Proposed Changes

### 1. Backend (Convex)
- [MODIFY] `convex/schema.ts`: Add `paymentProofs` table with fields for `quoteId`, `fileId` (storage ID), and `uploadedAt`.
- [NEW] `convex/files.ts`: Implement `generateUploadUrl` to enable client-side file uploads.
- [NEW] `convex/payments.ts`: Implement mutations to save proof metadata and queries to retrieve proofs per quotation.

### 2. Admin UI Refinement
- [MODIFY] `src/app/admin/page.tsx`: 
  - Add an "Admin Actions" section to each inquiry card.
  - Implement a proof-of-payment gallery/modal for each client.

## Verification Plan

### Automated Tests
- [ ] Test the Convex mutation for saving payment proofs with a mock storage ID.
- [ ] Verify that the `generateUploadUrl` returns a valid Convex upload endpoint.

### Manual Verification
- [ ] Perform a live file upload in the Admin Dashboard and confirm the image appears in the gallery.
- [ ] Verify that proofs are correctly associated with the selected client inquiry.
- [ ] Check image rendering and modal behavior for uploaded receipts.
*/
  // Real Convex Data + Offline Simulation for Demo
  const dbInquiries = useQuery(api.quotations.getQuotations) || [];
  const [offlineInquiries, setOfflineInquiries] = useState<any[]>([]);

  React.useEffect(() => {
    const local = JSON.parse(localStorage.getItem("offline_quotations") || "[]");
    setOfflineInquiries(local);
  }, []);

  const allInquiries = [...offlineInquiries, ...dbInquiries];

  const filteredInquiries = allInquiries.filter(q => {
    const matchesFilter = filterType === "all" || q.projectType === filterType;
    const clientName = q.clientName || "";
    const email = q.email || "";
    const details = q.details || "";
    const matchesSearch = clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const removeOffline = (id: string) => {
    const updated = offlineInquiries.filter(q => q._id !== id);
    setOfflineInquiries(updated);
    localStorage.setItem("offline_quotations", JSON.stringify(updated));
  };

  const pendingCount = allInquiries.filter(q => q.status === "pending").length;

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="container mx-auto px-6 py-24 max-w-6xl min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
             <span className="w-8 h-px bg-[#06b6d4]"></span>
             <span className="text-[10px] font-black text-[#06b6d4] uppercase tracking-[0.3em]">Command Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">Admin <span className="text-[#06b6d4]">Dashboard</span></h1>
        </div>
        
        <div className="flex bg-[#0F172A] border border-white/5 rounded-2xl p-1.5 shadow-2xl backdrop-blur-xl">
          <button 
            onClick={() => setActiveTab("inquiries")}
            className={`px-6 py-3 flex items-center gap-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "inquiries" ? "bg-[#06b6d4] text-[#0F172A] shadow-[0_0_20px_rgba(6,182,212,0.3)]" : "text-white/40 hover:text-white/60"}`}
          >
            <Inbox size={14} /> 
            Inquiries
            {pendingCount > 0 && (
               <span className="px-1.5 py-0.5 rounded bg-[#f43f5e] text-white text-[8px] animate-pulse">{pendingCount}</span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab("projects")}
            className={`px-6 py-3 flex items-center gap-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "projects" ? "bg-[#06b6d4] text-[#0F172A] shadow-[0_0_20px_rgba(6,182,212,0.3)]" : "text-white/40 hover:text-white/60"}`}
          >
            <Database size={14} /> Projects
          </button>
          <button 
            onClick={() => setActiveTab("about")}
            className={`px-6 py-3 flex items-center gap-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "about" ? "bg-[#06b6d4] text-[#0F172A] shadow-[0_0_20px_rgba(6,182,212,0.3)]" : "text-white/40 hover:text-white/60"}`}
          >
            <FileCheck size={14} /> Evidence & Receipts
          </button>
          <button 
            onClick={() => setActiveTab("logs")}
            className={`px-6 py-3 flex items-center gap-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "logs" ? "bg-[#06b6d4] text-[#0F172A] shadow-[0_0_20px_rgba(6,182,212,0.3)]" : "text-white/40 hover:text-white/60"}`}
          >
            <ShieldAlert size={14} /> System Logs
          </button>
          
          <div className="w-px h-8 bg-white/5 mx-2 my-auto"></div>
          
          <button 
            onClick={handleLogout}
            className="px-6 py-3 flex items-center gap-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#f43f5e] hover:bg-[#f43f5e]/10 transition-all"
            title="Logout"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>

      {(!process.env.NEXT_PUBLIC_CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL.includes("placeholder")) && (
        <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-4 animate-pulse">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">
            ⚠️ Backend Disconnected: Please set NEXT_PUBLIC_CONVEX_URL in .env.local to enable real-time uploads.
          </p>
        </div>
      )}

      {activeTab === "inquiries" ? (
        <div className="space-y-8">
          {/* SEARCH & FILTERS */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 border border-white/5 p-4 rounded-2xl backdrop-blur-md">
            <div className="relative w-full md:w-96">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
               <input 
                type="text" 
                placeholder="Search clients, emails, or details..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[#06b6d4]/50 transition-all font-medium uppercase tracking-wider"
               />
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
               {["all", "web", "mobile", "thesis"].map((t) => (
                 <button 
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${filterType === t ? "bg-[#06b6d4]/10 border-[#06b6d4]/50 text-[#06b6d4]" : "border-white/5 text-white/30 hover:border-white/10"}`}
                 >
                   {t}
                 </button>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredInquiries.length === 0 ? (
              <div className="card-styled p-20 flex flex-col items-center justify-center text-center opacity-30 border-dashed border-white/10">
                 <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <Inbox size={40} />
                 </div>
                 <p className="text-sm font-black text-white uppercase tracking-[0.3em]">No Inquiries Matched</p>
                 <p className="text-[10px] text-white/50 uppercase tracking-widest mt-2">Adjust your filters or check back later.</p>
              </div>
            ) : (
              filteredInquiries.map((quote) => (
                <div key={quote._id} className="card-styled border-white/5 bg-[#0B1121]/40 hover:bg-[#0B1121]/60 transition-all duration-500 overflow-hidden group">
                  <div className="flex flex-col lg:flex-row">
                    {/* Status Indicator Bar */}
                    <div className={`w-full lg:w-1.5 h-1.5 lg:h-auto ${quote.status === "pending" ? "bg-[#f43f5e]" : "bg-emerald-500"}`}></div>
                    
                    <div className="p-8 flex-grow">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                        <div className="space-y-4 flex-grow">
                          <div className="flex items-center gap-4 text-xs font-black text-white uppercase tracking-tight">
                            <h3 className="text-xl font-black text-white uppercase tracking-tight">{quote.clientName}</h3>
                            <span className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-white/5 border border-white/5 text-[#06b6d4]">
                              {quote.projectType}
                            </span>
                            {quote.isOffline && (
                               <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[8px] font-black uppercase tracking-widest animate-pulse">
                                 Simulated Test
                               </span>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-widest text-white/30">
                            <div className="flex items-center gap-2"><Mail size={12}/> {quote.email}</div>
                            <div className="flex items-center gap-2 text-[#fbbf24]"><Database size={12}/> {quote.budget}</div>
                            <div className="flex items-center gap-2 text-[#06b6d4]"><CheckCircle size={12}/> Deadline: {quote.deadline}</div>
                          </div>

                          <div className="bg-white/5 border border-white/5 rounded-xl p-6 relative group/inner">
                             <p className="text-xs text-white/70 leading-relaxed font-medium">"{quote.details || "No details provided"}"</p>
                             <div className="absolute top-4 right-4 text-white/5 group-hover/inner:text-white/10 transition-colors uppercase font-black text-[8px] tracking-[0.4em]">Message Payload</div>
                          </div>

                          {/* PAYMENT PROOF UPLOADER INTEGRATION */}
                        </div>

                        <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
                           <Button 
                             disabled={quote.isOffline}
                             onClick={() => updateQuoteStatus({ id: quote._id, status: "completed" })}
                             className={`flex-1 md:flex-none font-black text-[10px] uppercase tracking-widest px-6 py-4 rounded-xl transition-all border-none ${quote.isOffline ? "bg-white/5 text-white/20" : "bg-emerald-500 text-emerald-950 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"}`}
                           >
                             <CheckCircle size={14} className="mr-2" /> Mark Complete
                           </Button>
                           <a href={`mailto:${quote.email}`} className="flex-1 md:flex-none">
                             <Button variant="outline" className="w-full bg-white/5 border-white/10 text-white font-black text-[10px] uppercase tracking-widest px-6 py-4 rounded-xl hover:bg-white/10 transition-all">
                               <Mail size={14} className="mr-2" /> Send Reply
                             </Button>
                           </a>
                           <Button 
                             onClick={() => {
                               if (confirm("Delete this inquiry permanently?")) {
                                 if (quote.isOffline) {
                                   removeOffline(quote._id);
                                 } else {
                                   deleteQuote({ id: quote._id });
                                 }
                               }
                             }}
                             variant="outline" className="flex-1 md:flex-none border-white/5 text-white/20 hover:text-white/40 hover:border-white/10 transition-all py-3 rounded-xl"
                           >
                             <Trash2 size={14} />
                           </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : activeTab === "projects" ? (
        <div className="max-w-4xl mx-auto">
           {/* Previous Project Form with refined styling */}
           <div className="card-styled p-10 border-white/5 relative overflow-hidden">
             {/* ... (rest of project form remains same) ... */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#06b6d4]/5 rounded-full blur-[100px] pointer-events-none"></div>
             {/* Project form content I already fixed in previous turn ... */}
             <h2 className="text-2xl font-black text-white mb-10 uppercase tracking-[0.2em] italic border-b border-white/5 pb-6">
                Ingest <span className="text-[#06b6d4]">New Output</span>
             </h2>

             <form 
               onSubmit={async (e) => {
                 e.preventDefault();
                 setIsDeploying(true);
                 try {
                   let finalImageUrl = newProject.image;

                   if (uploadMode === "file" && selectedFile) {
                     const postUrl = await generateUploadUrl();
                     const result = await fetch(postUrl, {
                       method: "POST",
                       headers: { "Content-Type": selectedFile.type },
                       body: selectedFile,
                     });
                     const { storageId } = await result.json();
                     finalImageUrl = storageId;
                   }

                   await createProject({
                     ...newProject,
                     image: finalImageUrl,
                     tech: newProject.tech.split(",").map(t => t.trim()).filter(Boolean)
                   });
                   setNewProject({ title: "", description: "", category: "Web", tech: "", image: "", demoLink: "" });
                   setSelectedFile(null);
                   alert("Project deployed successfully!");
                 } catch (err) {
                   alert("Error deploying project: " + err.message);
                 } finally {
                   setIsDeploying(false);
                 }
               }}
               className="grid grid-cols-1 md:grid-cols-2 gap-8"
             >
                 {/* ... project form inputs ... */}
                 <div className="md:col-span-2 space-y-2">
                   <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">Project Title</label>
                   <input required value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-[#06b6d4]/50 focus:outline-none transition-all" />
                 </div>
                 <div className="md:col-span-2 space-y-2">
                   <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">Strategic Description</label>
                   <textarea required rows={4} value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-[#06b6d4]/50 focus:outline-none resize-none transition-all" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">Category Segment</label>
                   <select value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-[#06b6d4]/50 focus:outline-none appearance-none uppercase font-black">
                     <option className="bg-[#0F172A] text-white" value="Web">Web Engine</option>
                     <option className="bg-[#0F172A] text-white" value="Mobile">Mobile Hub</option>
                     <option className="bg-[#0F172A] text-white" value="Thesis">Academic Thesis</option>
                   </select>
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">Asset URL / Upload</label>
                   <div className="flex gap-2 mb-2">
                      <button type="button" onClick={() => setUploadMode("url")} className={`px-3 py-1 text-[8px] rounded ${uploadMode === "url" ? "bg-[#06b6d4] text-black" : "bg-white/5 text-white/40"}`}>URL</button>
                      <button type="button" onClick={() => setUploadMode("file")} className={`px-3 py-1 text-[8px] rounded ${uploadMode === "file" ? "bg-[#06b6d4] text-black" : "bg-white/5 text-white/40"}`}>FileUpload</button>
                   </div>
                   {uploadMode === "url" ? (
                     <input value={newProject.image} onChange={e => setNewProject({...newProject, image: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm" />
                   ) : (
                     <input type="file" onChange={e => setSelectedFile(e.target.files?.[0] || null)} className="w-full text-xs text-white/40" />
                   )}
                 </div>
                 <div className="md:col-span-2 space-y-2">
                   <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">Tech Stack</label>
                   <input required value={newProject.tech} onChange={e => setNewProject({...newProject, tech: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm" placeholder="React, Next.js, etc." />
                 </div>
                 <div className="md:col-span-2 space-y-2">
                   <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">Demo URL (Optional)</label>
                   <input value={newProject.demoLink} onChange={e => setNewProject({...newProject, demoLink: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm" />
                 </div>
                 <div className="pt-6 md:col-span-2">
                   <Button disabled={isDeploying} variant="cyan" className="w-full py-5 text-[11px] font-black tracking-[0.3em] uppercase rounded-xl bg-[#06b6d4] text-black">
                      {isDeploying ? <Loader2 className="animate-spin" /> : <Plus size={16} />} Deploy Update
                   </Button>
                 </div>
             </form>
           </div>
        </div>
      ) : activeTab === "about" ? (
        <div className="space-y-12">
           <div className="card-styled p-10 border-white/5">
              <h2 className="text-2xl font-black text-white mb-10 uppercase tracking-[0.2em] italic border-b border-white/5 pb-6 text-center md:text-left">
                 Client <span className="text-emerald-500">Receipts</span> & <span className="text-[#fbbf24]">Evidence</span>
              </h2>
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!proofFile) return alert("Select a file first");
                  setIsUploadingProof(true);
                  try {
                    // 10 second timeout for the upload promise
                    const uploadPromise = (async () => {
                      const postUrl = await generateUploadUrl();
                      const result = await fetch(postUrl, {
                        method: "POST",
                        headers: { "Content-Type": proofFile.type },
                        body: proofFile,
                      });
                      return result;
                    })();

                    const timeoutPromise = new Promise((_, reject) => 
                      setTimeout(() => reject(new Error("Connection Timeout: Backend not responding.")), 10000)
                    );

                    const result = await Promise.race([uploadPromise, timeoutPromise]) as Response;
                    
                    if (!result.ok) {
                      const errorText = await result.text();
                      throw new Error(`Upload failed: ${errorText || result.statusText}`);
                    }

                    const { storageId } = await result.json();
                    
                    if (!storageId) {
                      throw new Error("Failed to retrieve storage ID from server.");
                    }

                    await saveProof({ 
                      title: "Verified Transaction", 
                      category: "transactions", 
                      fileId: storageId 
                    });

                    if (addLog) {
                      await addLog({
                        action: "UPLOAD_PROOF",
                        details: `Uploaded transaction proof: ${proofFile.name}`,
                        userIdentifier: "Admin"
                      });
                    }

                    setProofFile(null);
                    alert("✅ Artifact Published! It is now live on your About page.");
                  } catch (err) {
                    console.error("Upload error:", err);
                    alert("Upload Error: " + (err instanceof Error ? err.message : String(err)));
                  } finally {
                    setIsUploadingProof(false);
                  }
                }}
                className="flex flex-col items-center gap-8 py-6"
              >
                <div className="w-full max-w-sm space-y-4">
                   <div className="flex items-center justify-between">
                     <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Select Proof Image</label>
                     {proofFile && <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">Ready to Publish</span>}
                   </div>
                   
                   <div className="relative group overflow-hidden rounded-2xl border border-white/10 hover:border-[#fbbf24]/50 transition-all bg-white/5 p-1">
                     <input 
                       required 
                       type="file" 
                       accept="image/*"
                       onChange={e => setProofFile(e.target.files?.[0] || null)} 
                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                     />
                     <div className="px-5 py-6 flex items-center justify-center gap-4 text-center">
                        <div className="p-3 rounded-xl bg-[#fbbf24]/10 text-[#fbbf24] group-hover:scale-110 transition-transform">
                          <Plus size={24} />
                        </div>
                        <div className="text-left">
                           <p className="text-sm font-bold text-white uppercase tracking-tight">{proofFile ? proofFile.name : "Choose File"}</p>
                           <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mt-0.5">JPG, PNG, WEBP ONLY</p>
                        </div>
                     </div>
                   </div>
                </div>

                <Button 
                  disabled={isUploadingProof || !proofFile} 
                  variant="primary" 
                  className="w-full max-w-sm py-5 bg-[#fbbf24] text-black font-black uppercase tracking-[0.2em] rounded-2xl border-none shadow-[0_0_30px_rgba(251,191,36,0.1)] hover:shadow-[0_0_40px_rgba(251,191,36,0.3)] transition-all"
                >
                  {isUploadingProof ? <Loader2 className="animate-spin" /> : "Publish to Carousel ⚡"}
                </Button>
              </form>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {proofs.map((proof: any) => (
                <div key={proof._id} className="card-styled overflow-hidden group border-white/5 hover:border-[#fbbf24]/30 transition-all">
                   <div className="h-40 bg-[#1E293B] relative overflow-hidden">
                      <img src={proof.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={proof.title} />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                         <button 
                           onClick={async () => {
                             if(confirm("Delete this proof?")) {
                               await deleteProof({ id: proof._id });
                               if (addLog) {
                                 await addLog({
                                   action: "DELETE_PROOF",
                                   details: `Deleted transaction proof: ${proof.title}`,
                                   userIdentifier: "Admin"
                                 });
                               }
                             }
                           }}
                           className="p-3 bg-red-500/20 text-red-500 rounded-full hover:bg-red-500/40 transition-all"
                         >
                           <Trash2 size={20} />
                         </button>
                      </div>
                   </div>
                   <div className="p-4 bg-[#0B1121]">
                      <h4 className="text-[10px] font-black text-white uppercase tracking-widest truncate">{proof.title}</h4>
                      <p className="text-[8px] text-[#fbbf24] uppercase font-black tracking-widest mt-1">{proof.category}</p>
                   </div>
                </div>
              ))}
              {proofs.length === 0 && (
                <div className="md:col-span-3 py-20 text-center opacity-20 border-dashed border-white/10 border-2 rounded-2xl">
                   <Camera size={40} className="mx-auto mb-4" />
                   <p className="text-xs font-black uppercase tracking-widest text-white">No Diagnostic Artifacts Found</p>
                </div>
              )}
           </div>
        </div>
      ) : activeTab === "logs" ? (
        <div className="space-y-6">
          <div className="card-styled p-8 border-white/5 bg-[#0B1121]/40">
             <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
                <ShieldAlert className="text-[#06b6d4]" size={20} />
                <h3 className="text-sm font-black text-white uppercase tracking-widest">Audit Trail: Dashboard Activity</h3>
             </div>
             
             <div className="space-y-4">
               {!api.logs ? (
                 <div className="py-20 text-center opacity-40 border-2 border-dashed border-white/5 rounded-2xl">
                    <Database className="mx-auto mb-4 text-[#06b6d4]" size={40} />
                    <p className="text-xs font-black uppercase tracking-widest text-white mb-2">Backend Sync Required</p>
                    <p className="text-[9px] font-bold text-white/30 max-w-xs mx-auto">Please run <code className="text-[#06b6d4]">npx convex dev</code> to generate the Audit Log schema in your local environment.</p>
                 </div>
               ) : logs.length === 0 ? (
                 <div className="py-12 text-center opacity-20">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em]">No activity recorded yet.</p>
                 </div>
               ) : (
                 logs.map((log: any) => (
                   <div key={log._id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#06b6d4]/30 transition-all gap-4">
                      <div className="flex items-center gap-4">
                         <div className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest ${
                           log.action?.includes("DELETE") ? "bg-red-500/10 text-red-500" : 
                           log.action?.includes("UPLOAD") ? "bg-emerald-500/10 text-emerald-500" : 
                           "bg-[#06b6d4]/10 text-[#06b6d4]"
                         }`}>
                           {log.action}
                         </div>
                         <p className="text-[11px] font-bold text-white/80">{log.details}</p>
                      </div>
                      <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-white/30">
                         <span>{new Date(log.timestamp).toLocaleString()}</span>
                         <span className="px-1.5 py-0.5 rounded bg-white/5">{log.userIdentifier}</span>
                      </div>
                   </div>
                 ))
               )}
             </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
