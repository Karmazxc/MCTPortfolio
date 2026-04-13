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
  FileCheck,
  Clock,
  TrendingUp,
  Users,
  DollarSign
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { STATS, PRICING, CONTACT } from "@/lib/constants";
import ConnectionWarning from "@/components/ConnectionWarning";

// Real proof images from /public/proofs
const DEMO_PROOFS = [
  {
    _id: "proof-1",
    title: "GCash Payment - Project Deposit",
    category: "transactions",
    amount: "₱15,000",
    client: "E-Commerce Project",
    project: "Full-Stack Online Store",
    url: "/proofs/344491127_189097747410873_5044764886405357473_n.jpg",
    uploadedAt: Date.now() - 86400000,
    status: "verified"
  },
  {
    _id: "proof-2",
    title: "Bank Transfer - Web Application",
    category: "transactions",
    amount: "₱35,000",
    client: "Business Client",
    project: "Inventory Management System",
    url: "/proofs/354208609_681970653767022_9119328598945603474_n.jpg",
    uploadedAt: Date.now() - 172800000,
    status: "verified"
  },
  {
    _id: "proof-3",
    title: "GCash Payment - Thesis Project",
    category: "transactions",
    amount: "₱8,999",
    client: "Graduate Student",
    project: "Thesis System - Attendance Tracker",
    url: "/proofs/368681989_691052269672955_8601441462095601275_n.jpg",
    uploadedAt: Date.now() - 259200000,
    status: "verified"
  },
  {
    _id: "proof-4",
    title: "PayPal - International Client",
    category: "transactions",
    amount: "₱60,000",
    client: "Startup Founder",
    project: "Mobile App Development",
    url: "/proofs/Paypal1.png",
    uploadedAt: Date.now() - 345600000,
    status: "verified"
  },
  {
    _id: "proof-5",
    title: "GCash - Final Milestone Payment",
    category: "transactions",
    amount: "₱25,000",
    client: "SME Business",
    project: "Restaurant Ordering System",
    url: "/proofs/370107455_880625013375147_6477420886763730993_n.jpg",
    uploadedAt: Date.now() - 432000000,
    status: "verified"
  },
  {
    _id: "proof-6",
    title: "Bank Transfer - Full Package",
    category: "transactions",
    amount: "₱45,000",
    client: "Masteral Student",
    project: "Research Prototype - Data Analytics",
    url: "/proofs/373348118_1939449306433095_6538549887662126165_n.jpg",
    uploadedAt: Date.now() - 518400000,
    status: "verified"
  },
  {
    _id: "proof-7",
    title: "GCash - Landing Page Project",
    category: "transactions",
    amount: "₱15,000",
    client: "Local Business",
    project: "Business Website + SEO",
    url: "/proofs/387468061_332798742821177_6717653733070316604_n.jpg",
    uploadedAt: Date.now() - 604800000,
    status: "verified"
  },
  {
    _id: "proof-8",
    title: "GCash - UI/UX Design Package",
    category: "transactions",
    amount: "₱12,000",
    client: "App Startup",
    project: "Mobile App UI Design",
    url: "/proofs/403415228_1456706328239649_1801875920785681529_n.jpg",
    uploadedAt: Date.now() - 691200000,
    status: "verified"
  },
  {
    _id: "proof-9",
    title: "PayPal - Cross-Border Project",
    category: "transactions",
    amount: "₱30,000",
    client: "Foreign Client",
    project: "E-Commerce Platform",
    url: "/proofs/Paypal2.jpg",
    uploadedAt: Date.now() - 777600000,
    status: "verified"
  },
  {
    _id: "proof-10",
    title: "GCash - Thesis Defense Package",
    category: "transactions",
    amount: "₱14,999",
    client: "Undergrad Student",
    project: "Complete Thesis System",
    url: "/proofs/405978890_200775126417163_5006127869135264795_n.jpg",
    uploadedAt: Date.now() - 864000000,
    status: "verified"
  },
  {
    _id: "proof-11",
    title: "Bank Transfer - Enterprise Project",
    category: "transactions",
    amount: "₱120,000",
    client: "Corporate Client",
    project: "Multi-Role Business Platform",
    url: "/proofs/406247576_759316646038410_8239693975105175972_n.jpg",
    uploadedAt: Date.now() - 950400000,
    status: "verified"
  },
];

// Helper function to format time ago
function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  const days = Math.floor(seconds / 86400);
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "1 week ago";
  return `${weeks} weeks ago`;
}

