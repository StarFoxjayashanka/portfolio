import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as si from 'simple-icons';

const LANGUAGES = [
  { slug: 'python' }, { slug: 'javascript' }, { slug: 'typescript' },
  { slug: 'rust' }, { slug: 'go' }, { slug: 'react' },
  { slug: 'nodedotjs' }, { slug: 'nextdotjs' }, { slug: 'tailwindcss' },
  { slug: 'docker' }, { slug: 'kubernetes' }, { slug: 'graphql' },
  { slug: 'postgresql' }, { slug: 'redis' }, { slug: 'mongodb' },
  { slug: 'unity' }, { slug: 'tensorflow' }, { slug: 'pytorch' },
  { slug: 'pnpm' }, { slug: 'vite' }, { slug: 'framer' },
  { slug: 'threejs' }, { slug: 'd3' }, { slug: 'amazonwebservices' },
  { slug: 'googlecloud' }, { slug: 'firebase' }, { slug: 'supabase' },
  { slug: 'trpc' }, { slug: 'prisma' }, { slug: 'redis' },
  { slug: 'linux' }, { slug: 'git' }, { slug: 'visualstudiocode' },
  { slug: 'elastic' }, { slug: 'nginx' }, { slug: 'terraform' },
  { slug: 'ansible' }, { slug: 'prometheus' }, { slug: 'grafana' },
  { slug: 'flutter' }, { slug: 'android' }, { slug: 'apple' },
  { slug: 'swift' }, { slug: 'kotlin' }, { slug: 'php' },
  { slug: 'laravel' }, { slug: 'django' }, { slug: 'flask' },
  { slug: 'rubyonrails' }, { slug: 'rust' }, { slug: 'cplusplus' },
  { slug: 'csharp' }, { slug: 'java' }, { slug: 'spring' },
  { slug: 'mysql' }, { slug: 'mariadb' }, { slug: 'sqlite' },
  { slug: 'jenkins' }, { slug: 'githubactions' }, { slug: 'gitlab' },
  { slug: 'circleci' }, { slug: 'bitbucket' }, { slug: 'jira' },
  { slug: 'confluence' }, { slug: 'notion' }, { slug: 'figma' },
  { slug: 'adobephotoshop' }, { slug: 'adobeillustrator' }, { slug: 'pnpm' },
  { slug: 'postman' }, { slug: 'insomnia' }, { slug: 'jest' },
  { slug: 'cypress' }, { slug: 'playwright' }, { slug: 'storybook' },
  { slug: 'npm' }, { slug: 'yarn' }, { slug: 'webpack' },
  { slug: 'babel' }, { slug: 'eslint' }, { slug: 'prettier' },
  { slug: 'mongodb' }, { slug: 'postgresql' }, { slug: 'redis' },
  { slug: 'mysql' }, { slug: 'sqlite' }, { slug: 'prisma' }
];

const BUBBLE_SIZE = 100;
const SPACING = 12;

