"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/Button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/services" },
    { name: "Thesis", href: "/thesis" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0B1121]/90 backdrop-blur-md border-b border-[#1E293B]" role="banner">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="MCT.DEV - Go to homepage">
          <span className="text-xl font-black text-[#06b6d4] tracking-tight" aria-hidden="true">MCT<span className="text-white">.DEV</span></span>
          <span className="hidden sm:inline-flex px-2 py-0.5 rounded border border-[#1E293B] text-[10px] font-medium text-white/70 bg-[#0F172A] tracking-wider uppercase">
            PH / FULL-STACK
          </span>
        </Link>

        <nav className="hidden md:flex space-x-6 text-[11px] font-bold uppercase tracking-widest" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${isActive ? "text-[#06b6d4] font-black" : "text-white/80 font-bold hover:text-white"}`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/quote" className="hidden md:block">
            <Button variant="primary" size="sm" className="font-black text-[10px] tracking-widest uppercase px-6">
              HIRE ME
            </Button>
          </Link>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[#0B1121] border-b border-[#1E293B] overflow-hidden"
          >
            <motion.div
              className="px-6 py-8 space-y-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-lg font-black uppercase tracking-tighter italic ${pathname === link.href ? "text-[#06b6d4]" : "text-white"}`}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link href="/quote" onClick={() => setIsMobileMenuOpen(false)} className="block pt-4">
                  <Button variant="primary" className="w-full font-black uppercase tracking-widest text-xs py-4">
                    Get A Quote ⚡
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
