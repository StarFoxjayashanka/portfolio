/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { useRef, useEffect } from 'react';
import { ChevronDown, ExternalLink, Quote, Sparkles, Zap, Layers, Globe, Code2 } from 'lucide-react';
import Face3D from './components/Face3D';
import SkillsGrid from './components/SkillsGrid';
import Dock from './components/Dock';

const COMPANIES = [
  { name: "StarFox", role: "Design Agency", desc: "Crafting immersive visual narratives.", color: "#818cf8" },
  { name: "Wes", role: "Web Solutions", desc: "Scalable architectures for the modern web.", color: "#34d399" },
  { name: "BlueMoon", role: "Creative House", desc: "Where artistic chaos meets order.", color: "#fb7185" }
];

function FloatingPhrase({ text, initialPos }: { text: string, initialPos: { x: string, y: string } }) {
  return (
    <motion.div
      initial={{ x: initialPos.x, y: initialPos.y, opacity: 0 }}
      animate={{ 
        y: ["0%", "-20%"],
        opacity: [0, 0.4, 0] 
      }}
      transition={{ 
        duration: 15 + Math.random() * 10,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute pointer-events-none text-[8px] tracking-[1.5em] uppercase font-bold font-outline whitespace-nowrap z-0 select-none"
    >
      {text}
    </motion.div>
  );
}

function SectionReveal({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.85, 1, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.section 
      id={id}
      ref={ref}
      style={{ scale, opacity, rotateX, y, perspective: "1500px" }}
      className={`relative min-h-[140vh] flex items-center justify-center py-40 ${className}`}
    >
      {children}
    </motion.section>
  );
}

const EXPERIENCES = [
  { year: "2024", title: "Lead Architect", company: "StarFox" },
  { year: "2023", title: "Systems Dev", company: "Wes" },
  { year: "2022", title: "Visual Designer", company: "BlueMoon" }
];

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef
  });

  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -600]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  const contactScale = useTransform(scrollYProgress, [0.8, 1], [0.8, 1]);

  return (
    <div ref={containerRef} className="relative bg-bg text-ink scroll-smooth cursor-crosshair">
      <Dock />

      {/* Background Story Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <FloatingPhrase text="ANTIGRAVITY SYSTEMS" initialPos={{ x: "10%", y: "80%" }} />
        <FloatingPhrase text="LIQUID ARCHITECTURE" initialPos={{ x: "70%", y: "60%" }} />
        <FloatingPhrase text="DIGITAL DYNAMICS" initialPos={{ x: "30%", y: "40%" }} />
        <FloatingPhrase text="FLUID INTERFACES" initialPos={{ x: "80%", y: "20%" }} />
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-10"
        >
          <Face3D />
        </motion.div>

        <div className="relative z-20 flex flex-col items-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
             <span className="text-xl font-display font-light opacity-30 lowercase mb-4 tracking-widest">jayas</span>
             <h1 className="text-[26vw] font-display font-bold leading-none tracking-tighter mix-blend-difference drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]">
               Jayas
             </h1>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2 }}
          className="absolute scroll-indicator bottom-12 flex flex-col items-center gap-4"
        >
          <div className="w-px h-20 bg-gradient-to-b from-white/0 via-white to-white/0" />
          <span className="text-[10px] tracking-[0.8em] uppercase">Evolve</span>
        </motion.div>
      </section>

      {/* Skills Orbit Section */}
      <SectionReveal id="skills" className="flex-col">
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10">
            <h2 className="text-[30vw] font-display font-bold text-outline select-none">FLOW</h2>
        </div>
        <div className="relative z-10 w-full flex flex-col items-center glass p-8 md:p-24 rounded-[4rem] backdrop-blur-3xl mx-8 md:mx-24 max-w-[90vw]">
           <div className="text-center mb-12">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="inline-block p-4 rounded-full border border-white/10 mb-8"
              >
                <Code2 className="w-8 h-8 text-indigo-400" />
              </motion.div>
              <h3 className="text-lg tracking-[0.5em] font-light opacity-40 uppercase mb-4">Fluency</h3>
              <p className="text-5xl md:text-7xl font-display font-bold tracking-tighter max-w-2xl mx-auto">
                WHERE LOGIC TRANSFORMS INTO LIQUID.
              </p>
           </div>
           <SkillsGrid />
        </div>
      </SectionReveal>

      {/* Experience Stacking Section */}
      <SectionReveal className="flex-col px-8">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-24">
           <div>
             <h2 className="text-6xl font-display font-bold tracking-tighter mb-12">LEGACY.</h2>
             <div className="flex flex-col gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden glass">
                {EXPERIENCES.map((ex, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                    className="p-12 flex justify-between items-center group cursor-pointer"
                  >
                    <div className="flex flex-col gap-2">
                       <span className="text-xs font-mono opacity-40">{ex.year}</span>
                       <h3 className="text-2xl font-display font-bold tracking-tight">{ex.title}</h3>
                    </div>
                    <div className="text-right">
                       <span className="text-lg opacity-40 group-hover:opacity-100 transition-opacity">{ex.company}</span>
                    </div>
                  </motion.div>
                ))}
             </div>
           </div>
           <div className="flex flex-col justify-center gap-12">
              <div className="glass p-12 rounded-[2rem] relative overflow-hidden group">
                 <Zap className="absolute -right-8 -top-8 w-40 h-40 opacity-5 group-hover:rotate-12 transition-transform duration-1000" />
                 <h4 className="text-sm tracking-[0.5em] opacity-40 uppercase mb-6">Philosophy</h4>
                 <p className="text-2xl font-light leading-relaxed">
                   High-performance code is just the skeleton. Emotive interaction is the soul. I build systems that feel alive.
                 </p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                 <div className="glass p-8 rounded-2xl flex flex-col gap-4">
                    <Globe className="w-6 h-6 text-indigo-400" />
                    <span className="text-3xl font-display font-bold">50+</span>
                    <span className="text-[10px] opacity-40 tracking-widest uppercase">Global Clients</span>
                 </div>
                 <div className="glass p-8 rounded-2xl flex flex-col gap-4">
                    <Layers className="w-6 h-6 text-emerald-400" />
                    <span className="text-3xl font-display font-bold">100k+</span>
                    <span className="text-[10px] opacity-40 tracking-widest uppercase">Lines Written</span>
                 </div>
              </div>
           </div>
        </div>
      </SectionReveal>

      {/* Ventures Section */}
      <SectionReveal id="work" className="px-8 md:px-24">
        <div className="max-w-7xl w-full">
          <div className="flex justify-between items-end mb-24 border-b border-white/5 pb-12">
             <h2 className="text-7xl font-display font-bold tracking-tighter">VENTURES.</h2>
             <Sparkles className="w-8 h-8 opacity-20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COMPANIES.map((co, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -20, scale: 1.05 }}
                className="glass p-12 rounded-[3.5rem] group cursor-pointer relative"
              >
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity mx-12 mb-8" 
                  style={{ backgroundColor: co.color }}
                />
                <div className="flex justify-between items-start mb-24">
                  <span className="text-[10px] font-mono opacity-40 tracking-widest">_VENTURE_{i+1}</span>
                  <ExternalLink className="w-5 h-5 opacity-40" />
                </div>
                <div>
                  <h3 className="text-4xl font-display font-bold tracking-tighter mb-4">{co.name}</h3>
                  <p className="text-sm opacity-40 uppercase tracking-widest mb-6">{co.role}</p>
                  <p className="text-base font-light leading-relaxed opacity-60">
                    {co.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* Final Call – The Gravitational Core */}
      <footer id="contact" className="relative min-h-[150vh] flex flex-col justify-center items-center overflow-hidden px-8">
         <motion.div 
           style={{ scale: contactScale }}
           className="relative z-10 w-full max-w-7xl glass p-24 md:p-40 rounded-[5rem] flex flex-col items-center text-center gap-16 backdrop-blur-[100px]"
         >
            <div className="flex flex-col items-center">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute w-[80%] aspect-square bg-indigo-500/20 rounded-full blur-[150px] -z-10"
              />
              <h2 className="text-[10vw] font-display font-bold tracking-tighter leading-none mb-4 mix-blend-difference">SAY HELLO.</h2>
              <p className="text-2xl font-light opacity-60">Architecting the next digital era.</p>
            </div>

            <a 
              href="mailto:hello@jayas.studio"
              className="group relative px-20 py-10 glass rounded-full overflow-hidden hover:scale-110 active:scale-95 transition-all duration-500 shadow-[0_0_100px_rgba(255,255,255,0.05)]"
            >
               <motion.div 
                 className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]"
               />
               <span className="relative z-10 group-hover:text-black font-display font-bold text-3xl tracking-tighter transition-colors">INITIATE CONNECTION</span>
            </a>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-12 border-t border-white/5 w-full">
               {["GitHub", "Twitter", "LinkedIn", "Behance"].map((social) => (
                 <a key={social} href="#" className="text-[10px] tracking-[0.4em] uppercase font-bold opacity-30 hover:opacity-100 transition-all">
                    {social}
                 </a>
               ))}
            </div>
         </motion.div>
         
         <div className="absolute bottom-12 text-[8px] tracking-[1em] opacity-20 uppercase font-mono">
            Antigravity // 2026 // Jayas Studio
         </div>
      </footer>
    </div>
  );
}

