/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight, Github, Twitter, Linkedin, Mail, ExternalLink, ChevronDown } from 'lucide-react';
import Face3D from './components/Face3D';

const PROJECTS = [
  {
    title: "NEO-DYNAMICS",
    category: "INTERACTIVE DESIGN",
    year: "2024",
    link: "#",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "AETHER SYSTEM",
    category: "GENERATIVE ART",
    year: "2023",
    link: "#",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "QUANTUM INTERFACE",
    category: "UX RESEARCH",
    year: "2023",
    link: "#",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
  }
];

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* 3D Background - Hero */}
      <section className="relative h-screen w-full flex flex-col justify-between p-8 md:p-12 overflow-hidden bg-bg">
        <Face3D />

        {/* Top Nav */}
        <nav className="relative z-20 flex justify-between items-start">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col"
          >
            <span className="font-display text-xl font-bold tracking-tighter">AURA.</span>
            <span className="text-[10px] tracking-[0.3em] font-medium opacity-50 uppercase">Portfolio 2026</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-8 text-[12px] font-medium tracking-widest uppercase opacity-80"
          >
            <a href="#work" className="hover:opacity-50 transition-opacity">Work</a>
            <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
            <a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a>
          </motion.div>
        </nav>

        {/* Hero Text */}
        <div className="relative z-20 pointer-events-none">
          <div className="flex flex-col -space-y-4 md:-space-y-12">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[18vw] md:text-[14vw] font-display font-bold leading-none tracking-tighter pointer-events-none"
            >
              CRAFTING
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex items-center justify-end"
            >
              <h1 className="text-[18vw] md:text-[14vw] font-display font-bold leading-none tracking-tighter text-outline pointer-events-none">
                DIGITAL
              </h1>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-[18vw] md:text-[14vw] font-display font-bold leading-none tracking-tighter pointer-events-none"
            >
              AVATARS
            </motion.h1>
          </div>
        </div>

        {/* Hero Footer */}
        <div className="relative z-20 flex justify-between items-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1 }}
            className="max-w-[280px]"
          >
            <p className="text-sm font-light leading-relaxed">
              Merging advanced geometry with emotive interaction to build the next generation of digital identity.
            </p>
          </motion.div>

          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
            className="hidden md:flex flex-col items-center gap-4"
          >
            <div className="w-px h-24 bg-gradient-to-b from-white/0 to-white/50" />
            <ChevronDown className="w-4 h-4 opacity-50 animate-bounce" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex gap-4"
          >
            <Github className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
            <Twitter className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
            <Linkedin className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
          </motion.div>
        </div>
      </section>

      {/* Selected Work */}
      <section id="work" className="bg-bg py-32 px-8 md:px-24">
        <div className="flex flex-col gap-24 max-w-7xl mx-auto">
          <div className="flex justify-between items-end border-b border-white/10 pb-8">
            <h2 className="text-6xl font-display font-bold tracking-tighter">SELECTED WORK</h2>
            <span className="text-muted text-sm font-medium uppercase tracking-widest">(03)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {PROJECTS.map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-white/5 mb-6">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-display font-bold tracking-tight">{project.title}</h3>
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
                  </div>
                  <div className="flex justify-between text-[11px] font-medium uppercase tracking-[0.2em] opacity-40">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Philosophy */}
      <section id="about" className="bg-white text-black py-40 px-8 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-7xl font-display font-bold tracking-tighter mb-12 leading-[0.9]"
            >
              I BELIEVE IN <br/> THE SYNERGY OF <br/> FORM & FUNCTION.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl font-light leading-relaxed max-w-lg mb-8"
            >
              Independent digital craftsman focusing on interactive experiences that challenge the status quo. By blending creative coding with human-centered design, I build interfaces that don't just work—they resonate.
            </motion.p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 bg-black text-white font-display font-bold tracking-wide rounded-full"
            >
              READ FULL STORY
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
          <div className="relative">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-2xl"
            >
               <img 
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover"
                alt="Workspace"
              />
            </motion.div>
            <div className="absolute -bottom-8 -left-8 bg-black text-white p-8 w-48 h-48 flex flex-col justify-end">
               <span className="text-4xl font-display font-bold leading-none mb-2">12+</span>
               <span className="text-[10px] font-medium tracking-widest uppercase opacity-60">Global Awards won since 2021</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-bg pt-40 pb-12 px-8 md:px-24 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-24 relative">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="text-[12vw] font-display font-bold tracking-tighter text-outline hover:text-white transition-colors duration-500 cursor-default mb-8">
              SAY HELLO
            </h2>
            <p className="text-lg font-light opacity-60 mb-12">Available for select projects from August 2026</p>
            <a 
              href="mailto:hello@aura.studio" 
              className="text-4xl md:text-6xl font-display font-light underline decoration-1 underline-offset-8 decoration-white/20 hover:decoration-white transition-all"
            >
              hello@aura.studio
            </a>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5 opacity-40 text-[10px] tracking-[0.3em] font-medium uppercase">
            <span>© 2026 AURA STUDIO LTD.</span>
            <div className="flex gap-12">
              <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
