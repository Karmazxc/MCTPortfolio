"use client";

import React, { useState } from "react";
import { X, Calendar, ArrowRight } from "lucide-react";

export function StickyAnnouncement() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center ${
        isOpen ? "translate-x-0" : "translate-x-[280px]"
      }`}
    >
      {/* VERTICAL TAB - The "Handle" */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group bg-[#0B1121]/80 backdrop-blur-2xl border-y border-l border-white/10 hover:border-[#06b6d4]/50 pl-3 pr-2 py-8 rounded-l-3xl flex flex-col items-center gap-6 transition-all duration-500 shadow-[20px_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#06b6d4]/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000"></div>
        
        <div className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"></span>
        </div>
        
        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-[#06b6d4] [writing-mode:vertical-lr] rotate-180 transition-colors duration-500">
          Open for Work
        </span>
      </button>

      {/* SLIDE-IN PANEL - The "Vault" */}
      <div className="w-[280px] bg-[#0B1121]/90 backdrop-blur-3xl border-y border-l border-white/10 p-10 shadow-[-20px_0_80px_rgba(0,0,0,0.8)] relative overflow-hidden rounded-l-[2rem]">
        {/* Subtle Cyber Grid Background Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-white/10 hover:text-white hover:rotate-90 transition-all duration-500"
        >
          <X size={20} />
        </button>

        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-3">
             <div className="h-px flex-grow bg-gradient-to-r from-transparent to-white/10"></div>
             <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#06b6d4] whitespace-nowrap">Status: Active</span>
             <div className="h-px w-4 bg-white/10"></div>
          </div>

          <div className="space-y-4">
            <h3 className="text-3xl font-black text-white italic leading-none uppercase tracking-tighter">
              New Output <br/> 
              for <span className="text-[#fbbf24] drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">2026</span>
            </h3>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-relaxed">
              Currently accepting priority slots for complex web engines & thesis systems.
            </p>
          </div>

          <div className="pt-2">
            <a 
              href="/quote" 
              onClick={() => setIsOpen(false)}
              className="relative flex items-center justify-center w-full bg-white/5 hover:bg-[#06b6d4] border border-white/10 hover:border-transparent py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] text-white hover:text-[#0B1121] transition-all duration-500 group/btn shadow-[0_0_0_1px_rgba(253,253,253,0.05)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-3">
                Secure a Slot 
                <span className="group-hover/btn:translate-x-2 transition-transform duration-500 italic">
                  <ArrowRight size={14} />
                </span>
              </span>
            </a>
          </div>

          <div className="flex justify-center">
            <p className="text-[8px] text-white/20 font-black uppercase tracking-[0.5em] animate-pulse">Limited Availability</p>
          </div>
        </div>
      </div>
    </div>
  );
}
