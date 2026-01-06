import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const IMAGES = [
  "https://i.postimg.cc/hPssGvTs/vidddddd-removebg-preview.png",
  "https://i.postimg.cc/xdwyZzVS/david02.png",
  "https://i.postimg.cc/ncFKNxgs/david.png",
  "https://i.postimg.cc/0215N2xT/re.png",
  "https://i.postimg.cc/MK7JT7py/vidd05-removebg-preview.png",
];

const ROLES = [
  "Frontend Developer",
  "UI/UX Designer",
  "Software Engineer",
  "IT Specialist",
  "Network Engineer",
];

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const typeTargetRef = useRef<HTMLSpanElement>(null);
  const mobileTypeTargetRef = useRef<HTMLSpanElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- 1. Typewriter Logic ---
  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const handleType = () => {
      const currentRole = ROLES[roleIndex];

      if (isDeleting) {
        charIndex--;
        typeSpeed = 50;
      } else {
        charIndex++;
        typeSpeed = 100;
      }

      if (typeTargetRef.current)
        typeTargetRef.current.textContent = currentRole.substring(0, charIndex);
      if (mobileTypeTargetRef.current)
        mobileTypeTargetRef.current.textContent = currentRole.substring(
          0,
          charIndex
        );

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 3000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % ROLES.length;
        typeSpeed = 500;
      }

      setTimeout(handleType, typeSpeed);
    };

    const timer = setTimeout(handleType, 1500);
    return () => clearTimeout(timer);
  }, []);

  // --- 2. Image Slider Logic ---
  useGSAP(
    () => {
      const images = gsap.utils.toArray(".hero-slide");
      const playSlider = () => {
        const nextIndex = (currentIndex + 1) % IMAGES.length;

        // Fade cross logic
        const tl = gsap.timeline({
          onComplete: () => setCurrentIndex(nextIndex),
        });

        tl.to(images[currentIndex] as HTMLElement, {
          opacity: 0,
          scale: 1.1,
          duration: 1.2,
          ease: "power2.inOut",
        });
        tl.to(
          images[nextIndex] as HTMLElement,
          { opacity: 1, scale: 1, duration: 1.2, ease: "power2.inOut" },
          "-=1.0"
        );
      };

      const timer = gsap.delayedCall(5, playSlider);
      return () => timer.kill();
    },
    { scope: containerRef, dependencies: [currentIndex] }
  );

  // --- 3. Scroll & Entrance Animations ---
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline();

      // Initial Entrance
      tl.set([".name-overlay", ".role-overlay", ".mobile-content-wrap"], {
        opacity: 0,
        y: 30,
      });
      tl.to(".hero-image-wrap", {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      })
        .to(
          ".name-overlay",
          { opacity: 1, x: 0, duration: 1.5, ease: "power4.out" },
          "-=1"
        )
        .to(
          ".role-overlay",
          { opacity: 1, x: 0, duration: 1.5, ease: "power4.out" },
          "-=1.3"
        )
        .to(
          ".mobile-content-wrap",
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=1"
        );

      // Desktop Pinning
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "+=100%",
            pin: heroInnerRef.current,
            scrub: true,
          });
        },
      });

      // Desktop Parallax
      const handleMouseMove = (e: MouseEvent) => {
        if (window.innerWidth < 1024) return;
        const { clientX, clientY } = e;
        const xPercent = clientX / window.innerWidth - 0.5;
        const yPercent = clientY / window.innerHeight - 0.5;

        gsap.to(".hero-image-wrap", {
          x: xPercent * 30,
          y: yPercent * 30,
          duration: 2,
          ease: "power2.out",
        });
        gsap.to(".name-overlay", {
          x: -xPercent * 50,
          y: -yPercent * 20,
          duration: 2.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] lg:h-[140vh] bg-dark overflow-hidden"
    >
      <div
        ref={heroInnerRef}
        className="absolute inset-0 w-full h-[100dvh] lg:h-[100vh] flex items-center justify-center"
      >
        {/* --- Background / Image Layer --- */}
        <div className="hero-image-wrap absolute inset-0 w-full h-full z-0">
          {/* Gradient Scrim for Mobile Readability */}
          {/* Made slightly darker at bottom so text pops */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark/20 via-transparent to-dark lg:hidden z-20"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-dark via-dark/70 to-transparent lg:hidden z-20"></div>

          {IMAGES.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`Lorn David ${idx}`}
              // FIX: Changed object-top to object-[center_30%]
              // This aligns the image to the "upper-middle", pulling the face up.
              className={`hero-slide absolute inset-0 w-full h-full lg:object-contain object-cover object-[center_30%] transition-opacity duration-1000 
                ${
                  idx === currentIndex
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              style={{ zIndex: 10 }}
            />
          ))}
        </div>

        {/* --- DESKTOP CONTENT (Hidden on Mobile) --- */}
        <div className="hidden lg:flex absolute inset-0 items-center justify-between px-24 z-30 pointer-events-none max-w-[1920px] mx-auto">
          {/* Left: Name */}
          <div className="name-overlay pointer-events-auto">
            <h1 className="text-[12rem] xl:text-[14rem] font-display font-black leading-[0.75] text-white tracking-tighter drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
              LORN
              <br />
              <span className="text-primary bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                DAVID
              </span>
            </h1>
          </div>

          {/* Right: Role */}
          <div className="role-overlay flex flex-col items-end pointer-events-auto text-right">
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-gray-500">
                Established 2024
              </span>
              <div className="w-16 h-[1px] bg-white/20"></div>
            </div>
            <p className="text-white/40 text-2xl font-light mb-2">I am a</p>
            <p className="text-6xl font-display font-black text-white tracking-tight">
              <span
                ref={typeTargetRef}
                className="bg-gradient-to-l from-white to-gray-400 bg-clip-text text-transparent"
              ></span>
              <span className="inline-block w-[4px] h-[0.8em] bg-primary ml-2 animate-pulse"></span>
            </p>
          </div>
        </div>

        {/* --- MOBILE CONTENT --- */}
        <div className="mobile-content-wrap lg:hidden absolute inset-x-0 bottom-0 z-30 flex flex-col items-center justify-end pb-16 px-6">
          {/* 1. Name Tag */}
          <div className="mb-4 flex items-center space-x-2 opacity-80">
            <div className="h-[1px] w-8 bg-primary"></div>
            <span className="text-primary font-bold tracking-widest text-xs uppercase">
              Lorn David
            </span>
            <div className="h-[1px] w-8 bg-primary"></div>
          </div>

          {/* 2. Main Typewriter */}
          <div className="w-full text-center relative">
            <h2 className="text-[9vw] font-display font-black text-white leading-none drop-shadow-xl">
              <span ref={mobileTypeTargetRef}></span>
              <span className="text-primary inline-block">.</span>
            </h2>
          </div>

          {/* 3. Status Badge */}
          <div className="mt-8 flex items-center justify-center space-x-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-medium tracking-widest text-gray-300 uppercase">
              Available for Hire
            </span>
          </div>
        </div>

        {/* Background Decorative Text (Subtle) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none -z-10">
          <span className="text-[40vh] font-black font-display text-white">
            LD
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
