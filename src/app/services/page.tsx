"use client";

import React from "react";
import { ServicesTabs } from "@/components/ServicesTabs";

export default function ServicesPage() {
  return (
    <div className="min-h-screen relative overflow-hidden pb-32">
      {/* Glow backing */}
      <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vh] bg-[#f43f5e]/5 blur-[120px] rounded-full pointer-events-none z-[-1]"></div>

      <div className="container mx-auto px-6 pt-32 max-w-7xl relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">
            Specialized <span className="text-[#06b6d4]">Services</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-medium">
            High-performance commercial software and bespoke digital experiences. 
            Choose the service branch below that fits your needs.
          </p>
        </div>

        <ServicesTabs />
      </div>
    </div>
  );
}