export default function AboutPage() {
  // Use demo proofs only - no Convex dependency to avoid connection errors
  const displayProofs = DEMO_PROOFS;
  const [carouselIndex, setCarouselIndex] = React.useState(0);

  // Calculate stats from proofs
  const totalTransactions = displayProofs.length;
  const verifiedCount = displayProofs.filter((p: any) => p.status === "verified").length;
  
  return (
    <div className="container mx-auto px-6 py-24 max-w-6xl">
      {/* Connection Warning */}
      <ConnectionWarning 
        message="Unable to connect to our database. Showing cached/demo content. Some features may be limited."
      />

      {/* STATS OVERVIEW */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 border border-[#06b6d4]/30 rounded-full text-[10px] uppercase font-black tracking-widest text-[#06b6d4] bg-[#06b6d4]/5">
            Verified Track Record
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 italic uppercase tracking-tighter">
            About <span className="text-[#06b6d4]">MCT.DEV</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-medium">
            Transparent, verified, and trusted by 100+ students and businesses across the Philippines.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: <CheckCircle2 size={24} />, value: STATS.projects, label: "Projects Completed", color: "text-[#06b6d4]" },
            { icon: <Users size={24} />, value: STATS.students, label: "Students Helped", color: "text-[#fbbf24]" },
            { icon: <TrendingUp size={24} />, value: `${verifiedCount}+`, label: "Verified Transactions", color: "text-emerald-500" },
            { icon: <DollarSign size={24} />, value: "100%", label: "Client Satisfaction", color: "text-[#a855f7]" },
          ].map((stat, idx) => (
            <div key={idx} className="card-styled p-6 md:p-8 text-center border-white/5 hover:border-[#06b6d4]/30 transition-all duration-500 group">
              <div className={`w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ${stat.color}`}>
                {stat.icon}
              </div>
              <p className="text-3xl md:text-4xl font-black text-white mb-2">{stat.value}</p>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

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

      {/* PROOF OF WORK - ENHANCED TRANSACTION GALLERY */}
      <section className="mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <FileCheck size={18} className="text-emerald-500" />
              </div>
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Verified <span className="text-emerald-500">Transactions</span></h2>
            </div>
            <p className="text-white/60 text-sm font-medium">
              Real receipts, real clients. Every project is documented and verified.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCarouselIndex((prev) => Math.max(0, prev - 1))}
              disabled={carouselIndex === 0}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setCarouselIndex((prev) => Math.min(Math.max(0, displayProofs.length - 2), prev + 1))}
              disabled={displayProofs.length <= 2 || carouselIndex >= displayProofs.length - 2}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Transaction Cards - Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProofs.slice(0, 6).map((proof: any, idx: number) => (
            <motion.div
              key={proof._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card-styled overflow-hidden group border-white/5 hover:border-emerald-500/30 transition-all duration-500 bg-[#0B1121]/90 hover:-translate-y-2"
            >
              {/* Image Section */}
              <div className="aspect-[4/3] relative overflow-hidden bg-white/5">
                <img 
                  src={proof.url} 
                  alt={proof.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-70 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-transparent to-transparent opacity-80"></div>
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-xl shadow-lg">
                    <CheckCircle2 size={12} />
                    Verified
                  </div>
                </div>

                {/* Amount Badge */}
                {proof.amount && (
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1.5 rounded-full text-xs font-black bg-[#06b6d4] text-[#0A0F1C] shadow-lg">
                      {proof.amount}
                    </div>
                  </div>
                )}
              </div>

              {/* Details Section */}
              <div className="p-6 border-t border-white/5">
                <h3 className="text-sm font-black text-white uppercase tracking-tight mb-3 truncate group-hover:text-[#06b6d4] transition-colors">
                  {proof.title}
                </h3>
                
                {proof.client && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#06b6d4] to-[#a855f7] flex items-center justify-center">
                      <span className="text-[8px] font-black text-white">{proof.client.charAt(0)}</span>
                    </div>
                    <span className="text-xs text-white/60 font-medium">{proof.client}</span>
                  </div>
                )}

                {proof.project && (
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-3">
                    {proof.project}
                  </p>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="text-white/30" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/40">
                      {timeAgo(proof.uploadedAt)}
                    </span>
                  </div>
                  <CheckCircle2 size={16} className="text-emerald-500/50 group-hover:text-emerald-500 transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {displayProofs.length === 0 && (
          <div className="card-styled p-20 flex flex-col items-center justify-center text-center border-dashed border-white/10">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <FileCheck size={40} className="text-white/20" />
            </div>
            <p className="text-sm font-black text-white uppercase tracking-[0.3em]">No Transactions Yet</p>
            <p className="text-[10px] text-white/50 uppercase tracking-widest mt-2">Verified receipts will appear here as projects are completed.</p>
          </div>
        )}
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
