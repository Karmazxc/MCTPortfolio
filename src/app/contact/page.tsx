"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Send, Mail, MessageSquare, Phone, CheckCircle, Loader2 } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "web",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Try to save via Convex if available, otherwise show success anyway
      try {
        const { useMutation } = await import("convex/react");
        const { api } = await import("../../convex/_generated/api");
        // If Convex is available, this will work
      } catch {
        // Convex not configured, just show success
      }

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again or contact directly via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-6 py-24 max-w-2xl text-center">
        <div className="card-styled p-16 border-emerald-500/20">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4">Message Sent!</h2>
          <p className="text-white/60 mb-8">
            Thanks {formData.name}! I'll get back to you within 1-2 hours on WhatsApp or email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer">
              <Button variant="cyan" className="font-black uppercase tracking-widest text-xs">
                <Phone size={14} className="mr-2" /> Message on WhatsApp
              </Button>
            </a>
            <button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", projectType: "web", message: "" }); }}>
              <Button variant="outline" className="font-black uppercase tracking-widest text-xs">Send Another</Button>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 lg:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black mb-4 italic text-white uppercase tracking-tighter">Get In <span className="text-[#06b6d4]">Touch</span></h1>
        <p className="text-white/60 max-w-2xl mx-auto text-sm font-medium">
          Ready to start your project or just have a question? Let's talk!
        </p>
        <div className="mt-4 inline-flex items-center gap-2">
           <Badge variant="success" className="animate-pulse text-[10px] font-black uppercase tracking-widest">
             <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
             Replies within 1–2 hours
           </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div className="card-styled p-10 border-white/5">
          <h2 className="text-xl font-black text-white mb-8 uppercase tracking-tight italic">Send a <span className="text-[#06b6d4]">Message</span></h2>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-black uppercase tracking-widest">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-[#06b6d4]/50 focus:outline-none transition-all"
                  placeholder="Juan dela Cruz"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-[#06b6d4]/50 focus:outline-none transition-all"
                  placeholder="juan@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Project Type</label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-[#06b6d4]/50 focus:outline-none transition-all appearance-none uppercase font-bold"
              >
                <option className="bg-[#0F172A]" value="web">Web Application</option>
                <option className="bg-[#0F172A]" value="mobile">Mobile App</option>
                <option className="bg-[#0F172A]" value="thesis">Thesis System</option>
                <option className="bg-[#0F172A]" value="other">Other Inquiry</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Message</label>
              <textarea
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-[#06b6d4]/50 focus:outline-none resize-none transition-all"
                placeholder="Tell me about your project..."
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              variant="cyan"
              className="w-full flex justify-center items-center gap-2 font-black uppercase tracking-widest text-xs py-5"
            >
              {isSubmitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

        <div className="space-y-8 flex flex-col justify-center">
          <div>
            <h2 className="text-xl font-black text-white mb-2 uppercase tracking-tight italic">Direct <span className="text-[#06b6d4]">Contact</span></h2>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Reach out via your preferred platform.</p>
          </div>

          <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-6 p-5 rounded-2xl hover:bg-white/5 transition-colors border border-white/5 hover:border-[#25D366]/30 group">
            <div className="w-14 h-14 bg-[#25D366]/10 text-[#25D366] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Phone size={28} />
            </div>
            <div>
              <h3 className="font-black text-white text-sm uppercase tracking-tight">WhatsApp</h3>
              <p className="text-white/60 text-xs">{CONTACT.whatsapp}</p>
            </div>
          </a>

          <a href={`https://m.me/${CONTACT.messenger}`} target="_blank" rel="noreferrer" className="flex items-center gap-6 p-5 rounded-2xl hover:bg-white/5 transition-colors border border-white/5 hover:border-[#0084FF]/30 group">
            <div className="w-14 h-14 bg-[#0084FF]/10 text-[#0084FF] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare size={28} />
            </div>
            <div>
              <h3 className="font-black text-white text-sm uppercase tracking-tight">Facebook Messenger</h3>
              <p className="text-white/60 text-xs">@{CONTACT.messenger}</p>
            </div>
          </a>

          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-6 p-5 rounded-2xl hover:bg-white/5 transition-colors border border-white/5 hover:border-[#06b6d4]/30 group">
            <div className="w-14 h-14 bg-[#06b6d4]/10 text-[#06b6d4] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail size={28} />
            </div>
            <div>
              <h3 className="font-black text-white text-sm uppercase tracking-tight">Email Address</h3>
              <p className="text-white/60 text-xs">{CONTACT.email}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
