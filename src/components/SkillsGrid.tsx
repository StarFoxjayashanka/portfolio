import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef, useEffect, useMemo } from 'react';
import * as si from 'simple-icons';

const ICON_SLUGS = [
  'python', 'javascript', 'typescript', 'rust', 'go', 
  'cplusplus', 'swift', 'kotlin', 'java', 'ruby',
  'php', 'sqlite', 'graphql', 'react', 'vuedotjs',
  'nodedotjs', 'docker', 'kubernetes', 'amazonaws', 'googlecloud',
  'postgresql', 'redis', 'mongodb', 'unity', 'tensorflow',
  'pytorch', 'nextdotjs', 'vite', 'tailwind-css', 'svelte'
];

function SkillBubble({ slug, mouseX, mouseY, index }: { slug: string, mouseX: any, mouseY: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const icon = useMemo(() => (si as any)[`si${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/[^a-zA-Z0-9]/g, '')}`] || si.siJavascript, [slug]);

  const distanceX = useTransform(mouseX, (val: number) => {
    if (!ref.current) return 0;
    const rect = ref.current.getBoundingClientRect();
    return val - (rect.left + rect.width / 2);
  });

  const distanceY = useTransform(mouseY, (val: number) => {
    if (!ref.current) return 0;
    const rect = ref.current.getBoundingClientRect();
    return val - (rect.top + rect.height / 2);
  });

  const distanceOrigin = useTransform([distanceX, distanceY], ([x, y]: any) => {
    return Math.sqrt(x * x + y * y);
  });

  // Smooth out the distance
  const distance = useSpring(distanceOrigin, { damping: 20, stiffness: 200 });

  // Fish-eye scale effect
  const scale = useTransform(distance, [0, 200, 600], [2.2, 1, 0.5]);
  const opacity = useTransform(distance, [0, 500, 800], [1, 0.6, 0.2]);
  
  // Interaction based rotation
  const rotateX = useTransform(distanceY, [-300, 300], [15, -15]);
  const rotateY = useTransform(distanceX, [-300, 300], [-15, 15]);

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.02, type: "spring" }}
      style={{ scale, opacity, rotateX, rotateY, perspective: "500px" }}
      className="w-24 h-24 md:w-32 md:h-32 rounded-full glass flex items-center justify-center p-6 cursor-pointer hover:border-white transition-colors group relative"
      whileHover={{ scale: 2.5, zIndex: 50, transition: { duration: 0.2 } }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Liquid-like distortion effect using CSS */}
      <div className="absolute inset-2 rounded-full border border-white/5 animate-pulse" style={{ animationDelay: `${index * 0.1}s` }} />
      
      <div 
        className="w-full h-full relative z-10 flex flex-col items-center justify-center gap-2"
        dangerouslySetInnerHTML={{ 
          __html: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-10 h-10 opacity-70 group-hover:opacity-100 transition-all"><path d="${icon.path}"/></svg>` 
        }}
      />
      
      <motion.span 
        className="absolute -bottom-8 text-[8px] tracking-[0.4em] uppercase font-bold opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap bg-white text-black px-2 py-1 rounded"
      >
        {icon.title}
      </motion.span>
    </motion.div>
  );
}

export default function SkillsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen py-60 flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background radial gradient that follows mouse */}
      <motion.div 
        style={{ 
          background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.05), transparent 80%)` 
        }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="flex flex-wrap justify-center content-center gap-2 md:gap-4 max-w-7xl mx-auto px-4">
        {ICON_SLUGS.map((slug, i) => (
          <SkillBubble key={slug} slug={slug} mouseX={mouseX} mouseY={mouseY} index={i} />
        ))}
      </div>
    </div>
  );
}
