"use client";

import React from "react";
import { GlowingCard } from "./ui/GlowingCard";
import { Badge } from "./ui/Badge";
import { motion } from "framer-motion";

export function HeroCard() {
  const tags = ["React", "Next.js", "TypeScript", "Tailwind", "React Native", "Convex"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <GlowingCard className="max-w-2xl mx-auto w-full text-center relative overflow-hidden" padding="lg">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-neon-blue/10 rounded-full blur-[50px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-neon-blue/5 rounded-full blur-[60px] translate-x-1/3 translate-y-1/3" />
        
        <div className="flex justify-center mb-6 relative">
          <Badge variant="success" className="animate-pulse">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
            Available for Projects
          </Badge>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gradient">
          Mark Christian Trajano
        </h1>
        
        <h2 className="text-xl md:text-2xl text-foreground/80 font-medium mb-6 glow-text">
          Full-Stack Web & Mobile Developer
        </h2>
        
        <p className="text-foreground/70 mb-8 max-w-lg mx-auto text-lg leading-relaxed">
          Building scalable web and mobile solutions for businesses and students.
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 mt-4 relative z-10">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="px-3 py-1 text-sm bg-background/50 backdrop-blur-sm">
              {tag}
            </Badge>
          ))}
        </div>
      </GlowingCard>
    </motion.div>
  );
}
