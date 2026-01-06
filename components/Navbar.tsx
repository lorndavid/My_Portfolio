import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Menu, X, Code2 } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Works', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  // 1. Scroll Detection for Glass Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Mobile Menu Animation (Timeline)
  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });

    // Menu Container Animation
    tl.to(menuRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power3.inOut',
      display: 'flex'
    });

    // Staggered Links Animation
    tl.from('.mobile-nav-link', {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.4,
      ease: 'back.out(1.7)'
    }, "-=0.2");

    if (isOpen) {
      tl.play();
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
      tl.reverse();
      document.body.style.overflow = '';
    }
  }, { scope: containerRef, dependencies: [isOpen] });

  // 3. Desktop Hover Effect (Mouse Enter/Leave)
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { scale: 1.1, color: '#fff', duration: 0.3, ease: 'power2.out' });
    gsap.to(e.currentTarget.querySelector('.dot'), { scale: 1, opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { scale: 1, color: '#9ca3af', duration: 0.3, ease: 'power2.out' });
    gsap.to(e.currentTarget.querySelector('.dot'), { scale: 0, opacity: 0, duration: 0.3 });
  };

  return (
    <nav 
      ref={containerRef} 
      className={`fixed top-0 left-0 w-full z-30 transition-all duration-500 ease-in-out border-b 
        ${isScrolled 
          ? 'h-20 bg-dark/80 backdrop-blur-md border-white/5 shadow-lg' 
          : 'h-24 bg-transparent border-transparent'
        }`}
    >
      <div className="container mx-auto px-6 h-full flex justify-between items-center">
        
        {/* --- Logo --- */}
        <a href="#home" className="group flex items-center gap-2 z-[60]">
          
          <span className="text-xl md:text-2xl font-display font-bold text-white tracking-tighter">
            LORN <span className="text-gray-500 group-hover:text-primary transition-colors duration-300"> DAVID</span> <span>.</span>
          </span>
        </a>

        {/* --- Desktop Menu (PC/Tablet) --- */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-gray-400 uppercase tracking-widest transition-colors"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {link.name}
              {/* Glowing Dot Indicator */}
              <span className="dot absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full opacity-0 scale-0 shadow-[0_0_10px_#3b82f6]"></span>
            </a>
          ))}

          {/* Call to Action Button */}
          <a 
            href="#contact" 
            className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-wider hover:bg-primary hover:border-primary hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300"
          >
            Hire Me
          </a>
        </div>

        {/* --- Mobile Toggle Button --- */}
        <button 
          className="md:hidden z-[60] relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="text-white w-6 h-6" /> : <Menu className="text-white w-6 h-6" />}
        </button>

        {/* --- Mobile Full Screen Menu --- */}
        <div 
          ref={menuRef} 
          className="fixed inset-0 w-full h-[100dvh] bg-dark/95 backdrop-blur-xl z-50 hidden flex-col items-center justify-center"
          style={{ opacity: 0, transform: 'translateY(-20px)' }}
        >
          {/* Decorative Background */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
             <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]"></div>
             <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px]"></div>
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-8 text-center">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="mobile-nav-link text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 hover:to-primary transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Footer Info */}
          <div className="absolute bottom-12 flex flex-col items-center space-y-4 mobile-nav-link">
            <div className="w-12 h-1 bg-white/10 rounded-full"></div>
            <p className="text-gray-500 text-xs tracking-[0.2em] uppercase">Based in Cambodia</p>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;