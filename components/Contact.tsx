import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Types
interface FormState {
  fullName: string;
  email: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Form State
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- Animations ---
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // 1. Text & Info Entrance
      gsap.from(".contact-info-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      // 2. Form Entrance (3D Flip Effect)
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        rotationX: 10,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  // --- Validation Logic ---
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email))
      newErrors.email = "Valid email required";
    if (!formData.message.trim() || formData.message.length < 10)
      newErrors.message = "Message too short";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ fullName: "", email: "", message: "" });

      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-20 lg:py-32 bg-[#050505] overflow-hidden flex justify-center items-center"
    >
      {/* --- 1. SHARED UNIFIED BACKGROUND --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-black"></div>

        {/* Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.03] z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] z-0"></div>
      </div>

      {/* --- MAIN CONTAINER (Restricted Width for "Medium" size) --- */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* --- LEFT: Contact Info --- */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="contact-info-anim inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">
                Available for hire
              </span>
            </div>

            <h2 className="contact-info-anim text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
              Let's build something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                extraordinary.
              </span>
            </h2>

            <p className="contact-info-anim text-base md:text-lg text-gray-400 mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Whether you have a groundbreaking idea or need to modernize your
              infrastructure, I'm ready to help.
            </p>

            {/* Info Cards */}
            <div className="space-y-4 w-full max-w-md mx-auto lg:mx-0">
              <a
                href="mailto:david.lorn@student.uc.edu.kh"
                className="contact-info-anim group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex-shrink-0 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Mail size={22} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                    Email Me
                  </p>
                  <p className="text-sm md:text-base font-medium text-white group-hover:text-blue-400 transition-colors break-all">
                    david.lorn@student.uc.edu.kh
                  </p>
                </div>
              </a>

              <div className="contact-info-anim group flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex-shrink-0 flex items-center justify-center text-purple-400">
                  <MapPin size={22} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                    Location
                  </p>
                  <p className="text-sm md:text-base font-medium text-white">
                    Phnom Penh, Cambodia
                  </p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="contact-info-anim flex gap-4 mt-10 justify-center lg:justify-start">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* --- RIGHT: Modern Form --- */}
          <div className="relative w-full max-w-lg mx-auto lg:mx-0">
            {/* Subtle Backlight */}
            <div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10 rounded-full opacity-40 transform scale-90"></div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Success Overlay */}
              {isSuccess && (
                <div className="absolute inset-0 bg-[#111]/95 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-300">
                  <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-4">
                    <Send size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-gray-400">
                    I'll get back to you within 24 hours.
                  </p>
                </div>
              )}

              <div className="space-y-5">
                {/* Name Input */}
                <div className="group">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-blue-400 transition-colors">
                    Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`w-full bg-white/5 border ${
                      errors.fullName ? "border-red-500" : "border-white/10"
                    } rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div className="group">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-purple-400 transition-colors">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="hello@example.com"
                    className={`w-full bg-white/5 border ${
                      errors.email ? "border-red-500" : "border-white/10"
                    } rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Message Input */}
                <div className="group">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-white transition-colors">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell me about your project..."
                    className={`w-full bg-white/5 border ${
                      errors.message ? "border-red-500" : "border-white/10"
                    } rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-300 resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl hover:bg-blue-500 hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message{" "}
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
