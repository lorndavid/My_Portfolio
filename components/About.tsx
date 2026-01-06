
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Terminal, Database, Server, Monitor } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Entrance animations for text
    gsap.from('.about-text', {
      scrollTrigger: {
        trigger: '.about-text',
        start: 'top 85%',
      },
      x: -60,
      opacity: 0,
      duration: 1.5,
      ease: 'power4.out'
    });

    // PROMINENT DEEP PARALLAX: Image moves significantly within its clipping container
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        yPercent: 25, // Increased movement for more depth
        scale: 1.2,
        scrollTrigger: {
          trigger: '.about-image-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5, // Smoother scrub
        },
        ease: 'none',
      });
    }

    // Secondary Parallax for the floating badge - moving opposite to the image
    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        y: -150,
        scrollTrigger: {
          trigger: '.about-image-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }

    // Subtle parallax for the text content itself
    if (textContentRef.current) {
        gsap.to(textContentRef.current, {
            y: -50,
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            }
        });
    }

    // Features entrance
    gsap.from('.feature-card', {
      scrollTrigger: {
        trigger: '.feature-grid',
        start: 'top 90%',
      },
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="container mx-auto px-6 overflow-hidden pt-32 pb-20">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: Content */}
        <div ref={textContentRef} className="about-text order-2 lg:order-1">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full mb-6 border border-primary/20">
            <span className="text-primary font-bold text-[10px] uppercase tracking-widest">Introduction</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-8 leading-[1.1] text-white">
            Bridging Hardware <br />
            <span className="text-primary">& Software</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed mb-6 max-w-xl">
            I am a versatile developer bridging the gap between hardware and software. 
            With a background in IT Support (Network/Hardware), I now build high-performance web applications.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-xl">
            Currently, I'm focusing on creating elegant solutions for administrative challenges, 
            like my ongoing development of a <span className="text-white font-medium italic">Student Image Management System</span>.
          </p>

          <div className="feature-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="feature-card p-6 bg-card/50 border border-white/5 rounded-3xl group hover:border-primary/30 transition-all duration-500 hover:bg-card">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                <Monitor size={22} />
              </div>
              <h3 className="font-bold text-lg mb-1 text-white">IT Specialist</h3>
              <p className="text-sm text-gray-500">Expertise in Hardware & Networks</p>
            </div>
            <div className="feature-card p-6 bg-card/50 border border-white/5 rounded-3xl group hover:border-primary/30 transition-all duration-500 hover:bg-card">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                <Terminal size={22} />
              </div>
              <h3 className="font-bold text-lg mb-1 text-white">Full Stack</h3>
              <p className="text-sm text-gray-500">Modern Web Architectures</p>
            </div>
          </div>
        </div>

        {/* Right: Parallax Image */}
        <div className="about-image-container relative order-1 lg:order-2">
          {/* Main frame with clipping */}
          <div className="aspect-[4/5] sm:aspect-square rounded-[3rem] overflow-hidden relative shadow-2xl border border-white/10 group">
             <img 
               ref={imageRef}
               src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1200" 
               alt="Working Environment" 
               className="w-full h-[140%] object-cover absolute -top-[20%] left-0 will-change-transform grayscale group-hover:grayscale-0 transition-all duration-1000"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60"></div>
          </div>
          
          {/* Parallax Badge */}
          <div 
            ref={badgeRef}
            className="absolute -bottom-10 right-0 lg:-right-10 w-[70%] p-8 glass rounded-[2.5rem] border border-white/10 shadow-2xl transition-all duration-500 hover:scale-105 z-20"
          >
             <div className="flex items-center space-x-5">
                <div className="flex -space-x-4">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-12 h-12 rounded-full border-4 border-dark overflow-hidden ring-1 ring-white/10">
                        <img src={`https://picsum.photos/80/80?random=${i}`} alt="User" />
                     </div>
                   ))}
                </div>
                <div>
                   <p className="text-white font-black text-lg">Active Projects</p>
                   <p className="text-primary text-xs font-bold tracking-widest uppercase">10+ Custom Solutions</p>
                </div>
             </div>
          </div>

          {/* Abstract Decorations */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full -z-10 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default About;
