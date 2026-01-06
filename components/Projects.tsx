
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ExternalLink, Github, Layers } from 'lucide-react';

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.project-card', {
      scrollTrigger: {
        trigger: '.project-grid',
        start: 'top 80%',
      },
      y: 60,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power4.out'
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-4xl md:text-5xl font-display font-bold">Featured Projects</h2>
          <p className="text-gray-500 mt-4 max-w-xl">
            A selection of my recent works in software development and technical solutions.
          </p>
        </div>
        <div className="hidden md:block">
           <a href="#" className="flex items-center text-primary font-bold group">
             View All Projects 
             <ExternalLink size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
           </a>
        </div>
      </div>

      <div className="project-grid grid lg:grid-cols-12 gap-8">
        {/* Main Featured Project */}
        <div className="project-card lg:col-span-8 group relative bg-card rounded-3xl overflow-hidden border border-white/5">
          <div className="grid md:grid-cols-2 h-full">
            <div className="p-10 flex flex-col justify-center">
              <div className="flex items-center space-x-2 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                <Layers size={14} />
                <span>Major Project</span>
              </div>
              <h3 className="text-3xl font-display font-bold mb-4">Student Image Management System</h3>
              <p className="text-gray-400 mb-8">
                A robust, secure platform designed for educational institutions to organize and manage student identification and media assets efficiently.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['React', 'Firebase', 'Supabase'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 text-gray-300 text-xs rounded-full">{tag}</span>
                ))}
              </div>
              <div className="flex space-x-6 mt-auto">
                <a href="#" className="text-white hover:text-primary transition-colors flex items-center text-sm font-bold">
                  View Demo <ExternalLink size={16} className="ml-2" />
                </a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors flex items-center text-sm font-bold">
                  Source <Github size={16} className="ml-2" />
                </a>
              </div>
            </div>
            <div className="relative overflow-hidden h-64 md:h-full">
               <img 
                 src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200" 
                 alt="Student Management System" 
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          </div>
        </div>

        {/* Small Project 1 */}
        <div className="project-card lg:col-span-4 p-8 bg-card rounded-3xl border border-white/5 flex flex-col">
           <div className="h-48 rounded-2xl overflow-hidden mb-6">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bbbda5366391?auto=format&fit=crop&q=80&w=800" 
                alt="Network Dashboard" 
                className="w-full h-full object-cover"
              />
           </div>
           <h3 className="text-xl font-bold mb-2">Network Monitor Dashboard</h3>
           <p className="text-gray-500 text-sm mb-6">
             Custom internal tool for real-time hardware status monitoring and network health checks.
           </p>
           <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
             <span className="text-xs text-gray-400">IT Ops / Dashboard</span>
             <a href="#" className="text-primary hover:text-white transition-colors">
               <ExternalLink size={20} />
             </a>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
