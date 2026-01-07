import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download } from "lucide-react"; // Import Download icon

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
      const deleteSpeed = 30;

      if (isDeleting) {
        charIndex--;
        typeSpeed = deleteSpeed;
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
        typeSpeed = 2000;
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
        const tl = gsap.timeline({
          onComplete: () => setCurrentIndex(nextIndex),
        });

        tl.to(images[currentIndex] as HTMLElement, {
          opacity: 0,
          scale: 1.1,
          filter: "blur(8px)",
          duration: 1,
          ease: "power2.inOut",
        });
        tl.to(
          images[nextIndex] as HTMLElement,
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.inOut",
          },
          "-=0.8"
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

      // Mobile Entrance
      tl.set(".mobile-content-wrap", { y: 50, opacity: 0 });

      // Main Sequence
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
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.5"
        );

      // Desktop Parallax
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

      const handleMouseMove = (e: MouseEvent) => {
        if (window.innerWidth < 1024) return;
        const { clientX, clientY } = e;
        const xPercent = clientX / window.innerWidth - 0.5;
        const yPercent = clientY / window.innerHeight - 0.5;

        gsap.to(".hero-image-wrap", {
          x: xPercent * 20,
          y: yPercent * 20,
          duration: 2,
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
      className="relative w-full h-[100dvh] lg:h-[140vh] bg-[#050505] overflow-hidden font-sans text-slate-100"
    >
      <div
        ref={heroInnerRef}
        className="absolute inset-0 w-full h-[100dvh] lg:h-[100vh] flex items-center justify-center"
      >
        {/* --- 1. MODERN BACKGROUND LAYER (Clean Grid) --- */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-black"></div>
          <div
            className="absolute inset-0 opacity-[0.03] z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          ></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] z-0"></div>
        </div>

        {/* --- 2. IMAGE LAYER --- */}
        <div className="hero-image-wrap absolute inset-0 w-full h-full z-10 flex justify-center">
          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black via-black/60 to-transparent z-20 pointer-events-none"></div>

          {IMAGES.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`Lorn David ${idx}`}
              className={`hero-slide absolute inset-0 w-full h-[100dvh] lg:h-full object-cover lg:object-contain 
                object-[center_20%] lg:object-center 
                transition-all duration-1000 ease-out
                ${
                  idx === currentIndex
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              style={{ zIndex: 10 }}
            />
          ))}
        </div>

        {/* --- 3. DESKTOP CONTENT (Hidden on Mobile) --- */}
        <div className="hidden lg:flex absolute inset-0 items-center justify-between px-24 z-30 pointer-events-none max-w-[1600px] mx-auto">
          <div className="name-overlay pointer-events-auto mix-blend-difference text-white">
            <h1 className="text-[10rem] font-black leading-[0.8] tracking-tighter">
              LORN
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                DAVID
              </span>
            </h1>
          </div>
          <div className="role-overlay flex flex-col items-end pointer-events-auto text-right">
            <div className="flex items-center space-x-3 mb-4 bg-white/5 border border-white/10 px-4 py-1 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-300">
                Open to Work
              </span>
            </div>
            <p className="text-white/60 text-xl font-light mb-1">
              Expertise in
            </p>
            <p className="text-5xl font-bold text-white tracking-tight min-w-[400px]">
              <span
                ref={typeTargetRef}
                className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
              ></span>
              <span className="inline-block w-[3px] h-[0.9em] bg-amber-400 ml-2 animate-blink"></span>
            </p>

            {/* Desktop Download CV Button */}
            <a
              href="/Lorn_David_CV.pdf" // Replace with actual path
              download
              className="mt-8 flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 group"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-widest">
                Download CV
              </span>
            </a>
          </div>
        </div>

        {/* --- 4. MOBILE CONTENT (Transparent Background / No Box) --- */}
        <div className="mobile-content-wrap lg:hidden absolute inset-x-0 bottom-8 z-40 px-6">
          <div className="flex flex-col items-start space-y-2">
            {/* Status Line */}
            <div className="flex items-center space-x-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-amber-400 uppercase drop-shadow-md">
                Online
              </span>
            </div>

            {/* Name */}
            <div className="relative">
              <h2 className="text-5xl font-black text-white leading-none tracking-tight drop-shadow-xl">
                Lorn David
              </h2>
              <div className="h-1 w-16 bg-amber-500 mt-3 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
            </div>

            {/* Role */}
            <div className="w-full pt-2 mt-1">
              <p className="text-gray-200 text-lg font-medium flex items-center drop-shadow-md">
                I am a&nbsp;
                <span className="text-white font-bold">
                  <span ref={mobileTypeTargetRef}></span>
                  <span className="text-amber-500 animate-pulse">|</span>
                </span>
              </p>
            </div>

            {/* Mobile Download CV Button */}
            <a
              href="/Lorn_David_CV.pdf" // Replace with actual path
              download
              className="mt-6 flex items-center gap-3 px-6 py-3 bg-amber-500 text-black rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-transform"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </div>
        </div>

        {/* --- 5. TOP LEFT LOGO --- */}
        <div className="absolute top-6 left-6 lg:top-10 lg:left-10 z-30 mix-blend-difference"></div>
      </div>
    </div>
  );
};

export default Hero;