function Bubble({ lang, x, y, mouseX, mouseY }: { lang: typeof LANGUAGES[0], x: number, y: number, mouseX: any, mouseY: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const icon = useMemo(() => {
    const iconKey = `si${lang.slug.charAt(0).toUpperCase() + lang.slug.slice(1).replace(/[^a-zA-Z0-9]/g, '')}`;
    return (si as any)[iconKey] || si.siJavascript;
  }, [lang.slug]);

  const distance = useMotionValue(3000);
  const displacementX = useMotionValue(0);
  const displacementY = useMotionValue(0);
  
  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.parentElement?.getBoundingClientRect();
      if (!rect) return;
      
      const bX = x + rect.left + BUBBLE_SIZE / 2;
      const bY = y + rect.top + BUBBLE_SIZE / 2;
      
      const dx = mouseX.get() - bX;
      const dy = mouseY.get() - bY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      distance.set(dist);

      const maxDist = 500;
      if (dist < maxDist) {
        // Sharper cubic power for more dramatic fisheye push
        const power = Math.pow(1 - dist / maxDist, 3);
        displacementX.set(-dx * power * 0.5);
        displacementY.set(-dy * power * 0.5);
      } else {
        displacementX.set(0);
        displacementY.set(0);
      }
    };

    const unsubX = mouseX.on('change', update);
    return () => unsubX();
  }, [mouseX, x, y, distance, displacementX, displacementY]);

  const scale = useTransform(distance, [0, 80, 500], [2.4, 1, 0.6]);
  const opacity = useTransform(distance, [0, 450, 700], [1, 0.8, 0.15]);
  const zIndex = useTransform(distance, [0, 100, 500], [250, 50, 1]);
  
  const springScale = useSpring(scale, { damping: 30, stiffness: 250 });
  const springOpacity = useSpring(opacity, { damping: 30, stiffness: 200 });
  const springX = useSpring(displacementX, { damping: 35, stiffness: 180 });
  const springY = useSpring(displacementY, { damping: 35, stiffness: 180 });

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        left: x,
        top: y,
        x: springX,
        y: springY,
        scale: springScale,
        opacity: springOpacity,
        zIndex,
        width: BUBBLE_SIZE,
        height: BUBBLE_SIZE,
      }}
      className="absolute flex items-center justify-center rounded-full glass group cursor-none bg-white/[0.03] backdrop-blur-xl border border-white/5 shadow-3xl transition-all duration-700 hover:border-white/40"
    >
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          delay: Math.random() * 5,
          ease: "easeInOut"
        }}
        className="w-1/2 h-1/2 flex items-center justify-center grayscale group-hover:grayscale-0 transition-opacity duration-700 pointer-events-none opacity-40 group-hover:opacity-100"
        dangerouslySetInnerHTML={{ 
          __html: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-full h-full"><path d="${icon.path}"/></svg>` 
        }}
      />
      
      <motion.div 
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? -18 : 0,
          scale: isHovered ? 1 : 0.8
        }}
        className="absolute -top-14 px-5 py-2 bg-white text-black text-[10px] font-bold tracking-[0.5em] uppercase rounded-full shadow-[0_25px_60px_rgba(0,0,0,0.6)] pointer-events-none z-[160] whitespace-nowrap border border-white/20"
      >
        {icon.title}
      </motion.div>

      {/* Surface caustic effect */}
      <div className="absolute inset-x-2 top-2 h-1/4 bg-white/10 blur-[2px] rounded-full rotate-[-30deg] pointer-events-none group-hover:opacity-100 opacity-40 transition-opacity duration-700" />
    </motion.div>
  );
}

export default function SkillsGrid() {
  const mouseX = useMotionValue(-10000);
  const mouseY = useMotionValue(-10000);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleMouseLeave = () => {
    mouseX.set(-10000);
    mouseY.set(-10000);
  };

  const bubbles = useMemo(() => {
    const cols = 18; // Even wider grid to fill section
    const items: any[] = [];
    
    LANGUAGES.forEach((lang, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      
      const xOffset = row % 2 !== 0 ? (BUBBLE_SIZE + SPACING) / 2 : 0;
      const x = col * (BUBBLE_SIZE + SPACING) + xOffset;
      const y = row * (BUBBLE_SIZE + SPACING) * 0.866;
      
      items.push({ lang, x, y });
    });
    
    return items;
  }, []);

  const gridWidth = 18 * (BUBBLE_SIZE + SPACING);
  const gridHeight = Math.ceil(LANGUAGES.length / 18) * (BUBBLE_SIZE + SPACING) * 0.866;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full min-h-[120vh] relative flex items-center justify-center bg-black overflow-hidden py-60"
    >
      <div 
        className="relative scale-95 md:scale-110 lg:scale-[1.2]"
        style={{
          width: gridWidth,
          height: gridHeight,
        }}
      >
        {bubbles.map((item, i) => (
          <Bubble 
            key={i} 
            lang={item.lang} 
            x={item.x - gridWidth / 2}
            y={item.y - gridHeight / 2}
            mouseX={mouseX} 
            mouseY={mouseY} 
          />
        ))}
      </div>

      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <motion.div 
           animate={{ 
             scale: [1, 1.2, 1],
             opacity: [0.1, 0.3, 0.1]
           }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160vw] h-[160vh] bg-gradient-radial from-violet-600/30 via-sky-500/5 to-transparent blur-[120px]" 
        />
      </div>

      <motion.div
        style={{ 
          x: mouseX, 
          y: mouseY, 
          translateX: '-50%', 
          translateY: '-50%' 
        }}
        className="fixed top-0 left-0 w-44 h-44 rounded-full border border-white/20 pointer-events-none z-[300] backdrop-blur-[2px] bg-white/[0.01] shadow-[0_0_120px_rgba(255,255,255,0.05)] ring-1 ring-white/5"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
      </motion.div>
    </div>
  );
}
