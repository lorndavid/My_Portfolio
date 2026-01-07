import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Terminal, Cpu, Globe, Zap } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // 1. Text Entrance (Staggered Fade Up)
      gsap.from(".about-text-item", {
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      });

      // 2. Image Parallax (Deep Effect)
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 20, // Moves image down slowly as you scroll
          scale: 1.1,
          scrollTrigger: {
            trigger: ".about-image-wrap",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          ease: "none",
        });
      }

      // 3. Floating Badge Parallax (Moves opposite to image)
      if (badgeRef.current) {
        gsap.to(badgeRef.current, {
          y: -50, // Floats upward
          scrollTrigger: {
            trigger: ".about-image-wrap",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 lg:py-32 bg-[#050505] overflow-hidden"
    >
      {/* --- SHARED BACKGROUND (Matches Hero/Skills) --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#050505]"></div>
        <div
          className="absolute inset-0 opacity-[0.03] z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] z-0"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* --- LEFT: TEXT CONTENT --- */}
          <div className="about-content order-2 lg:order-1">
            {/* Pill Tag */}
            <div className="about-text-item inline-flex items-center space-x-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span className="text-amber-500 font-bold text-[10px] uppercase tracking-[0.2em]">
                Who I Am
              </span>
            </div>

            {/* Headline */}
            <h2 className="about-text-item text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 leading-[0.9] tracking-tight">
              Bridging <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-white to-gray-500">
                Logic & Design
              </span>
            </h2>

            {/* Description */}
            <p className="about-text-item text-lg text-gray-400 leading-relaxed mb-6 max-w-lg">
              I am a hybrid developer who understands both the
              <span className="text-white font-medium">
                {" "}
                metal (hardware)
              </span>{" "}
              and the
              <span className="text-white font-medium"> pixel (software)</span>.
              My journey started in IT support, diagnosing physical networks,
              which gave me a grounded understanding of how systems truly work.
            </p>

            <p className="about-text-item text-lg text-gray-400 leading-relaxed mb-10 max-w-lg">
              Today, I build high-performance web applications, focusing on
              intuitive admin dashboards and management systems that solve real
              operational problems.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Cpu,
                  title: "Hardware Rooted",
                  desc: "Deep system knowledge",
                },
                {
                  icon: Globe,
                  title: "Web Architect",
                  desc: "Modern frontend stacks",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="about-text-item group p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors duration-300"
                >
                  <feature.icon className="text-amber-500 w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-bold text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT: IMAGE PARALLAX --- */}
          <div className="about-image-wrap relative order-1 lg:order-2 px-4 lg:px-0">
            {/* Main Image Frame */}
            <div className="aspect-[3/4] lg:aspect-[4/5] rounded-[2rem] overflow-hidden relative shadow-2xl border border-white/10 group">
              <div className="absolute inset-0 bg-gray-900 z-0"></div>

              {/* Image with Parallax Ref */}
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                alt="Tech Workspace"
                className="w-full h-[130%] object-cover absolute top-[-15%] left-0 opacity-80 grayscale group-hover:grayscale-0 transition-all duration-700 will-change-transform"
              />

              {/* Overlay Gradient (Fade at bottom) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60 z-10"></div>
            </div>

            {/* Floating Glass Experience Card */}
            <div
              ref={badgeRef}
              className="absolute -bottom-12 -right-4 lg:-left-12 lg:right-auto w-64 p-6 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-20"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-amber-500/10 rounded-lg text-amber-500">
                  <Zap size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                    Experience
                  </p>
                  <p className="text-white font-black text-xl">1+ Years</p>
                </div>
              </div>

              {/* Progress Bar visual */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase font-bold text-gray-500">
                  <span>Skill Growth</span>
                  <span>85%</span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[85%] animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Abstract Blur Element behind image */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
