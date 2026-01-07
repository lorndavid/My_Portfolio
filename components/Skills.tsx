import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// --- Configuration ---
// FIXED: Removed Markdown syntax from icon URLs
const SKILLS_ROW_1 = [
  {
    name: "Express.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "Laravel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "Rails",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-plain-wordmark.svg",
  },
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
];

const SKILLS_ROW_2 = [
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  {
    name: "Photoshop",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-line.svg",
  },
  {
    name: "Canva",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg",
  },
  {
    name: "Networking",
    icon: "https://cdn-icons-png.flaticon.com/512/3233/3233010.png",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Tailwind",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
];

const SkillCard: React.FC<{ skill: { name: string; icon: string } }> = ({
  skill,
}) => (
  <div className="group relative flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 bg-white/5 border border-white/5 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:bg-white/10 hover:scale-105 cursor-pointer">
    {/* Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 blur-xl" />

    {/* Icon */}
    <div className="relative w-12 h-12 sm:w-14 sm:h-14 z-10 p-2">
      <img
        src={skill.icon}
        alt={skill.name}
        className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
      />
    </div>

    {/* Label */}
    <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider group-hover:text-white transition-colors z-10">
      {skill.name}
    </span>
  </div>
);

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // 1. Entrance Animation (Fade In Up)
      gsap.from(".skills-title-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // 2. Marquee Animation Helper
      const createMarquee = (
        element: HTMLDivElement | null,
        speed: number,
        reverse: boolean
      ) => {
        if (!element) return;

        // Clone logic is handled in render by mapping the array 3 times
        const tl = gsap.to(element, {
          xPercent: reverse ? 50 : -50,
          ease: "none",
          duration: speed,
          repeat: -1,
        });

        // Hover Pause Effect
        element.addEventListener("mouseenter", () =>
          gsap.to(tl, { timeScale: 0.5, duration: 0.5 })
        );
        element.addEventListener("mouseleave", () =>
          gsap.to(tl, { timeScale: 1, duration: 0.5 })
        );
      };

      createMarquee(row1Ref.current, 30, false);
      createMarquee(row2Ref.current, 35, true);
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative py-24 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 mb-16 relative z-10 text-center">
        <h2 className="skills-title-anim text-sm font-bold text-amber-500 tracking-[0.3em] uppercase mb-4">
          My Stack
        </h2>
        <h3 className="skills-title-anim text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
          Software & <span className="text-gray-600">Tools</span>
        </h3>
        <p className="skills-title-anim text-gray-400 max-w-lg mx-auto">
          The languages, frameworks, and tools I use to bring digital products
          to life.
        </p>
      </div>

      {/* Marquee Wrapper with Edge Fades */}
      <div className="relative w-full overflow-hidden space-y-8">
        {/* Left/Right Fade Masks (Crucial for Clean Look) */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20 pointer-events-none" />

        {/* Row 1 */}
        <div ref={row1Ref} className="flex gap-6 w-max">
          {[...SKILLS_ROW_1, ...SKILLS_ROW_1, ...SKILLS_ROW_1].map(
            (skill, i) => (
              <SkillCard key={`r1-${i}`} skill={skill} />
            )
          )}
        </div>

        {/* Row 2 */}
        <div
          ref={row2Ref}
          className="flex gap-6 w-max"
          style={{ transform: "translateX(-50%)" }}
        >
          {[...SKILLS_ROW_2, ...SKILLS_ROW_2, ...SKILLS_ROW_2].map(
            (skill, i) => (
              <SkillCard key={`r2-${i}`} skill={skill} />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
