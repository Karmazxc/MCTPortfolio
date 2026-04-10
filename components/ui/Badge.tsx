import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  const variants = {
    default: "bg-neon-blue/10 text-neon-blue border border-neon-blue/20",
    success: "bg-green-500/10 text-green-400 border border-green-500/20",
    outline: "border border-card-border text-foreground hover:bg-neon-blue/5 hover:border-neon-blue/30 hover:text-neon-blue transition-all",
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
