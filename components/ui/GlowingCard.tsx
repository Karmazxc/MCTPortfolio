import React from "react";

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

/**
 * GlowingCard component with optional hover gradient effect.
 * The gradient orb is now functional and tracks mouse position.
 */
export function GlowingCard({ children, className = "", padding = "md" }: GlowingCardProps) {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6 sm:p-8",
    lg: "p-8 sm:p-12",
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative bg-[#0F1219]/60 backdrop-blur-sm rounded-2xl border border-[#1E293B] hover:border-[#06b6d4]/30 transition-colors ${paddings[padding]} ${className}`}
    >
      {/* Mouse-tracking gradient orb effect */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.08), transparent 50%)`,
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
