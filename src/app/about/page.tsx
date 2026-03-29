"use client";

import React from "react";
import { 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Award, 
  Camera,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  MessageSquare,
  Facebook,
  Mail,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  FileCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { STATS, PRICING, CONTACT } from "@/lib/constants";

// Demo/placeholder proof cards to showcase the layout
const DEMO_PROOFS = [
  {
    _id: "demo-1",
    title: "GCash Payment - Project Deposit",
    category: "transactions",
    url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
    uploadedAt: Date.now() - 86400000,
  },
  {
    _id: "demo-2",
    title: "Bank Transfer Receipt - Web App",
    category: "transactions",
    url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
    uploadedAt: Date.now() - 172800000,
  },
  {
    _id: "demo-3",
    title: "PayPal Verification - Thesis Project",
    category: "transactions",
    url: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    uploadedAt: Date.now() - 259200000,
  },
];

export default function AboutPage() {
  const proofs = useQuery(api.proofs.getProofs) || [];
  // Show demo proofs if no real proofs exist
  const displayProofs = proofs.length > 0 ? proofs : DEMO_PROOFS;
  const [carouselIndex, setCarouselIndex] = React.useState(0);
  return (
    <div className="container mx-auto px-6 py-24 max-w-5xl">

      {/* MY JOURNEY TIMELINE */}
      <section className="mb-24">
        <h2 className="text-3xl font-black text-white mb-12 italic uppercase tracking-tighter">Freelance <span className="text-[#fbbf24]">Journey</span></h2>
        <div className="relative border-l border-white/5 pl-8 ml-4 space-y-12">
          {[
            { year: "2019", title: "The Starting Line", desc: "Began as a student freelancer helping classmates with coding assignments and basic web sites. Built the foundation of 'quality-first' service." },
            { year: "2021", title: "Full-Stack Pivot", desc: "Mastered Next.js and modern backends. Shifted from simple sites to complex, multi-role web applications for local businesses." },
            { year: "2023", title: "Academic Authority", desc: "Expanded into specialized academic research support. Helped 100+ students navigate complex technical thesis systems and documentation." },
            { year: "2026", title: "MCT.DEV Vision", desc: "Rebranding to a high-performance agency model. Focusing on premium Web/Mobile solutions and reliable academic excellence." }
          ].map((mile, idx) => (
            <div key={mile.year} className="relative group">
              <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-[#0B1121] border-2 border-[#fbbf24] z-10 group-hover:shadow-[0_0_15px_rgba(251,191,36,0.3)] transition-all"></div>
              <div className="space-y-2">
                <span className="text-xs font-black text-[#fbbf24] uppercase tracking-[0.2em]">{mile.year}</span>
                <h3 className="text-xl font-black text-white">{mile.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed max-w-2xl">{mile.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROOF OF WORK */}
      <section className="mb-24">
        <h2 className="text-3xl font-black text-white mb-12 text-center md:text-left uppercase tracking-tighter italic">Proof of <span className="text-[#06b6d4]">Verified Transactions</span> & Evidence</h2>
        
        <div className="space-y-6">

           {/* DYNAMIC PROOFS CAROUSEL */}
           <div className="md:col-span-2 lg:col-span-3 relative mt-8">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Verified <span className="text-emerald-500">Transaction</span> Feed</h3>
               <div className="flex gap-2">
                 <button 
                  onClick={() => setCarouselIndex((prev) => Math.max(0, prev - 1))}
                  disabled={carouselIndex === 0}
                  className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                 >
                   <ChevronLeft size={20} />
                 </button>
                 <button
                  onClick={() => setCarouselIndex((prev) => Math.min(Math.max(0, displayProofs.length - 2), prev + 1))}
                  disabled={displayProofs.length <= 2 || carouselIndex >= displayProofs.length - 2}
                  className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                 >
                   <ChevronRight size={20} />
                 </button>
               </div>
             </div>

             <div className="relative overflow-hidden p-1">
                <div 
                  className="flex gap-6 transition-transform duration-500 ease-out py-4"
                  style={{ transform: `translateX(calc(-${carouselIndex} * (300px + 24px)))` }}
                >
                  {displayProofs.length > 0 ? displayProofs.map((proof: any) => (
                     <div key={proof._id} className="w-[320px] flex-shrink-0 card-styled overflow-hidden group border-white/5 hover:border-[#06b6d4]/30 transition-all bg-[#0B1121]/90 hover:-translate-y-2 duration-700 shadow-2xl">
                        <div className="aspect-[3/2] relative overflow-hidden bg-white/5">
                           <img src={proof.url} alt={proof.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60 group-hover:opacity-100" />
                           <div className="absolute top-4 left-4">
                               <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                 proof.category === "transactions" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : 
                                 proof.category === "technical" ? "bg-[#06b6d4]/20 text-[#06b6d4] border border-[#06b6d4]/30" :
                                 "bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/30"
                               } backdrop-blur-xl shadow-lg`}>
                                 {proof.category === "transactions" && <FileCheck size={12} className="text-emerald-400" />}
                                 {proof.category === "transactions" ? "Verified Receipt" : `${proof.category} Artifact`}
                               </div>
                           </div>
                           <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-transparent to-transparent opacity-60"></div>
                        </div>
                        <div className="p-8 border-t border-white/5">
                           <h4 className="text-sm font-black text-white uppercase tracking-tight mb-3 truncate group-hover:text-[#06b6d4] transition-colors">{proof.title}</h4>
                           <div className="flex items-center justify-between">
                             <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                               <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/50">
                                 {proof.category === "transactions" ? "DIGITAL PAYMENT VERIFIED" : "DIAGNOSTIC ARCHIVE"}
                               </span>
                             </div>
                             {proof.category === "transactions" && (
                               <div className="text-[10px] text-emerald-500/50 group-hover:text-emerald-500 transition-colors">
                                 <CheckCircle2 size={16} />
                               </div>
                             )}
                           </div>
                        </div>
                     </div>
                  )) : (
                    <div className="w-full h-64 flex flex-col items-center justify-center border border-white/5 rounded-2xl border-dashed opacity-30">
                       <p className="text-xs font-black uppercase tracking-widest text-white">No digital receipts uploaded yet</p>
                    </div>
                  )}
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* COMMON QUESTIONS */}
      <section className="pb-24">
        <h2 className="text-3xl font-black text-white mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-3xl">
          {[
            { q: "What if I need revisions after delivery?", a: "Revisions are included. We keep working until your adviser or panel is satisfied. No hidden fees or revision limits." },
            { q: "Can you work with rush deadlines?", a: "Yes. Rush options are available. Let's discuss your timeline and budget — most rush requests can be accommodated." },
            { q: "How do payments work? Do I pay upfront?", a: "Payments are flexible. We usually agree on a milestone-based setup (e.g., per chapter for thesis, or 50/50 for web dev). I accept GCash, Bank Transfer, and PayPal." },
            { q: "Do you offer support after a project is launched?", a: "Absolutely. I provide 1-week free technical support after deployment to ensure everything runs smoothly. Long-term maintenance contracts are also available." },
            { q: "Will my thesis project be confidential?", a: "100% private. Your data, topic, and our communication remain strictly confidential. I provide high-integrity services." }
          ].map((faq, i) => {
            const [isFaqOpen, setIsFaqOpen] = React.useState(i < 2);
            return (
              <div key={i} className={`card-styled overflow-hidden transition-all duration-500 border-[#1E293B] ${isFaqOpen ? "border-[#06b6d4]/50 bg-[#0F172A]/30" : "hover:border-[#334155]"}`}>
                <button 
                  onClick={() => setIsFaqOpen(!isFaqOpen)}
                  className="w-full p-6 flex items-center justify-between text-left group"
                >
                  <h3 className="text-sm md:text-base font-bold text-white flex gap-4 group-hover:text-[#06b6d4] transition-colors">
                    <span className="text-[#06b6d4] font-black">Q:</span> {faq.q}
                  </h3>
                  <ChevronDown className={`text-white/30 transition-transform duration-500 ${isFaqOpen ? "rotate-180 text-[#06b6d4]" : ""}`} size={20} />
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${isFaqOpen ? "max-h-60" : "max-h-0"}`}>
                  <p className="px-6 pb-6 pt-0 text-sm text-white/60 flex gap-4 leading-relaxed border-t border-white/5 pt-4 mt-2">
                    <span className="text-white/20 font-black">A:</span> {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="mb-24">
        <div className="card-styled p-12 md:p-16 bg-gradient-to-br from-[#0B1121] to-[#1E293B] border-[#1E293B] text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent opacity-50"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h3 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter">Not sure where to start?</h3>
            <p className="text-sm text-white/60 font-medium leading-relaxed">
              Book a free 30-minute discovery call — no commitment, no pressure. 
              We'll discuss your roadmap, potential stack, and clarify any questions you have.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link href="/quote" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-[#fbbf24] text-[#0A0F1C] font-black uppercase tracking-widest text-[11px] py-4 px-8 shadow-[0_0_30px_rgba(251,191,36,0.2)]">
                  Book a Free Call <ArrowRight size={14} className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/quote" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto uppercase font-black tracking-widest text-[11px] py-4 px-8">
                  Send a message instead
                </Button>
              </Link>
            </div>
            
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] pt-4">via Google Meet - Usually within 24hrs</p>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#fbbf24]/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#fbbf24]/20 transition-all duration-700"></div>
        </div>
      </section>
      
    </div>
  );
}
