"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Mail, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#0A0A0D] border-t border-white/5 z-40 relative">
      <div className="container mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 flex items-center justify-center">
               <MessageCircle size={18} />
             </div>
             <div><span className="text-sm font-bold text-white">09922972119</span> <span className="text-xs text-white/50">(WhatsApp)</span></div>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 flex items-center justify-center">
               <Mail size={18} />
             </div>
             <span className="text-sm font-medium text-white/80">trajano.mark0826@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-blue-600/10 border border-blue-600/30 text-blue-500 flex items-center justify-center">
               <Facebook size={18} />
             </div>
             <span className="text-sm font-medium text-white/80">facebook.com/superrmarky</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#06b6d4]">Scan to Message</span>
            <span className="text-[9px] uppercase font-black tracking-widest text-[#f43f5e] mt-1">Replies in 1-2 hours</span>
          </div>
          <div className="w-16 h-16 bg-white p-1 rounded border border-white/5 overflow-hidden relative">
             <Image
               src="/qr-code.png"
               alt="QR Code - Scan to message on WhatsApp"
               fill
               className="object-contain"
             />
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-6 flex flex-col items-center">
         <p className="text-xs text-white/40 uppercase tracking-widest font-black">
           © {new Date().getFullYear()} Mark Christian Trajano. All rights reserved.
         </p>
         <div className="flex gap-4 mt-4 text-[9px] text-[#06b6d4] font-black tracking-widest">
           <span>MADE WITH NEXT.JS</span>
           <span>·</span>
           <span>PHILIPPINES</span>
         </div>
      </div>
    </footer>
  );
}
