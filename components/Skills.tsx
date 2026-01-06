import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const SKILLS_ROW_1 = [
  { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Ruby on Rails", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-plain.svg" },
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
];

const SKILLS_ROW_2 = [
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-line.svg" },
  { name: "Canva", icon: "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg" },
  { name: "Packet Tracer", icon: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Cisco_logo.svg" },
  { name: "Networking", icon: "https://cdn-icons-png.flaticon.com/512/3233/3233010.png" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
];

/**
 * SkillCard Component
 * - Uses Glassmorphism (bg-white/5)
 * - Hover state: Glows with primary color
 */
const SkillCard: React.FC<{ skill: { name: string; icon: string } }> = ({ skill }) => {
  return (
    <div className="group relative flex-shrink-0 w-28 h-32 sm:w-40 sm:h-48 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:border-primary/50">
      
      {/* Hover Glow Effect Behind Card */}
      <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-2xl"></div>

      <div className="flex flex-col items-center justify-center h-full p-4">
        {/* Icon Container */}
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          <img 
            src={skill.icon} 
            alt={skill.name} 
            className="w-full h-full object-contain drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]" 
            loading="lazy"
          />
        </div>
        
        {/* Text */}
        <p className="text-gray-400 font-medium text-[10px] sm:text-xs uppercase tracking-widest group-hover:text-white transition-colors duration-300">
          {skill.name}
        </p>
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Header Entrance
      gsap.from('.skills-header-anim', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out'
      });

      // 2. Infinite Marquee Logic
      const createMarquee = (row: HTMLDivElement | null, duration: number, reverse: boolean = false) => {
        if (!row) return;
        
        const q = gsap.utils.selector(row);
        const cards = q('.group'); // Select all cards
        
        // Calculate total width based on card width + gap
        // Assuming gap is 24px (space-x-6) or 40px (space-x-10)
        // We use a simple percent translation for infinite loop
        
        const tl = gsap.to(row, {
          xPercent: reverse ? 50 : -50, // Move exactly half the duplicated list
          duration: duration,
          ease: "none",
          repeat: -1
        });

        // Interactive Pause
        row.addEventListener('mouseenter', () => gsap.to(tl, { timeScale: 0.2, duration: 0.5 }));
        row.addEventListener('mouseleave', () => gsap.to(tl, { timeScale: 1, duration: 0.5 }));
      };

      createMarquee(row1Ref.current, 40); // Normal direction
      createMarquee(row2Ref.current, 45, true); // Reverse direction

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative py-20 sm:py-32 bg-dark overflow-hidden w-full">
      
      {/* Background Tech Grid (Subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none"></div>

      {/* Header Section */}
      <div className="relative container mx-auto px-6 mb-16 sm:mb-24 text-center z-10">
        <h2 className="skills-header-anim text-sm font-bold tracking-[0.6em] text-primary uppercase mb-4">
          Capabilities
        </h2>
        <h3 className="skills-header-anim text-4xl sm:text-6xl font-display font-bold text-white mb-6">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Tech Stack</span>
        </h3>
        <p className="skills-header-anim text-gray-400 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
          A curated collection of technologies I use to build robust, scalable, and beautiful digital products.
        </p>
      </div>

      {/* Skills Marquee Container */}
      <div className="relative w-full space-y-8 sm:space-y-12">
        
        {/* Row 1 */}
        <div className="relative flex overflow-hidden">
          {/* Fader Left */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-dark to-transparent z-20 pointer-events-none"></div>
          
          {/* Marquee Track */}
          {/* Render list 3 times to ensure smooth infinite loop on large screens */}
          <div ref={row1Ref} className="flex space-x-4 sm:space-x-8 px-4 w-max">
            {[...SKILLS_ROW_1, ...SKILLS_ROW_1, ...SKILLS_ROW_1, ...SKILLS_ROW_1].map((skill, idx) => (
              <SkillCard key={`r1-${idx}`} skill={skill} />
            ))}
          </div>
          
          {/* Fader Right */}
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-dark to-transparent z-20 pointer-events-none"></div>
        </div>

        {/* Row 2 */}
        <div className="relative flex overflow-hidden">
           {/* Fader Left */}
           <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-dark to-transparent z-20 pointer-events-none"></div>
          
          {/* Marquee Track (Starts shifted for reverse effect) */}
          <div ref={row2Ref} className="flex space-x-4 sm:space-x-8 px-4 w-max" style={{ transform: 'translateX(-50%)' }}>
            {[...SKILLS_ROW_2, ...SKILLS_ROW_2, ...SKILLS_ROW_2, ...SKILLS_ROW_2].map((skill, idx) => (
              <SkillCard key={`r2-${idx}`} skill={skill} />
            ))}
          </div>
          
          {/* Fader Right */}
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-dark to-transparent z-20 pointer-events-none"></div>
        </div>

      </div>
      
      {/* Ambient Glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10"></div>
    </div>
  );
};

export default Skills;