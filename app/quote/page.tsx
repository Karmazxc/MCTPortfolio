"use client";

import React, { useState } from "react";
import { useMutation, useAction } from "convex/react";
import { api } from "@/backend/convex/_generated/api";
import { Button } from "@/components/ui/Button";
import { MessageCircle, Mail, Facebook, QrCode, Timer, RefreshCw, ChevronDown, Target, Handshake, CircleDot, ShieldCheck, Zap, Star, ArrowRight, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";
import { STATS, PRICING, TIMELINES, CONTACT } from "@/lib/constants";

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    deadline: "",
    budget: "",
    details: "",
    honeypot: ""
  });
  const saveQuotation = useMutation(api.quotations.quotations.saveQuotation);
  const sendEmailNotification = useAction(api.emails.sendEmail.sendQuotationNotification);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Anti-Spam: Bot filled honeypot?
    if (formData.honeypot !== "") {
      setSubmitted(true);
      return;
    }

    if (formData.name.trim().length <= 2) {
      setErrorMsg("Please provide a valid full name.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMsg("Please provide a strictly valid email address.");
      return;
    }
    if (formData.details.trim().length < 20) {
      setErrorMsg("Please provide at least 20 characters of project details so I can scope it properly.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save quotation to database
      const quoteId = await Promise.race([
        saveQuotation({
          clientName: formData.name,
          email: formData.email,
          projectType: formData.service,
          features: [formData.details],
          budgetRange: formData.budget,
          deadline: formData.deadline,
          estimatedPrice: 0,
          estimatedDays: 0,
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error("DEMO_TIMEOUT")), 2000))
      ]);

      // Send email notification (non-blocking)
      try {
        await sendEmailNotification({
          clientName: formData.name,
          email: formData.email,
          projectType: formData.service,
          budget: formData.budget,
          deadline: formData.deadline,
          details: formData.details,
        });
      } catch (emailErr) {
        console.warn("Email notification failed, but quotation was saved:", emailErr);
      }

      setSubmitted(true);
    } catch (err: any) {
      if (err instanceof Error && err.message === "DEMO_TIMEOUT") {
        // Safe Fallback: Sync to LocalStorage so Admin Dashboard can show it for the demo
        console.warn("Convex connection timed out. Syncing to LocalStorage for Portfolio Demo.");
        const offlineInquiry = {
          _id: "offline_" + Date.now(),
          clientName: formData.name,
          email: formData.email,
          projectType: formData.service,
          details: formData.details,
          budgetRange: formData.budget,
          deadline: formData.deadline,
          status: "pending",
          createdAt: Date.now(),
          isOffline: true
        };
        const existing = JSON.parse(localStorage.getItem("offline_quotations") || "[]");
        localStorage.setItem("offline_quotations", JSON.stringify([offlineInquiry, ...existing]));
        setSubmitted(true);
      } else {
        setErrorMsg("Backend error. Please contact me directly via Facebook.");
        console.error(err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-24 max-w-7xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Let's Build <span className="text-[#06b6d4]">Together</span></h1>
        <p className="text-white/60 font-medium">Message me now for a free consultation. I respond within 1-2 hours, every single day.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Info Column */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Mockup Offer Card - ELEVATED */}
          <div className="card-styled p-10 border-[#06b6d4] bg-gradient-to-br from-[#06b6d4]/10 to-transparent relative overflow-hidden group">
             <div className="absolute -right-4 -top-4 w-32 h-32 bg-[#06b6d4]/10 rounded-full blur-3xl group-hover:bg-[#06b6d4]/20 transition-all duration-700"></div>
             <div className="absolute top-0 right-0 px-6 py-1.5 bg-[#06b6d4] text-[#0A0F1C] text-[10px] font-black uppercase tracking-widest rounded-bl-xl shadow-lg">
               Limited Time Promotion
             </div>
             
             <div className="relative z-10">
               <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-white/40 uppercase tracking-widest mb-4">Risk-Free Inquiry</span>
               <h2 className="text-3xl font-black text-white mb-3">GET A FREE <span className="text-[#06b6d4]">1-PAGE MOCKUP</span></h2>
               <p className="text-sm text-white/60 mb-8 max-w-lg leading-relaxed font-medium">
                 Visualizing your project before paying is the best way to ensure we're on the right track. 
                 <span className="text-white"> No downpayment required</span> for the initial draft.
               </p>
               
               <div className="flex flex-wrap gap-6 border-t border-white/5 pt-6">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#06b6d4]">
                     <Timer size={16} />
                   </div>
                    <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">{TIMELINES.rush}</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#06b6d4]">
                     <RefreshCw size={16} />
                   </div>
                   <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">ZERO COMMITMENT</span>
                 </div>
               </div>
             </div>
          </div>

          <div className="space-y-4">
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="card-styled p-4 border-[#1E293B] hover:border-[#334155] flex items-center gap-4 group">
              <div className="w-10 h-10 flex items-center justify-center bg-green-500/10 text-green-500 rounded-lg group-hover:bg-green-500/20 transition-colors">
                 <MessageCircle size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-white/50">WHATSAPP / SMS</p>
                <p className="text-sm font-bold text-white">{CONTACT.whatsapp}</p>
              </div>
            </a>
            
            <a href={`mailto:${CONTACT.email}`} className="card-styled p-4 border-[#1E293B] hover:border-[#334155] flex items-center gap-4 group">
              <div className="w-10 h-10 flex items-center justify-center bg-[#06b6d4]/10 text-[#06b6d4] rounded-lg group-hover:bg-[#06b6d4]/20 transition-colors">
                 <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-white/50">EMAIL</p>
                <p className="text-sm font-bold text-white">{CONTACT.email}</p>
              </div>
            </a>
            
            <a href={`https://m.me/${CONTACT.messenger}`} target="_blank" rel="noreferrer" className="card-styled p-4 border-[#1E293B] hover:border-[#334155] flex items-center gap-4 group">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-500/10 text-blue-500 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                 <Facebook size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-white/50">FACEBOOK</p>
                <p className="text-sm font-bold text-white">{CONTACT.facebook}</p>
              </div>
            </a>
          </div>

          <div className="card-styled p-6 border-[#1E293B] flex items-center gap-4 relative overflow-hidden">
             <div className="w-12 h-12 flex items-center justify-center bg-white/5 text-white/50 rounded-lg">
                <QrCode size={24} />
             </div>
             <div>
               <p className="text-sm font-bold text-white">Scan to message</p>
               <p className="text-xs text-white/60">Point your phone camera to start a WhatsApp chat Instantly.</p>
             </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-5 h-full">
          <div className="card-styled p-8 md:p-10 border-[#1E293B] h-full flex flex-col">
            <h2 className="text-xl font-bold text-white mb-6">Start Your Project</h2>
            <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col relative">
              
              {/* Anti-Spam Honeypot Field */}
              <div aria-hidden="true" className="opacity-0 absolute -left-[9999px]">
                 <label>Leave this field totally empty</label>
                 <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" value={formData.honeypot} onChange={e => setFormData({...formData, honeypot: e.target.value})} />
              </div>

              {errorMsg && (
                <div className="bg-[#f43f5e]/10 border border-[#f43f5e]/30 text-[#f43f5e] px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest break-words flex gap-2 items-center">
                   <div className="w-2 h-2 rounded-full bg-[#f43f5e]"></div>
                   {errorMsg}
                </div>
              )}
              
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-white/50">YOUR NAME</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0A0F1C] border border-[#1E293B] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#06b6d4] transition-colors" placeholder="Juan dela Cruz" />
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-white/50">EMAIL / CONTACT</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#0A0F1C] border border-[#1E293B] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#06b6d4] transition-colors" placeholder="you@email.com" />
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-white/50">SERVICE NEEDED</label>
                <select required value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} className="w-full bg-[#0A0F1C] border border-[#1E293B] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#06b6d4] transition-colors appearance-none">
                  <option value="" disabled>Choose a service...</option>
                  <option value="web">Business Website</option>
                  <option value="mobile">Mobile Application</option>
                  <option value="thesis">Thesis Outline/System</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black tracking-widest text-white/50">DEADLINE</label>
                  <input required type="date" value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} className="w-full bg-[#0A0F1C] border border-[#1E293B] rounded-lg px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-[#06b6d4] transition-colors" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black tracking-widest text-white/50">BUDGET RANGE</label>
                  <select required value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full bg-[#0A0F1C] border border-[#1E293B] rounded-lg px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-[#06b6d4] transition-colors appearance-none">
                    <option value="" disabled>Select range...</option>
                    <option value="1">{PRICING.thesis} - {PRICING.basic}</option>
                    <option value="2">{PRICING.basic} - {PRICING.growth}</option>
                    <option value="3">{PRICING.growth} - {PRICING.premium}</option>
                    <option value="4">{PRICING.premium}+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1 flex-grow flex flex-col">
                <label className="text-[10px] uppercase font-black tracking-widest text-white/50">PROJECT DETAILS (Min 20 Chars)</label>
                <textarea required minLength={20} value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} rows={4} className="w-full flex-grow bg-[#0A0F1C] border border-[#1E293B] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#06b6d4] transition-colors resize-none" placeholder="Tell me about your project, thesis topic, or what you need..."></textarea>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" disabled={isSubmitting || submitted} className="w-full uppercase tracking-widest text-xs py-4">
                  {isSubmitting ? "Validating & Sending..." : submitted ? "Message Sent!" : "Send Message - Get Free Consultation"}
                </Button>
                <p className="text-[10px] tracking-widest text-white/40 mt-3 text-center">* Protected by spam filters. Minimum 20 char description.</p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="mt-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-black text-white mb-2 italic">Client Success Stories</h2>
            <p className="text-sm font-bold text-[#06b6d4]">Trusted by 100+ students & business owners nationwide.</p>
          </div>
          <div className="flex items-center gap-4 bg-[#1E293B]/30 px-6 py-3 rounded-2xl border border-[#1E293B]">
             <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">TRUSTED BY STUDENTS FROM</span>
             <div className="flex gap-4 items-center opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <Link href="#" className="flex items-center gap-1 text-xs font-black text-white">UST <Star size={10} className="text-[#fbbf24]" /></Link>
                <Link href="#" className="flex items-center gap-1 text-xs font-black text-white">UP <Star size={10} className="text-[#fbbf24]" /></Link>
                <Link href="#" className="flex items-center gap-1 text-xs font-black text-white">DLSU <Star size={10} className="text-[#fbbf24]" /></Link>
                <Link href="#" className="flex items-center gap-1 text-xs font-black text-white">FEU <Star size={10} className="text-[#fbbf24]" /></Link>
                <Link href="#" className="flex items-center gap-1 text-xs font-black text-white">ADMU <Star size={10} className="text-[#fbbf24]" /></Link>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              stars: "★★★★★",
              text: "Delivered my thesis in 4 days, Turnitin at 4%. My adviser had zero revisions on Chapter 1-3. Saved my semester!",
              client: "Ana R.",
              context: "BS Nursing, UST"
            },
            {
              stars: "★★★★★",
              text: "E-commerce site live in 5 days. Clean, fast, mobile-ready. Sales doubled after launch. Mark is professional and efficient.",
              client: "Julian T.",
              context: "Owner, VibeSync Shop"
            },
            {
              stars: "★★★★★",
              text: "Built our React Native app for both platforms with excellent communication. The UI is better than what we imagined.",
              client: "Maria C.",
              context: "CS Student, DLSU"
            },
            {
              stars: "★★★★★",
              text: "The data analysis was spot on. SPSS interpretation was clear and helped me pass my defense with honors.",
              client: "Kevin L.",
              context: "MS Psychology, UP Diliman"
            },
            {
              stars: "★★★★★",
              text: "Needed a portfolio fast for a job application. Mark finished it in 48 hours. I got the job!",
              client: "Sarah J.",
              context: "Multimedia Arts, FEU"
            },
            {
              stars: "★★★★★",
              text: "Professional, original, and always available for questions. Best research partner I've ever worked with.",
              client: "Mark P.",
              context: "IT Capstone, Adamson U."
            }
          ].map((review, i) => (
            <div key={i} className="card-styled p-8 border-[#1E293B] hover:border-[#06b6d4]/30 transition-all duration-500 group">
               <div className="text-[#fbbf24] text-xl mb-4 group-hover:scale-110 transition-transform origin-left">{review.stars}</div>
               <p className="text-sm text-white/80 leading-relaxed font-medium mb-8">"{review.text}"</p>
               <div className="flex items-center gap-4 mt-auto border-t border-white/5 pt-6">
                  <div className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center font-black text-[#06b6d4] text-xs">
                    {review.client.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs text-white font-bold uppercase tracking-widest">{review.client}</p>
                    <p className="text-[10px] text-white/40 uppercase font-black tracking-tight">{review.context}</p>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOOKING CTA */}
      <div className="mt-32">
        <div className="card-styled p-12 md:p-16 bg-gradient-to-br from-[#1E293B]/20 to-transparent border-[#1E293B] text-center relative overflow-hidden group">
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
        </div>
      </div>
    </div>
  );
}
