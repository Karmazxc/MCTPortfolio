import React from "react";

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

export function GlowingCard({ children, className = "", padding = "md" }: GlowingCardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6 sm:p-8",
    lg: "p-8 sm:p-12",
  };

  return (
    <div className={`relative bg-card/40 backdrop-blur-sm rounded-2xl glow-border ${paddings[padding]} ${className}`}>
      {/* Optional internal gradient orb effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
