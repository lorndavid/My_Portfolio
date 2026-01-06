
import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

const App: React.FC = () => {
  return (
    <div className="bg-dark min-h-screen text-white selection:bg-primary selection:text-white relative">
      <Navbar />
      <main className="relative">
        <section id="home" className="relative ">
          <Hero />
        </section>
        {/* The relative z-index ensures other sections slide OVER the pinned hero */}
        <section id="about" className="relative z-4 bg-dark py-10 lg:py-10">
          <About />
        </section>
        <section id="skills" className="relative z-4 py-10 bg-dark">
          <Skills />
        </section>
        <section id="projects" className="relative z-4 py-10 bg-dark">
          <Projects />
        </section>
        <section id="contact" className="relative z-4 py-10 bg-[#0e0e0e]">
          <Contact />
        </section>
      </main>
      <footer className="relative z-10 py-10 text-center border-t border-white/5 text-gray-500 text-sm bg-dark">
        <p>&copy; {new Date().getFullYear()} Lorn David. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
