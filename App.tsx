import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger, useGSAP);

const App: React.FC = () => {
  return (
    // Main App Wrapper
    // bg-[#050505] matches the deepest black used in your components
    <div className="bg-[#050505] min-h-screen text-slate-200 selection:bg-amber-500 selection:text-black relative overflow-x-hidden scroll-smooth font-sans">
      {/* --- GLOBAL NOISE OVERLAY --- 
          This creates a consistent film grain texture across the entire website 
      */}
      <div
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <Navbar />

      <main className="relative flex flex-col">
        {/* HERO SECTION */}
        <section id="home" className="relative w-full z-0">
          <Hero />
        </section>

        {/* CONTENT SECTIONS 
            z-10 ensures these slide OVER any fixed background elements from Hero if needed 
        */}
        <div className="relative z-10 bg-[#050505]">
          <section id="about">
            <About />
          </section>

          <section id="skills">
            <Skills />
          </section>

          <section id="projects">
            <Projects />
          </section>

          <section id="contact">
            <Contact />
          </section>

          {/* FOOTER */}
          <footer className="relative py-12 text-center border-t border-white/5 bg-[#050505]">
            <div className="container mx-auto px-6 flex flex-col items-center justify-center gap-4">
              <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gray-500 font-black text-xs">
                LD
              </div>
              <p className="text-gray-600 text-xs tracking-widest uppercase">
                &copy; {new Date().getFullYear()} Lorn David.{" "}
                <span className="hidden sm:inline">
                  Built with React & GSAP.
                </span>
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;
