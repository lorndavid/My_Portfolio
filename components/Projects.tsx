import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "Student Management",
    category: "Web Application",
    desc: "A comprehensive dashboard for universities to manage student records, grades, and attendance seamlessly.",
    tech: ["Laravel", "React", "MySQL"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    year: "2024",
  },
  {
    id: 2,
    title: "Internet ISP Dashboard",
    category: "Network Tools",
    desc: "Real-time monitoring system for ISP providers to track bandwidth usage, user status, and hardware health.",
    tech: ["TypeScript", "Firebase", "Node.js"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    year: "2024",
  },
  {
    id: 3,
    title: "Khmer History Portfolio",
    category: "Creative Website",
    desc: "An immersive cultural portfolio blending traditional Khmer 'Digital Angkor' aesthetics with modern 3D web technologies.",
    tech: ["GSAP", "React", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2500&auto=format&fit=crop",
    year: "2025",
  },
  {
    id: 4,
    title: "Telegram Bot AI",
    category: "Automation",
    desc: "A bilingual chatbot integrated with OpenAI to assist users with automated customer support replies.",
    tech: ["Python", "Telegram API", "AI"],
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop",
    year: "2025",
  },
];

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // --- DESKTOP HORIZONTAL SCROLL LOGIC ---
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const sections = gsap.utils.toArray(".project-panel");
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + scrollContainerRef.current?.offsetWidth,
          },
        });
      });

      // --- MOBILE FADE IN LOGIC ---
      mm.add("(max-width: 1023px)", () => {
        gsap.from(".project-card-mobile", {
          y: 50,
          opacity: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="projects"
      ref={containerRef}
      className="bg-[#0a0a0a] text-white overflow-hidden relative"
    >
      {/* HEADER SECTION
          - w-[80%] mx-auto: Centers the container width on mobile
          - text-center: Centers the h2 text on mobile
          - justify-center: Centers the flex row (line + span) on mobile
          - lg:text-left / lg:justify-start: Resets to left align on Desktop
      */}
      <div className="w-[80%] mx-auto py-12 text-center lg:text-left lg:absolute lg:top-12 lg:left-12 lg:z-10 lg:w-auto lg:mx-0 lg:p-0">
        {/* Top Label with Line */}
        <div className="flex items-center justify-center lg:justify-start gap-4 mb-2">
          <div className="h-[1px] w-12 bg-amber-500"></div>
          <span className="text-amber-500 font-medium uppercase tracking-widest text-xs">
            Selected Works
          </span>
        </div>

        {/* Main Title */}
        <h2 className="text-3xl md:text-5xl font-medium tracking-tighter">
          Featured Projects
        </h2>
      </div>

      {/* --- DESKTOP VIEW (Horizontal Scroll) --- */}
      <div
        ref={scrollContainerRef}
        className="hidden lg:flex w-[400%] h-screen"
      >
        {PROJECTS.map((project, index) => (
          <div
            key={project.id}
            className="project-panel w-screen h-screen flex items-center justify-center p-24 relative flex-shrink-0 border-r border-white/5"
          >
            {/* Background Number */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-white/[0.02] pointer-events-none select-none font-display">
              0{index + 1}
            </span>

            <div className="w-full max-w-6xl grid grid-cols-2 gap-16 items-center">
              {/* Text Side */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-gray-400">
                    {project.year}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-6xl font-black leading-tight hover:text-amber-500 transition-colors duration-300 cursor-pointer">
                  {project.title}
                </h3>

                <p className="text-xl text-gray-400 max-w-md leading-relaxed">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-sm font-medium text-gray-300 bg-white/5 px-4 py-2 rounded-lg"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-6">
                  <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-wide hover:bg-amber-400 transition-all">
                    View Case <ArrowUpRight size={18} />
                  </button>
                  <button className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                    <Github size={20} />{" "}
                    <span className="underline underline-offset-4">
                      Source Code
                    </span>
                  </button>
                </div>
              </div>

              {/* Image Side */}
              <div className="relative group perspective-1000">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 transform transition-transform duration-700 group-hover:rotate-y-12 group-hover:scale-95">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MOBILE VIEW (Vertical Stack) --- */}
      <div className="lg:hidden flex flex-col gap-12 px-6 pb-24">
        {PROJECTS.map((project, index) => (
          <div key={project.id} className="project-card-mobile group relative">
            {/* Mobile Image */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden mb-6 border border-white/10 relative">
              <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-bold rounded-lg border border-white/10 z-10">
                0{index + 1}
              </span>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Mobile Content */}
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-amber-500 text-xs font-bold uppercase mb-1">
                    {project.category}
                  </p>
                  <h3 className="text-2xl font-black">{project.title}</h3>
                </div>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white active:bg-amber-500 active:text-black transition-colors"
                >
                  <ArrowUpRight size={20} />
                </a>
              </div>
              <p className="text-sm text-gray-400 line-clamp-2">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] uppercase font-bold text-gray-500 border border-white/5 px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
