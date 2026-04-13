"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProfileImage } from "@/components/ProfileImage";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/FadeIn";
import {
  ShieldCheck,
  Star,
  MessageSquare,
  Facebook,
  Mail,
  Zap,
  ArrowRight,
  Lock
} from "lucide-react";
import { PRICING, TIMELINES } from "@/lib/constants";
import { TESTIMONIALS, TRUST_BADGES, TECH_STACK, CONTACT, WHATSAPP_QR_DATA, PAYMENT_METHODS } from "@/lib/site-data";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="container mx-auto px-6 pt-20 pb-16 lg:pt-32 lg:pb-24 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Hero */}
          <div className="lg:col-span-8 space-y-8">
            <FadeIn direction="up" delay={0.1}>
              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                  <span className="italic text-white">WEB & </span>
                  <span className="text-[#06b6d4]">THESIS</span><br/>
                  <span className="text-white">CRAFTING.</span>
                </h1>
                <div className="border-l-2 border-[#06b6d4] pl-3 text-sm font-normal text-white/40">
                  <span className="font-bold text-white uppercase tracking-wider">High-performance software</span> meets academic excellence.
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed font-medium">
                I build scalable digital products for businesses and provide elite, Turnitin-verified research support for graduating students. Zero compromise on quality.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/quote">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto uppercase tracking-wider text-sm shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                    Get A Free Consultation ⚡
                  </Button>
                </Link>
                <Link href="/services" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto uppercase tracking-wider text-sm">
                    View My Services
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right Hero - Profile Card */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="w-full max-w-[320px] aspect-[3/4] rounded-3xl bg-gradient-to-t from-[#0F172A] to-[#1E293B] p-1 border border-[#1E293B] relative overflow-hidden group shadow-2xl">
              <div className="w-full h-full rounded-[20px] bg-[#0B1121] flex items-center justify-center overflow-hidden relative">
                 <ProfileImage />
                 <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                   <h3 className="text-xl font-bold text-white">Mark Christian Trajano</h3>
                   <p className="text-sm text-white/60">Philippines</p>
                 </div>
              </div>
            </div>
          </div>

        </div>

        {/* EVIDENCE TRUST BAR */}
        <FadeIn direction="up" delay={0.4}>
          <div className="mt-20 border-y border-white/5 py-10 bg-gradient-to-r from-transparent via-[#06b6d4]/5 to-transparent">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 px-4">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-8 gap-y-4">
              {TRUST_BADGES.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#06b6d4] rounded-full opacity-50 hidden sm:block"></div>
                  <div>
                    <p className="text-white font-black text-sm uppercase tracking-tight">{item.label}</p>
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Link href="/about">
              <Button variant="outline" className="group border-[#06b6d4]/30 hover:border-[#06b6d4] bg-[#06b6d4]/5 text-[#06b6d4] py-6 px-10 rounded-full text-[10px] font-black uppercase tracking-widest">
                View Transaction Feed <Zap size={14} className="ml-2 group-hover:scale-125 transition-transform fill-[#06b6d4]/20" />
              </Button>
            </Link>
          </div>
        </div>
        </FadeIn>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section className="container mx-auto px-6 py-20 max-w-7xl">
        <FadeIn direction="up">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-2 italic uppercase tracking-tighter">Client <span className="text-[#fbbf24]">Reviews</span></h2>
            <p className="text-white/60 text-sm font-medium">What my clients say about working together.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <FadeIn key={idx} direction="up" delay={0.1 + idx * 0.15} className="card-styled p-8 border-white/5 hover:border-[#fbbf24]/20 transition-all flex flex-col gap-6">
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-[#fbbf24] fill-[#fbbf24]" />
                ))}
              </div>
              <p className="text-sm text-white/70 leading-relaxed italic flex-grow">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="border-t border-white/5 pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#06b6d4] to-[#a855f7] flex items-center justify-center">
                    <span className="text-sm font-black text-white">{testimonial.name.split(" ").map(n => n[0]).join("")}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">{testimonial.name}</h4>
                    <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-[9px] text-[#06b6d4] font-black uppercase tracking-widest mt-3">{testimonial.project}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/about" className="group text-sm font-black text-white/40 hover:text-[#06b6d4] tracking-widest uppercase flex items-center gap-2 transition-colors">
            See verified transaction receipts <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* FREELANCE & AVAILABLE BADGES */}
      <section className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="px-6 py-3 rounded-full border border-[#06b6d4] bg-[#06b6d4]/10 text-[#06b6d4] text-xs font-black tracking-widest uppercase flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-[#06b6d4]"></span>
             FREELANCE DEVELOPER & ACADEMIC STRATEGIST
          </div>
          <div className="hidden md:block w-12 h-px bg-[#1E293B]"></div>
          <div className="px-6 py-3 rounded-full border border-[#fbbf24] bg-[#fbbf24]/10 text-[#fbbf24] text-xs font-black tracking-widest uppercase flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-[#fbbf24] animate-pulse"></span>
             AVAILABLE FOR PROJECTS
          </div>
        </div>
      </section>

      {/* STRATEGIC PLANS */}
      <section className="container mx-auto px-6 py-24 max-w-7xl">
        <FadeIn direction="up">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter">Strategic <span className="text-[#06b6d4]">Plans</span></h2>
            <p className="text-white/60 font-medium max-w-xl mx-auto">Scalable solutions tailored for businesses and students. Choose your growth track.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* STARTER */}
          <FadeIn direction="up" delay={0.1} className="card-styled p-8 border-[#1E293B] bg-[#0B1121] relative flex flex-col group hover:border-[#06b6d4]/30 transition-all duration-500">
             <div className="mb-8">
               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#06b6d4] bg-[#06b6d4]/5 px-3 py-1 rounded-full border border-[#06b6d4]/20">Starter</span>
               <h3 className="text-2xl font-black text-white mt-3 uppercase tracking-tighter">Essential</h3>
               <p className="text-xs text-white/40 mt-2 font-medium">Landing pages & portfolios</p>
             </div>

             <ul className="space-y-3 mb-10 flex-grow text-xs">
                {["Responsive Landing Page", "SEO Foundation", "Contact Form", "Mobile-First Design", TIMELINES.basic].map((item, i) => (
                 <li key={i} className="flex items-center gap-2 font-bold text-white/70">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] flex-shrink-0"></div> {item}
                 </li>
               ))}
             </ul>

             <div className="mt-auto">
                <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">STARTING AT</p>
                <p className="text-3xl font-black text-white mb-6">{PRICING.basic}+</p>
                <Link href="/quote">
                  <Button variant="outline" className="w-full uppercase font-black tracking-widest text-[9px] py-4 border-[#1E293B] group-hover:border-[#06b6d4] gap-2">
                    Get Started <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
             </div>
          </FadeIn>

          {/* GROWTH */}
          <FadeIn direction="up" delay={0.2} className="card-styled p-8 border-[#1E293B] bg-[#0B1121] relative flex flex-col group hover:border-[#a855f7]/30 transition-all duration-500">
             <div className="mb-8">
               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#a855f7] bg-[#a855f7]/5 px-3 py-1 rounded-full border border-[#a855f7]/20">Growth</span>
               <h3 className="text-2xl font-black text-white mt-3 uppercase tracking-tighter">Web Apps</h3>
               <p className="text-xs text-white/40 mt-2 font-medium">Auth, database & admin panels</p>
             </div>

             <ul className="space-y-3 mb-10 flex-grow text-xs">
                {["User Auth & Accounts", "Real-time Database", "Admin Dashboard", "API Integrations", TIMELINES.growth].map((item, i) => (
                 <li key={i} className="flex items-center gap-2 font-bold text-white/70">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#a855f7] flex-shrink-0"></div> {item}
                 </li>
               ))}
             </ul>

             <div className="mt-auto">
                <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">STARTING AT</p>
                <p className="text-3xl font-black text-white mb-6">{PRICING.growth}+</p>
                <Link href="/quote">
                  <Button variant="outline" className="w-full uppercase font-black tracking-widest text-[9px] py-4 border-[#1E293B] group-hover:border-[#a855f7] gap-2">
                    Scale Up <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
             </div>
          </FadeIn>

          {/* PREMIUM */}
          <FadeIn direction="up" delay={0.3} className="card-styled p-8 border-[#fbbf24]/50 bg-[#fbbf24]/5 scale-[1.02] xl:scale-[1.05] z-10 relative flex flex-col shadow-[0_0_50px_rgba(251,191,36,0.1)]">
             <div className="absolute top-0 right-0 px-3 py-1 bg-[#fbbf24] text-[#0A0F1C] text-[8px] font-black uppercase tracking-widest rounded-bl-xl">
                Most Chosen
             </div>

             <div className="mb-8">
               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#fbbf24] bg-[#fbbf24]/10 px-3 py-1 rounded-full border border-[#fbbf24]/20">Premium</span>
               <h3 className="text-2xl font-black text-white mt-3 uppercase tracking-tighter">Full Suite</h3>
               <p className="text-xs text-white/40 mt-2 font-medium">Full-scale Web & Mobile Apps</p>
             </div>

             <ul className="space-y-3 mb-10 flex-grow text-xs">
                {["Full Backend & Auth", "Payment Integration", "Mobile App (iOS/Android)", "Priority Support", TIMELINES.extended].map((item, i) => (
                 <li key={i} className="flex items-center gap-2 font-bold text-white/90">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] flex-shrink-0"></div> {item}
                 </li>
               ))}
             </ul>

             <div className="mt-auto">
                <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">STARTING AT</p>
                <p className="text-3xl font-black text-white mb-6">{PRICING.premium}+</p>
                <Link href="/quote">
                  <Button className="w-full uppercase font-black tracking-widest text-[9px] py-4 bg-[#fbbf24] text-[#0A0F1C] border-none shadow-[0_0_30px_rgba(251,191,36,0.2)]">
                    Scale Now ⚡
                  </Button>
                </Link>
             </div>
          </FadeIn>

          {/* ACADEMIC */}
          <FadeIn direction="up" delay={0.4} className="card-styled p-8 border-[#1E293B] bg-[#0B1121] relative flex flex-col group hover:border-[#ec4899]/30 transition-all duration-500">
             <div className="mb-8">
               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#ec4899] bg-[#ec4899]/5 px-3 py-1 rounded-full border border-[#ec4899]/20">Academic</span>
               <h3 className="text-2xl font-black text-white mt-3 uppercase tracking-tighter">Thesis</h3>
               <p className="text-xs text-white/40 mt-2 font-medium italic">Undergrad • Masteral • PhD</p>
             </div>

             <ul className="space-y-3 mb-10 flex-grow text-xs">
                {["Research-Ready Prototype", "Chapter 1-5 Documentation", "Turnitin Report", "SPSS Data Analysis", TIMELINES.rush].map((item, i) => (
                 <li key={i} className="flex items-center gap-2 font-bold text-white/70">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#ec4899] flex-shrink-0"></div> {item}
                 </li>
               ))}
             </ul>

             <div className="mt-auto">
                <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">STARTING AT</p>
                <p className="text-3xl font-black text-white mb-6">{PRICING.thesis}+</p>
                <Link href="/thesis">
                  <Button variant="outline" className="w-full uppercase font-black tracking-widest text-[9px] py-4 border-[#1E293B] group-hover:border-[#ec4899] gap-2">
                    Begin Research <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
             </div>
          </FadeIn>
        </div>
      </section>

      {/* MODERN STACK */}
      <section className="container mx-auto px-6 py-20 max-w-7xl">
        <FadeIn direction="up">
          <div className="card-styled p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
            <h2 className="text-3xl font-black text-white mb-4">Modern Stack</h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Built with the same industry standards used by top tech companies globally.
            </p>
          </div>
          
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {TECH_STACK.map((tech, idx) => (
              <div key={idx} className="flex items-center justify-between p-5 rounded-xl border border-[#1E293B] bg-[#0B1121] hover:border-[#334155] transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#06b6d4]"></span>
                  <span className="font-bold text-white text-sm">{tech.name}</span>
                </div>
                <span className="text-[9px] font-black tracking-widest uppercase text-white/40">{tech.type}</span>
              </div>
            ))}
          </div>
        </div>
        </FadeIn>

      </section>

      {/* CONTACT CTA */}
      <section className="container mx-auto px-6 py-12 max-w-7xl pb-32">
        <FadeIn direction="up" delay={0.2}>
          <div className="card-styled p-8 md:p-16 flex flex-col lg:flex-row justify-between items-center gap-12 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#06b6d4]/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="flex-1 space-y-8 relative z-10 w-full">
            <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter leading-none text-white">
              Let&apos;s Build Something<br/>
              <span className="text-[#06b6d4]">Great Together.</span>
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-[#fbbf24]/10 flex items-center justify-center">
                  <MessageSquare size={18} className="text-[#fbbf24]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">WHATSAPP / SMS</p>
                  <p className="font-bold text-white">{CONTACT.whatsapp}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-[#06b6d4]/10 flex items-center justify-center">
                  <Facebook size={18} className="text-[#06b6d4]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">FACEBOOK</p>
                  <p className="font-bold text-white">{CONTACT.facebook}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-[#06b6d4]/10 flex items-center justify-center">
                  <Mail size={18} className="text-[#06b6d4]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">EMAIL</p>
                  <p className="font-bold text-white">{CONTACT.email}</p>
                </div>
              </div>
            </div>

             <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="inline-flex px-4 py-2 rounded-full border border-[#fbbf24]/30 bg-[#fbbf24]/5 text-[#fbbf24] text-xs font-bold items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]"></span>
                Limited availability this week
              </div>
              <div className="inline-flex px-4 py-2 rounded-full border border-[#06b6d4]/30 bg-[#06b6d4]/5 text-[#06b6d4] text-[10px] font-black uppercase tracking-widest items-center gap-2">
                <ShieldCheck size={12} />
                Secure & Confidential
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 relative z-10 flex flex-col items-center">
            <div className="bg-white p-6 rounded-2xl w-64 h-64 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(6,182,212,0.15)] hover:scale-105 transition-transform duration-500 cursor-pointer relative group">
              {/* Active Now Pulse */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0F172A] border border-[#22c55e]/30 px-3 py-1 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <p className="text-[9px] font-black text-green-500 uppercase tracking-tighter">Active Now • <span className="text-white/60">Fast Response</span></p>
              </div>

              {/* QR Code */}
              <div className="w-24 h-24 border border-[#06b6d4]/30 rounded-lg flex items-center justify-center bg-white mb-2 overflow-hidden p-1">
                {/* Dynamic QR code - generates a WhatsApp chat link QR */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(WHATSAPP_QR_DATA)}`}
                  alt="Scan to message on WhatsApp"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[#0F172A] font-black text-xs uppercase tracking-widest">SCAN TO MESSAGE</p>
            </div>

            <div className="mt-8 text-center space-y-4">
              <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Bank & Digital Pay Verified</p>
              <div className="flex items-center gap-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-80 transition-all duration-500">
                {PAYMENT_METHODS.map((method) => (
                  <span
                    key={method}
                    className={`text-[11px] font-black px-2 py-0.5 rounded border italic ${
                      method === "PayPal"
                        ? "text-[#003087] bg-white border-[#003087]/20"
                        : "text-white bg-white/5 border-white/10"
                    }`}
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
            
            <Link href="/portal/mark-admin-2026" className="absolute -bottom-20 right-0 p-3 opacity-20 hover:opacity-100 transition-opacity">
              <Lock size={16} className="text-[#06b6d4]" />
            </Link>
          </div>
        </div>
        </FadeIn>
      </section>

    </div>
  );
}
