"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { STATS, PRICING } from "@/lib/constants";
import { 
  Code2, 
  Briefcase, 
  GraduationCap, 
  Brain, 
  Stethoscope, 
  Gavel, 
  BarChart3, 
  Plane, 
  Users, 
  Megaphone, 
  PenTool, 
  Leaf 
} from "lucide-react";

export default function ThesisPage() {

  return (
    <div className="container mx-auto px-6 py-24 max-w-6xl relative">
      
      {/* STICKY ANCHOR NAV */}
      <div className="hidden xl:block fixed left-10 top-1/2 -translate-y-1/2 z-50 space-y-4">
        {[
          { id: "benefits", label: "BENEFITS" },
          { id: "process", label: "PROCESS" },
          { id: "coverage", label: "CHAPTERS" },
          { id: "disciplines", label: "COURSES" },
        ].map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="group flex items-center gap-4 transition-all"
          >
            <span className="w-1 h-8 bg-white/10 group-hover:bg-[#06b6d4] transition-colors rounded-full overflow-hidden relative">
               <span className="absolute inset-0 bg-[#06b6d4] -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
            </span>
            <span className="text-[9px] font-black tracking-widest text-white/20 group-hover:text-white transition-colors">{link.label}</span>
          </a>
        ))}
      </div>
      <div className="mb-20">
        <span className="inline-block px-3 py-1 mb-6 border border-[#334155] rounded-full text-[10px] uppercase font-black tracking-widest text-[#fbbf24] bg-[#fbbf24]/5">
          Academic Support
        </span>
        <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
          Undergrad & Masteral <span className="text-[#fbbf24]">Thesis</span> Services
        </h1>
        <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
          Specialized academic support for <span className="text-white">Undergrad, Masteral, and Technical Research</span>. From concept to final defense.<br/>
          100% original, Turnitin-verified, and always on time.
        </p>
      </div>

      {/* WHY CHOOSE ME SECTION */}
      <section id="benefits" className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 scroll-mt-32">
        <div className="space-y-8">
          <h2 className="text-3xl font-black text-white">Why Students Choose Me</h2>
          <p className="text-white/70 leading-relaxed font-medium">
            I combine academic writing expertise with technical knowledge — making me uniquely suited for IT, Engineering, Nursing, and Social Science research.
          </p>

          <ul className="space-y-4">
            {[
              "Full Chapter 1-5 coverage or individual chapters",
              "IMRaD and traditional thesis formats",
              "APA 7th, Chicago, and MLA citation styles",
              "SPSS analysis and interpretation add-on",
              "Unlimited revisions until your adviser approves"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-sm font-bold text-white/90">
                <span className="text-[#fbbf24] mt-0.5">⊙</span> {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/quote">
               <Button variant="secondary" className="uppercase tracking-widest text-xs px-8">Start Your Thesis</Button>
            </Link>
            <Link href="/contact">
               <Button variant="outline" className="uppercase tracking-widest text-xs px-8">Ask a Question</Button>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-styled p-8 border-[#1E293B]">
            <div className="w-10 h-10 rounded-full bg-[#fbbf24]/10 text-[#fbbf24] flex items-center justify-center mb-6">
              <span className="text-xl">🛡</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">100% Turnitin Verified</h3>
            <p className="text-xs text-white/60">Every output comes with a similarity report. Originality is non-negotiable.</p>
          </div>
          
          </div>
       </section>

      {/* MID-PAGE CTA */}
      <div className="mb-32">
        <div className="card-styled p-12 flex flex-col md:flex-row items-center justify-between gap-8 border-[#1E293B] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#fbbf24]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-black text-white mb-2 italic">Ready to finish your degree?</h3>
            <p className="text-white/60 text-sm max-w-md">Get full Chapter 1-5 documentation starting at <span className="text-[#fbbf24] font-black">{PRICING.thesis}+</span>. Limited slots per semester.</p>
          </div>
          <Link href="/quote" className="relative z-10">
            <Button variant="primary" className="uppercase tracking-widest text-xs px-10 shadow-[0_0_20px_rgba(251,191,36,0.15)]">Request Priority Quote</Button>
          </Link>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="process" className="mb-32 scroll-mt-32">
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="h-px bg-[#1E293B] flex-1"></div>
          <span className="text-[10px] uppercase font-black tracking-widest text-[#06b6d4]">HOW IT WORKS</span>
          <div className="h-px bg-[#1E293B] flex-1"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {[
            { num: "01", title: "Consult", desc: "Share topic & requirements" },
            { num: "02", title: "Quote", desc: "Get price & timeline" },
            { num: "03", title: "Write", desc: "Drafts sent for review" },
            { num: "04", title: "Revise", desc: "Adjustments per adviser" },
            { num: "05", title: "Deliver", desc: "Final files + Report" }
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full border-2 border-[#fbbf24] text-[#fbbf24] flex items-center justify-center font-black text-sm mb-4 bg-[#fbbf24]/5">
                {step.num}
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{step.title}</h4>
              <p className="text-[10px] text-white/50 uppercase tracking-widest">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CHAPTER COVERAGE */}
      <section id="coverage" className="mb-32 scroll-mt-32">
        <div className="flex items-center justify-start gap-4 mb-10">
          <span className="text-[10px] uppercase font-black tracking-widest text-[#fbbf24]">CHAPTER COVERAGE</span>
          <div className="h-px bg-[#1E293B] flex-1 border-dashed"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { ch: "Ch.1", title: "Introduction", desc: "Background, SOP, Scope & Limitations" },
            { ch: "Ch.2", title: "Literature Review", desc: "Related studies, synthesis, framework" },
            { ch: "Ch.3", title: "Methodology", desc: "Research design, locales, instruments" },
            { ch: "Ch.4", title: "Results", desc: "Data presentation, SPSS, analysis" },
            { ch: "Ch.5", title: "Conclusions", desc: "Summary, actions, recommendations" }
          ].map((ch, i) => (
            <div key={i} className="card-styled px-4 py-8 text-center border-[#1E293B] hover:border-[#fbbf24]/50 transition-colors">
              <h4 className="text-xl font-black text-[#fbbf24] mb-2">{ch.ch}</h4>
              <p className="text-sm font-bold text-white mb-2">{ch.title}</p>
              <p className="text-[9px] text-white/50 uppercase tracking-widest max-w-[120px] mx-auto">{ch.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ALL MAJOR PROGRAMS */}
      <section id="disciplines" className="mb-16 scroll-mt-32">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-white mb-2">All Major Programs</h2>
          <p className="text-sm font-bold text-[#06b6d4]">Courses covered below — other courses applied upon request.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { 
              icon: <Code2 size={24} />, 
              title: "IT / CS / Engineering", 
              desc: "Capstone systems, software studies",
              topics: ["AI-Driven Data Analysis", "IoT Smart Home Systems", "Blockchain for Supply Chain"]
            },
            { 
              icon: <Briefcase size={24} />, 
              title: "Business / Mgmt", 
              desc: "Marketing, HRM, Entrepreneurship",
              topics: ["Consumer Behavior in E-commerce", "Strategic HRM in Remote Teams", "Lean Startup Methodologies"]
            },
            { 
              icon: <GraduationCap size={24} />, 
              title: "Education", 
              desc: "BSED, BEEd, teaching methods",
              topics: ["Digital Literacy in Schools", "Inclusive Education Strategies", "Gamification in Learning"]
            },
            { 
              icon: <Brain size={24} />, 
              title: "Psychology", 
              desc: "Behavioral studies, mental health",
              topics: ["Social Media & Mental Health", "CBT Outcome Analysis", "Work-Life Balance in Tech"]
            },
            { 
              icon: <Stethoscope size={24} />, 
              title: "Nursing / Health Sciences", 
              desc: "Clinical studies, public health",
              topics: ["Telemedicine in Rural areas", "Geriatric Patient Care", "Public Health Crisis Mgmt"]
            },
            { 
              icon: <Gavel size={24} />, 
              title: "Criminology / Law", 
              desc: "Justice systems, legal research",
              topics: ["Cybercrime in Digital Finance", "Juvenile Justice Systems", "Forensic Data Analysis"]
            },
            { 
              icon: <BarChart3 size={24} />, 
              title: "Accounting / Finance", 
              desc: "Feasibility, auditing, analysis",
              topics: ["Risk Management in Fintech", "Auditing for Sustainability", "Financial Literacy Trends"]
            },
            { 
              icon: <Plane size={24} />, 
              title: "Hospitality / Tourism", 
              desc: "Service quality, guest experience",
              topics: ["Sustainable Tourism Trends", "Tech in Guest Experience", "Eco-Resort Management"]
            },
            { 
              icon: <Users size={24} />, 
              title: "Social Work / Sociology", 
              desc: "Community studies, demographics",
              topics: ["Urban Poverty Dynamics", "Community Resilience", "Modern Gender Roles"]
            },
            { 
              icon: <Megaphone size={24} />, 
              title: "Communication / Media", 
              desc: "Digital media, journalism",
              topics: ["Misinformation & Social Media", "Digital Journalism Evolution", "Gen Z Brand Storytelling"]
            },
            { 
              icon: <PenTool size={24} />, 
              title: "Architecture / Design", 
              desc: "Planning, built environment",
              topics: ["Sustainable Urban Planning", "Biophilic Workspace Design", "Adaptive Reuse Projects"]
            },
            { 
              icon: <Leaf size={24} />, 
              title: "Biology / Env Science", 
              desc: "Sustainability, ecological studies",
              topics: ["Microplastics in Marine Life", "Climate Change Biodiversity", "Regenerative Agriculture"]
            }
          ].map((prog, i) => {
            const [expanded, setExpanded] = React.useState(false);
            return (
              <div 
                key={i} 
                onClick={() => setExpanded(!expanded)}
                className={`card-styled p-6 border-[#1E293B] hover:bg-[#0F172A]/80 transition-all cursor-pointer group flex flex-col ${expanded ? "ring-1 ring-[#06b6d4]/50 scale-[1.02] bg-[#0F172A]" : ""}`}
              >
                 <span className="text-[#fbbf24] mb-4 block group-hover:scale-110 transition-transform origin-left">{prog.icon}</span>
                 <h4 className="text-sm font-bold text-white mb-1">{prog.title}</h4>
                 <p className="text-[10px] text-white/50 leading-relaxed font-medium mb-4">{prog.desc}</p>
                 {expanded && (
                   <div className="pt-4 border-t border-[#1E293B] animate-in fade-in slide-in-from-top-2 duration-300">
                      <p className="text-[9px] text-[#06b6d4] font-black uppercase tracking-widest mb-2">Example Topics:</p>
                      <ul className="space-y-1">
                        {prog.topics.map((topic, tIdx) => (
                           <li key={tIdx} className="text-[10px] text-white/40">• {topic}</li>
                        ))}
                      </ul>
                   </div>
                 )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
