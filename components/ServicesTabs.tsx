"use client";

import React, { useState, useEffect, useRef } from "react";
import { LayoutTemplate, Smartphone, BookOpen, BarChart3, Palette, CheckCircle2, Zap } from "lucide-react";
import { PRICING, TIMELINES } from "@/lib/constants";

export function ServicesTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Close tooltip on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setTooltipOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const services = [
    {
      id: "web",
      title: "Web Development",
      subtitle: "Business Websites & Applications",
      icon: <LayoutTemplate size={24} />,
      desc: "Professional, conversion-focused websites and web applications. From landing pages to complex multi-role systems.",
      timeline: TIMELINES.basic,
      pricing: `${PRICING.basic}+`,
      included: [
        "Responsive design — all devices",
        "Portfolio & business websites",
        "Lead generation landing pages",
        "E-commerce with cart & payments",
        "SEO-optimized structure",
        "Source code delivered"
      ],
      extras: [
        "Free 1-page mockup first",
        "2 rounds of revisions",
        "Deployment assistance",
        "Post-delivery support",
        "Rush option available"
      ],
      tech: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Convex"]
    },
    {
      id: "mobile",
      title: "Mobile App Development",
      subtitle: "Android & iOS Applications",
      icon: <Smartphone size={24} />,
      desc: "Cross-platform mobile apps using React Native & Expo. One codebase, both iOS and Android.",
      timeline: TIMELINES.premium,
      pricing: `${PRICING.premium}+`,
      included: [
        "Android & iOS — single codebase",
        "Auth & user accounts",
        "Real-time data (Convex backend)",
        "Push notifications",
        "Offline support",
        "App Store ready"
      ],
      extras: [
        "Free UI wireframe first",
        "Full source code",
        "Deployment walkthrough",
        "3 revisions",
        "Both platforms tested"
      ],
      tech: ["React Native", "Expo", "TypeScript", "Tailwind CSS", "Convex"]
    },
    {
      id: "uiux",
      title: "UI/UX Design",
      subtitle: "Figma Designs & Prototypes",
      icon: <Palette size={24} />,
      desc: "Pixel-perfect, user-centered interface designs and interactive prototypes to visualize your product before development.",
      pricing: "₱5,000+",
      timeline: TIMELINES.design,
      included: [
        "User research & wireframes",
        "High-fidelity UI mockups",
        "Interactive Figma prototypes",
        "Design system creation",
        "Mobile & Web layouts"
      ],
      extras: [
        "Unlimited revisions",
        "Developer handoff ready",
        "Responsive design guidelines",
        "Source files included"
      ],
      tech: ["Figma", "FigJam", "UI Design", "UX Research", "Prototyping"]
    }
  ];

  const active = services[activeTab];

  return (
    <div className="w-full">
      {/* TABS HEADER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {services.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setActiveTab(idx)}
            className={`flex flex-col items-center justify-center text-center p-6 md:p-8 rounded-2xl border transition-all duration-300 min-h-[160px] md:min-h-[180px] group ${
              activeTab === idx 
                ? "bg-[#0F172A] border-[#06b6d4] shadow-[0_0_30px_rgba(6,182,212,0.2)] ring-1 ring-[#06b6d4]/50 scale-[1.02]" 
                : "bg-[#0B1121] border-[#1E293B] hover:border-[#334155] opacity-60 hover:opacity-100"
            }`}
          >
            <div className={`mb-4 p-3 rounded-xl border transition-all duration-500 ${
              activeTab === idx 
                ? "bg-[#06b6d4] text-[#0A0F1C] border-[#06b6d4]" 
                : "bg-white/5 text-white/30 border-white/5 group-hover:border-white/10"
            }`}>
              {/* @ts-ignore - Safely cloning icon component */}
              {React.cloneElement(s.icon as React.ReactElement, { size: 28 })}
            </div>
            <h3 className={`text-[11px] font-black uppercase tracking-widest mb-1 ${activeTab === idx ? "text-white" : "text-white/70"}`}>
              {s.title}
            </h3>
            <p className={`text-[8px] font-bold uppercase tracking-[0.2em] ${activeTab === idx ? "text-[#06b6d4]" : "text-white/20"}`}>
              {s.subtitle}
            </p>
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500" key={activeTab}>
        
        {/* HERO CARD */}
        <div className="card-styled p-8 md:p-12 border-[#1E293B]">
           <div className="w-16 h-16 rounded-xl border border-[#334155] bg-[#0B1121] flex items-center justify-center text-white mb-8">
             {active.icon}
           </div>
           
           <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{active.title}</h2>
           <p className="text-white/70 font-medium max-w-2xl leading-relaxed mb-10">
             {active.desc}
           </p>

           <div className="flex flex-col sm:flex-row gap-4">
             <div className="px-6 py-4 rounded-xl border border-[#1E293B] bg-[#0B1121] min-w-[200px]">
               <p className="text-[10px] uppercase font-black tracking-widest text-white/50 mb-1">TIMELINE</p>
               <p className="text-xl font-bold text-white">{active.timeline}</p>
             </div>
             <div className="px-6 py-4 rounded-xl border border-[#1E293B] bg-[#0B1121] min-w-[200px]">
               <p className="text-[10px] uppercase font-black tracking-widest text-white/50 mb-1">STARTING AT</p>
               <p className="text-xl font-bold text-white">{active.pricing}</p>
             </div>
           </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <div className="card-styled p-8 border-[#1E293B]">
              <div className="flex items-center gap-3 mb-6">
                 <CheckCircle2 className="text-white/60" size={24} />
                 <h3 className="text-xl font-bold text-white">What's Included</h3>
              </div>
              <ul className="space-y-4">
                {active.included.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-sm font-medium text-white/80">
                     <span className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center text-[10px] text-white/60 flex-shrink-0">✓</span>
                     {item}
                  </li>
                ))}
              </ul>
           </div>

           <div className="card-styled p-8 border-[#1E293B]">
                <div className="flex flex-col gap-1">
                  <span className="text-3xl font-black text-white">{active.pricing}</span>
                  <div className="relative w-fit" ref={tooltipRef}>
                    <span
                      className="text-[10px] text-[#06b6d4] font-black uppercase tracking-widest cursor-help border-b border-[#06b6d4]/30"
                      onClick={() => setTooltipOpen(!tooltipOpen)}
                      onMouseEnter={() => setTooltipOpen(true)}
                      onMouseLeave={() => setTooltipOpen(false)}
                      role="button"
                      tabIndex={0}
                      aria-expanded={tooltipOpen}
                      aria-label="What affects pricing? Click to learn more"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setTooltipOpen(!tooltipOpen);
                        }
                      }}
                    >
                      What affects pricing?
                    </span>
                    <div
                      className={`absolute left-0 bottom-full mb-2 w-64 p-4 bg-[#0F172A] border border-[#1E293B] rounded-xl shadow-2xl transition-all z-20 ${
                        tooltipOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                      }`}
                    >
                      <p className="text-[11px] text-white/70 leading-relaxed">
                        Pricing is determined by:
                        <br/>• Project Complexity
                        <br/>• Number of Features
                        <br/>• Turnaround Timeline
                        <br/>• Maintenance Requirements
                      </p>
                    </div>
                  </div>
                </div>
              <ul className="space-y-4">
                {active.extras.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-sm font-medium text-white/80">
                     <span className="text-white/40 flex-shrink-0">⚡</span>
                     {item}
                  </li>
                ))}
              </ul>
           </div>
        </div>

        {/* TECH STACK */}
        <div className="card-styled p-8 border-[#1E293B]">
           <h3 className="text-sm font-black text-white mb-6">Tech Stack</h3>
           <div className="flex flex-wrap gap-3">
                {active.tech.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-[#0F172A] border border-[#1E293B] rounded-full text-[10px] font-black text-white/70 uppercase tracking-widest flex items-center gap-1.5 hover:border-[#06b6d4]/30 hover:text-white transition-colors">
                    <span className="w-1 h-1 rounded-full bg-[#06b6d4]"></span>
                    {s}
                  </span>
                ))}
           </div>
        </div>

      </div>
    </div>
  );
}
