// @ts-nocheck
"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ExternalLink, Github, X } from "lucide-react";
import Link from "next/link";
// TODO: Uncomment when ready to use actual database
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  
  // Admin Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Web",
    tech: "",
    image: "",
    demoLink: "",
    codeLink: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Convex Queries and Mutations
  const dbProjects = useQuery(api.projects.getProjects) || [];
  const addProject = async (data: any) => console.log("DB Hook Placeholder:", data); // const addProject = useMutation(api.projects.addProject);
  
  const initialProjects = [
    {
      title: "ManilaPRO",
      description: "A dynamic real estate platform integrating property listings with predictive analytics for market trends and an interactive chat system for seamless client-agent communication.",
      category: "Web",
      year: "2024",
      tech: ["Next.js", "Tailwind", "Convex", "Analytics"],
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
      demoLink: "https://demo.com",
      codeLink: "#"
    },
    {
      title: "Student Task Tracker App",
      description: "A mobile application helping university students track thesis tasks and collaborate with groupmates.",
      category: "Mobile",
      year: "2023",
      tech: ["React Native", "Expo", "Firebase", "Zustand"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: "University Attendance System",
      description: "A thesis system utilizing QR codes and geolocation to monitor real-time class attendance securely.",
      category: "Thesis Systems",
      year: "2024",
      tech: ["React", "Express", "MongoDB", "QR Scanning"],
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop",
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: "E-Commerce SaaS Platform",
      description: "A comprehensive multi-tenant storefront for small businesses with integrated payments and analytics dashboards.",
      category: "Web",
      year: "2023",
      tech: ["Next.js", "Tailwind", "Convex", "Stripe"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: "Inventory Management System",
      description: "A specialized system for local hardware stores to track thousands of SKUs and generate weekly sales reports.",
      category: "Web",
      year: "2024",
      tech: ["React", "PostgreSQL", "Prisma", "Excel Export"],
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop",
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: "FitTrack Mobile",
      description: "Exercise tracking app with real-time calorie calculation and synchronization with wearable devices.",
      category: "Mobile",
      year: "2025",
      tech: ["React Native", "Expo", "HealthKit"],
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
      demoLink: "#",
      codeLink: "#"
    }
  ];

  // Combine fetched projects with initial hardcoded projects
  const allProjects = [...dbProjects, ...initialProjects];

  const categories = ["All", "Web", "Mobile", "Thesis Systems"];
  const filteredProjects = filter === "All" ? allProjects : allProjects.filter(p => p.category === filter);

  return (
    <div className="container mx-auto px-6 py-24 max-w-6xl relative min-h-screen">
      
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 italic uppercase tracking-tighter">Project <span className="text-[#06b6d4]">Archives</span></h1>
        <p className="text-white/60 text-sm font-medium max-w-xl mx-auto leading-relaxed">
          A collection of scalable web platforms, high-performance mobile apps, and detailed academic thesis systems built with modern tech.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 border h-12 flex items-center ${
              filter === cat 
                ? "bg-[#06b6d4] text-[#0A0F1C] border-[#06b6d4] shadow-[0_0_30px_rgba(6,182,212,0.3)] scale-105" 
                : "bg-white/5 text-white/40 border-white/10 hover:text-white hover:border-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <div key={idx} className="card-styled overflow-hidden group flex flex-col h-full border-white/5 hover:border-[#06b6d4]/30 transition-all duration-700">
            
            <div className="h-56 bg-[#1E293B] overflow-hidden relative">
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-[1.5s]"
                style={{ backgroundImage: `url('${project.image}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/40 to-transparent opacity-90"></div>
              
              <div className="absolute top-4 left-4">
                 <span className="inline-block px-3 py-1 bg-[#06b6d4]/10 border border-[#06b6d4]/20 text-[#06b6d4] text-[9px] font-black tracking-widest uppercase rounded backdrop-blur-md">
                   {project.category}
                 </span>
              </div>
              <div className="absolute top-4 right-4 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{project.year}</div>
            </div>

            <div className="p-8 flex-grow flex flex-col">
              <h3 className="text-2xl font-black text-white tracking-tight mb-3 group-hover:text-[#06b6d4] transition-colors">{project.title}</h3>
              <p className="text-xs text-white/50 mb-8 leading-relaxed flex-grow font-medium">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((t: string) => (
                  <span key={t} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-white/60 uppercase tracking-widest group-hover:border-white/20 transition-colors">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mt-auto">
                {project.demoLink && project.demoLink !== "#" ? (
                  <a href={project.demoLink} target="_blank" rel="noreferrer" className="flex-1">
                    <Button variant="cyan" size="sm" className="w-full rounded-lg uppercase tracking-widest text-[9px] font-black h-11 bg-[#06b6d4] text-[#0A0F1C] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                       Live Demo ↗
                    </Button>
                  </a>
                ) : (
                  <Button disabled size="sm" className="flex-1 rounded-lg uppercase tracking-widest text-[9px] font-black h-11 bg-white/5 text-white/20 border-white/10 cursor-not-allowed">
                     No Demo
                  </Button>
                )}
                
                {project.codeLink && project.codeLink !== "#" ? (
                  <a href={project.codeLink} target="_blank" rel="noreferrer" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full rounded-lg uppercase tracking-widest text-[9px] font-black h-11 border-white/10 hover:bg-white/5">
                       View Code
                    </Button>
                  </a>
                ) : (
                  <Button disabled size="sm" className="flex-1 rounded-lg uppercase tracking-widest text-[9px] font-black h-11 bg-white/5 text-white/20 border-white/10 cursor-not-allowed">
                     Private
                  </Button>
                )}
              </div>
            </div>

          </div>
        ))}

        {/* COMING SOON PLACEHOLDER */}
        <div className="card-styled overflow-hidden flex flex-col h-full border-dashed border-white/20 bg-transparent min-h-[400px] flex items-center justify-center text-center p-12 group hover:border-[#06b6d4]/50 transition-all duration-700">
           <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-dashed border-white/10 flex items-center justify-center mx-auto group-hover:scale-110 group-hover:border-[#06b6d4]/30 transition-all duration-500">
                <span className="text-2xl text-white/20 group-hover:text-[#06b6d4] transition-colors">+</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white/40 uppercase tracking-widest mb-1 group-hover:text-white transition-colors text-sm">More projects coming soon</h3>
                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">2 builds in progress</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
