"use client";

import React from "react";
import { GlowingCard } from "@/components/ui/GlowingCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Send, Mail, MessageSquare, Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-12 lg:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Get In Touch</h1>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Ready to start your project or just have a question? Let's talk!
        </p>
        <div className="mt-4 inline-flex items-center gap-2">
           <Badge variant="success" className="animate-pulse">
             <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
             Replies within 1–2 hours
           </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <GlowingCard padding="lg" className="order-2 lg:order-1">
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-background/50 border border-card-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-neon-blue/50 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-background/50 border border-card-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-neon-blue/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Project Type</label>
              <select className="w-full bg-background/50 border border-card-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-neon-blue/50 transition-all appearance-none">
                <option value="web">Web Application</option>
                <option value="mobile">Mobile App</option>
                <option value="thesis">Thesis System</option>
                <option value="other">Other Inquiry</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Message</label>
              <textarea 
                rows={5}
                className="w-full bg-background/50 border border-card-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-neon-blue/50 transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <Button variant="primary" className="w-full flex justify-center items-center gap-2">
              <Send size={18} /> Send Message
            </Button>
          </form>
        </GlowingCard>

        <div className="order-1 lg:order-2 space-y-8 flex flex-col justify-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Direct Contact Options</h2>
            <p className="text-foreground/60 mb-8">Reach out via your preferred platform.</p>
          </div>

          <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-6 p-4 rounded-2xl hover:bg-card/40 transition-colors border border-transparent hover:border-card-border group">
            <div className="w-14 h-14 bg-[#25D366]/10 text-[#25D366] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Phone size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg">WhatsApp</h3>
              <p className="text-foreground/60 text-sm">{CONTACT.whatsapp}</p>
            </div>
          </a>

          <a href={`https://m.me/${CONTACT.messenger}`} target="_blank" rel="noreferrer" className="flex items-center gap-6 p-4 rounded-2xl hover:bg-card/40 transition-colors border border-transparent hover:border-card-border group">
            <div className="w-14 h-14 bg-[#0084FF]/10 text-[#0084FF] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Facebook Messenger</h3>
              <p className="text-foreground/60 text-sm">@{CONTACT.messenger}</p>
            </div>
          </a>

          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-card/40 transition-colors border border-transparent hover:border-card-border group">
            <div className="w-14 h-14 bg-neon-blue/10 text-neon-blue rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Email Address</h3>
              <p className="text-foreground/60 text-sm">{CONTACT.email}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
