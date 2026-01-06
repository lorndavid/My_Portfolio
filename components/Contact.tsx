
import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Mail, MapPin, Send, Github, Linkedin, Twitter, AlertCircle } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  const buttonPulseRef = useRef<gsap.core.Tween | null>(null);

  // Form State
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Staggered Entrance for Left Column items
    gsap.from('.contact-item', {
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 85%',
      },
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
    });

    // Enhanced Dynamic Entry for Form Fields
    gsap.from('.form-field', {
      scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 85%',
      },
      y: 50,
      scale: 0.9,
      rotationX: -15,
      opacity: 0,
      stagger: {
        amount: 0.6,
        from: "start"
      },
      duration: 1.2,
      ease: 'back.out(1.4)',
      clearProps: "transform"
    });
  }, { scope: containerRef });

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleButtonEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonPulseRef.current) buttonPulseRef.current.kill();
    if (isSubmitting) return;

    buttonPulseRef.current = gsap.to(e.currentTarget, {
      scale: 1.025,
      boxShadow: '0 0 25px rgba(59, 130, 246, 0.4)',
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonPulseRef.current) {
      buttonPulseRef.current.kill();
    }
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: '0 0 0px rgba(59, 130, 246, 0)',
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleSocialEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.2,
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      duration: 0.4,
      ease: 'back.out(2)'
    });
  };

  const handleSocialLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: '#ffffff',
      duration: 0.3,
      ease: 'power2.in'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      alert('Thank you, Lorn David has received your message!');
      setIsSubmitting(false);
      setFormData({ fullName: '', email: '', message: '' });
      setErrors({});
    }, 1500);
  };

  return (
    <div ref={containerRef} className="container mx-auto px-6 contact-section py-20">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
        {/* Left Column: Contact Info */}
        <div className="flex flex-col justify-center">
          <div className="contact-item inline-block px-4 py-1.5 bg-primary/10 rounded-full mb-6">
            <span className="text-primary font-bold text-xs uppercase tracking-widest">Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 contact-item leading-tight text-white">
            Let's Shape The <br /><span className="text-primary">Next Project.</span>
          </h2>
          <p className="text-gray-400 text-lg mb-12 contact-item max-w-lg">
            Whether you need a full-stack developer or an IT infrastructure specialist, I'm here to help turn your vision into reality.
          </p>

          <div className="space-y-10 mb-12">
            <div className="flex items-center space-x-6 contact-item group">
              <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Email Me</p>
                <a href="mailto:david.lorn@student.uc.edu.kh" className="text-lg font-medium hover:text-primary transition-colors text-white">
                  david.lorn@student.uc.edu.kh
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-6 contact-item group">
              <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Based In</p>
                <p className="text-lg font-medium text-white">Phnom Penh, Cambodia</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 contact-item">
            {[Github, Linkedin, Twitter].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center rounded-full text-white transition-colors"
                onMouseEnter={handleSocialEnter}
                onMouseLeave={handleSocialLeave}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="contact-form perspective-1000">
          <form onSubmit={handleSubmit} className="bg-card/50 backdrop-blur-sm p-8 sm:p-12 rounded-[2.5rem] border border-white/10 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full"></div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="form-field space-y-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`w-full bg-white/5 border ${errors.fullName ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:ring-primary/40'} rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:border-primary transition-all placeholder:text-gray-600 shadow-inner`}
                  />
                  {errors.fullName && (
                    <div className="flex items-center mt-2 text-red-500 text-[10px] font-bold uppercase tracking-wider animate-in fade-in slide-in-from-top-1">
                      <AlertCircle size={12} className="mr-1" /> {errors.fullName}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-field space-y-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-widest ml-1">Email</label>
                <div className="relative">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:ring-primary/40'} rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:border-primary transition-all placeholder:text-gray-600 shadow-inner`}
                  />
                  {errors.email && (
                    <div className="flex items-center mt-2 text-red-500 text-[10px] font-bold uppercase tracking-wider animate-in fade-in slide-in-from-top-1">
                      <AlertCircle size={12} className="mr-1" /> {errors.email}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="form-field space-y-2">
              <label className="text-xs text-gray-400 font-bold uppercase tracking-widest ml-1">Your Message</label>
              <div className="relative">
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4} 
                  placeholder="Tell me about your project..."
                  className={`w-full bg-white/5 border ${errors.message ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:ring-primary/40'} rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:border-primary transition-all resize-none placeholder:text-gray-600 shadow-inner`}
                />
                {errors.message && (
                  <div className="flex items-center mt-2 text-red-500 text-[10px] font-bold uppercase tracking-wider animate-in fade-in slide-in-from-top-1">
                    <AlertCircle size={12} className="mr-1" /> {errors.message}
                  </div>
                )}
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`form-field w-full py-5 ${isSubmitting ? 'bg-gray-700 cursor-not-allowed' : 'bg-primary'} text-white font-black text-lg rounded-2xl hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center uppercase tracking-widest shadow-lg shadow-primary/20 mt-4`}
              onMouseEnter={handleButtonEnter}
              onMouseLeave={handleButtonLeave}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'} 
              {!isSubmitting && <Send size={20} className="ml-3" />}
            </button>
            
            <p className="form-field text-center text-xs text-gray-500 font-medium">
              I'll typically respond within 24 hours.
            </p>
          </form>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-from-top-1 {
          from { transform: translateY(-4px); }
          to { transform: translateY(0); }
        }
        .animate-in {
          animation: fade-in 0.3s ease-out, slide-in-from-top-1 0.3s ease-out;
        }
      `}} />
    </div>
  );
};

export default Contact;
