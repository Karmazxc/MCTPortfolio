"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Profile image component with fallback to initials.
 * Replace /profile.png with your actual photo for best results.
 */
export function ProfileImage() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#06b6d4] to-[#0F172A]">
        <span className="text-4xl font-black text-white">MCT</span>
      </div>
    );
  }

  return (
    <Image
      src="/profile.png"
      alt="Mark Christian Trajano - Full-Stack Developer & Thesis Specialist"
      fill
      className="object-cover object-center"
      sizes="(max-width: 768px) 280px, 320px"
      priority
      onError={() => setHasError(true)}
    />
  );
}
