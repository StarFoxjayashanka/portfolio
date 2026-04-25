/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { ChevronDown, ExternalLink, Quote, Sparkles, Zap, Layers, Globe, Code2, Flame, ArrowRight } from 'lucide-react';
import Face3D from './components/Face3D';
import SkillsGrid from './components/SkillsGrid';
import Dock from './components/Dock';

const COMPANIES = [
  { 
    name: "StarFox", 
    role: "Web Development", 
    desc: "Orange-tinted minimalism. Precision in every pixel.", 
    color: "#ff8c00",
    theme: "orange",
    icon: Sparkles,
    bg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800"
  },
  { 
    name: "Wes", 
    role: "Coding Systems", 
    desc: "Srilankan Yakkha energy. Fire and Performance.", 
    color: "#ef4444",
    theme: "red",
    icon: Flame,
    bg: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800"
  },
  { 
    name: "BlueMoon", 
    role: "Design Studio", 
    desc: "Cool, calm, and bluish. The depth of design.", 
    color: "#3178C6",
    theme: "blue",
    icon: Layers,
    bg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800"
  }
];

function Marquee({ text, speed = 15, direction = "left", className = "" }: { text: string, speed?: number, direction?: "left"|"right", className?: string }) {
  return (
    <div className={`flex overflow-hidden select-none ${className}`}>
      <motion.div 
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-24 py-12"
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-[15vw] font-display font-extrabold tracking-tighter uppercase font-outline opacity-10 leading-none">
            {text} • 
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function HorizontalScroll() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6%"]);
  
  // Dynamic scale for the whole track
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-transparent">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x, scale }} className="flex gap-4 px-12 md:px-24">
          {COMPANIES.map((co, i) => (
            <div key={co.name} className="w-screen h-[80vh] flex-shrink-0 flex items-center justify-center">
               <VentureCard co={co} i={i} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function VentureCard({ co, i }: { co: typeof COMPANIES[0], i: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    let lastY = window.scrollY;
    const update = () => {
      const currentY = window.scrollY;
      const vel = currentY - lastY;
      setVelocity(vel);
      lastY = currentY;
      requestAnimationFrame(update);
    };
    const anim = requestAnimationFrame(update);
    return () => cancelAnimationFrame(anim);
  }, []);

  const skewX = useSpring(velocity * 0.05, { damping: 20, stiffness: 100 });
  const scale = useSpring(isHovered ? 1.05 : 1, { damping: 15, stiffness: 100 });
  
  return (
    <motion.div 
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        skewX,
        scale,
        backgroundColor: isHovered ? `${co.color}15` : 'rgba(255,255,255,0.02)',
        borderColor: isHovered ? co.color : 'rgba(255,255,255,0.05)'
      }}
      className="relative w-[85vw] md:w-[70vw] h-full glass rounded-[5rem] group cursor-pointer overflow-hidden transition-all duration-700 shadow-3xl"
    >
      <div className="absolute inset-0 z-0">
         <img src={co.bg} className={`w-full h-full object-cover grayscale transition-all duration-1000 ${isHovered ? 'scale-110 grayscale-0 opacity-40' : 'opacity-10'}`} />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {isHovered && co.name === "Wes" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <Flame className="w-[50vw] h-[50vw] text-red-500 opacity-20 rotate-[-15deg]" />
        </motion.div>
      )}

      {isHovered && co.name === "StarFox" && (
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-0 right-0 w-full h-full border-r-[30vw] border-orange-500/10 skew-x-[-30deg] translate-x-1/2" />
        </div>
      )}

      <div className="relative z-10 p-12 md:p-24 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start">
          <span className="text-xs font-mono opacity-40 tracking-[1em] uppercase">ENTITY_0{i+1}</span>
          <co.icon className={`w-16 h-16 transition-all duration-700 ${isHovered ? 'scale-125' : 'opacity-20'}`} style={{ color: isHovered ? co.color : 'white' }} />
        </div>
        
        <div>
          <h3 className="text-7xl md:text-[8vw] font-display font-bold tracking-tighter mb-8 group-hover:tracking-widest transition-all duration-1000 ease-in-out">{co.name}</h3>
          <div className="flex flex-wrap gap-8 items-center mb-12">
            <span className="text-sm opacity-40 uppercase tracking-[0.5em]">{co.role}</span>
            <div className="w-20 h-px bg-white/20" />
            <p className="text-2xl md:text-3xl font-light opacity-60 max-w-2xl">
              {co.desc}
            </p>
          </div>

          <motion.div 
            animate={{ x: isHovered ? 20 : 0, opacity: isHovered ? 1 : 0.4 }}
            className="flex items-center gap-6"
          >
            <div className="p-8 rounded-full border border-white/20 group-hover:bg-white transition-colors">
              <ArrowRight className="w-8 h-8 group-hover:text-black transition-colors" />
            </div>
            <span className="text-lg font-bold tracking-[0.5em] uppercase">Enter Collision</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function FloatingPhrase({ text, initialPos }: { text: string, initialPos: { x: string, y: string } }) {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 3000], [0, (Math.random() - 0.5) * 500]);
  
  return (
    <motion.div
      initial={{ x: initialPos.x, opacity: 0 }}
      animate={{ 
        y: ["0%", "-30%"],
        opacity: [0, 0.4, 0] 
      }}
      transition={{ 
        duration: 12 + Math.random() * 15,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{ y: yParallax }}
      className="absolute pointer-events-none text-[7px] tracking-[2em] uppercase font-bold font-outline whitespace-nowrap z-0 select-none"
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

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [-1200, 0, -1200]);

  return (
    <motion.section 
      id={id}
      ref={ref}
      style={{ scale, opacity, z, transformStyle: "preserve-3d" }}
      className={`relative min-h-screen flex items-center justify-center py-40 ${className}`}
    >
      {children}
    </motion.section>
  );
}

const TESTIMONIALS = [
  { text: "THEY TURNED OUR TECHNICAL DEBT INTO A LIQUID ART PIECE.", author: "STARFOX LABS" },
  { text: "RAREST COMBINATION OF YAKKHA STRENGTH AND SWISS PRECISION.", author: "WES ARCHITECTS" },
  { text: "JAYAS DOES NOT JUST WRITE CODE; THEY ARCHITECT EXPERIENCES.", author: "BLUEMOON" },
  { text: "FLUID DYNAMICS APPLIED TO USER INTERFACE. MINDBLOWING.", author: "QUANTUM TECH" }
];

function Testimonials() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={targetRef} className="py-40 bg-white/2 overflow-hidden border-y border-white/5">
      <motion.div style={{ x: x1 }} className="flex whitespace-nowrap gap-24 mb-12">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="flex flex-col gap-4">
            <span className="text-[8vw] font-display font-extrabold tracking-tighter opacity-20">{t.text}</span>
            <span className="text-xl tracking-[0.5em] font-mono opacity-40">— {t.author}</span>
          </div>
        ))}
      </motion.div>
      <motion.div style={{ x: x2 }} className="flex whitespace-nowrap gap-24">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="flex flex-col gap-4">
            <span className="text-[8vw] font-display font-extrabold tracking-tighter opacity-20">{t.text}</span>
            <span className="text-xl tracking-[0.5em] font-mono opacity-40">— {t.author}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

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
        <FloatingPhrase text="STARFOX // DEVELOP" initialPos={{ x: "5%", y: "70%" }} />
        <FloatingPhrase text="WES // ARCHITECTURE" initialPos={{ x: "85%", y: "40%" }} />
        <FloatingPhrase text="BLUEMOON // DESIGN" initialPos={{ x: "25%", y: "20%" }} />
        <FloatingPhrase text="YAKKHA ENERGY" initialPos={{ x: "60%", y: "90%" }} />
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
      <section id="skills" className="relative h-screen flex flex-col items-center justify-center">
        <div className="absolute top-20 text-center z-10 pointer-events-none">
          <h2 className="text-sm tracking-[0.8em] font-medium opacity-40 uppercase mb-8">Fluency Spectrum</h2>
          <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter px-8">
            LIQUID INTELLIGENCE
          </h3>
        </div>
        <div className="w-full h-full">
          <SkillsGrid />
        </div>
      </section>

      <Marquee text="TRUSTED BY DISRUPTORS • BUILT FOR INNOVATORS • SCALED FOR GIANTS" speed={40} className="bg-white/2 py-24 mb-40" />
      <Testimonials />

      {/* Ventures Section */}
      <section id="work" className="py-20 flex flex-col gap-24">
        <div className="px-8 md:px-24">
           <h2 className="text-9xl font-display font-bold tracking-tighter border-b border-white/5 pb-12">ENTITIES</h2>
        </div>
        <HorizontalScroll />
      </section>

      <Marquee text="INNOVATE • DISRUPT • EVOLVE • COLLIDE" speed={30} className="bg-white/5 py-20" />

      {/* Creative Ethos - Perspective Reveal */}
      <SectionReveal className="px-8 overflow-hidden">
        <div className="max-w-7xl w-full glass p-24 md:p-40 rounded-[6rem] relative">
          <div className="absolute top-12 right-12 opacity-5 text-[20vw] font-bold font-display pointer-events-none select-none">
            EYE
          </div>
          <div className="relative z-10 flex flex-col gap-12">
            <h2 className="text-7xl md:text-9xl font-display font-bold tracking-tighter leading-[0.8]">
              THE CODE<br/>IS LIQUID.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-end">
              <p className="text-2xl font-light leading-relaxed max-w-xl opacity-60">
                 From the Yakkha-inspired raw power of StarFox to the tranquil depths of BlueMoon, my work exists in the tension between technical rigidity and organic grace.
              </p>
              <div className="flex flex-col gap-6 items-end">
                 {["Creative Direction", "Systems Design", "Visual Dynamics"].map((s, i) => (
                   <span key={i} className="text-xs tracking-[0.5em] uppercase font-bold border-r-4 border-white pr-8 py-2 hover:translate-x-4 transition-transform cursor-pointer">
                     {s}
                   </span>
                 ))}
              </div>
            </div>
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

