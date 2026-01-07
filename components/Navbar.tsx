import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Navigation Items
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Works", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  // --- 1. Scroll Detection ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- 2. Mobile Menu Animation ---
  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true });

      // Menu Overlay Entrance
      tl.to(menuRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power4.inOut",
        display: "flex",
      });

      // Staggered Link Entrance
      tl.from(
        ".mobile-link-item",
        {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      );

      // Line Separator Animation
      tl.from(
        ".mobile-divider",
        {
          scaleX: 0,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.5"
      );

      if (isOpen) {
        tl.play();
        document.body.style.overflow = "hidden"; // Lock scroll
      } else {
        tl.reverse();
        document.body.style.overflow = ""; // Unlock scroll
      }
    },
    { scope: containerRef, dependencies: [isOpen] }
  );

  // --- 3. Interaction Handlers ---

  // Close menu when a link is clicked (Mobile)
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Desktop Hover Effects
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { color: "#ffffff", duration: 0.3 });
    gsap.to(e.currentTarget.querySelector(".nav-dot"), {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "back.out(2)",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { color: "#9ca3af", duration: 0.3 });
    gsap.to(e.currentTarget.querySelector(".nav-dot"), {
      scale: 0,
      opacity: 0,
      duration: 0.3,
    });
  };

  return (
    <nav
      ref={containerRef}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out px-4 md:px-6
        ${isScrolled ? "py-4" : "py-6"}`}
    >
      {/* --- MAIN NAVBAR CONTAINER --- */}
      <div
        className={`relative mx-auto max-w-7xl flex items-center justify-between transition-all duration-500 z-[101]
          ${
            isScrolled
              ? "bg-black/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-lg"
              : "bg-transparent border-transparent px-0 py-2"
          }`}
      >
        {/* --- LOGO --- */}
        <a
          href="#home"
          onClick={handleLinkClick} // Close menu if clicking logo
          className="group flex items-center gap-2 z-[102]"
        >
          
          <span className="text-lg font-bold text-white tracking-tight">
            LORN{" "}
            <span className="text-white/50 group-hover:text-white transition-colors">
              DAVID.
            </span>
          </span>
        </a>

        {/* --- DESKTOP MENU (Hidden on Mobile) --- */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-gray-400 uppercase tracking-widest transition-colors py-2"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {link.name}
              <span className="nav-dot absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full opacity-0 scale-0"></span>
            </a>
          ))}
        </div>

        {/* --- DESKTOP CTA (Hidden on Mobile) --- */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="group relative px-5 py-2 rounded-full overflow-hidden bg-white text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-amber-400 transition-colors duration-300"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* --- MOBILE TOGGLE BUTTON --- */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-[102] w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/5 text-white hover:bg-white/20 transition-all active:scale-95"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* --- MOBILE FULLSCREEN MENU OVERLAY --- */}
        <div
          ref={menuRef}
          className="fixed inset-0 w-screen h-screen bg-[#050505]/95 backdrop-blur-3xl z-[100] hidden flex-col justify-between pt-24 pb-12 px-6"
          style={{ opacity: 0, transform: "translateY(-100%)" }}
        >
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-6 mt-4 w-full">
            <span className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase mb-2 mobile-link-item pl-1">
              Navigation
            </span>

            {navLinks.map((link, idx) => (
              <div
                key={link.name}
                className="group flex items-center justify-between mobile-link-item border-b border-white/5 pb-4 last:border-0"
              >
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-4xl font-black text-white group-hover:text-amber-500 transition-colors duration-300 tracking-tight w-full"
                >
                  <span className="text-sm font-normal text-gray-600 mr-4 align-top font-mono">
                    0{idx + 1}
                  </span>
                  {link.name}
                </a>
                <ArrowUpRight className="text-white/20 w-6 h-6 group-hover:text-amber-500 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            ))}
          </div>

          {/* Footer Area */}
          <div className="w-full space-y-6">
            <div className="mobile-divider w-full h-[1px] bg-white/10"></div>

            <div className="flex flex-col gap-4 mobile-link-item">
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="w-full py-4 bg-white text-black font-bold text-center uppercase tracking-widest rounded-xl hover:bg-amber-400 transition-colors"
              >
                Start a Project
              </a>

              <div className="flex justify-between items-center text-gray-500 text-xs uppercase tracking-wider">
                <span>Based in Cambodia</span>
                <div className="flex gap-4">
                  <a href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
