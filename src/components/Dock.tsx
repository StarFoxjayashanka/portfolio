import { motion } from 'motion/react';
import { Home, Briefcase, User, Mail, Sparkles, Code } from 'lucide-react';

const NAV_ITEMS = [
  { icon: Home, label: "Hero", href: "#hero" },
  { icon: Briefcase, label: "Work", href: "#work" },
  { icon: Code, label: "Skills", href: "#skills" },
  { icon: User, label: "About", href: "#about" },
  { icon: Mail, label: "Connect", href: "#contact" }
];

export default function Dock() {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20 }}
        className="flex items-center gap-2 p-2 glass-dark rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        {NAV_ITEMS.map((item, i) => (
          <motion.a
            key={i}
            href={item.href}
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className="group relative p-3 md:p-4 rounded-full transition-colors hover:bg-white/10"
          >
            <item.icon className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-3 py-1 glass rounded-md text-[10px] tracking-widest uppercase font-bold opacity-0 group-hover:opacity-100 pointer-events-none transition-all">
              {item.label}
            </span>
          </motion.a>
        ))}
        <div className="w-px h-6 bg-white/10 mx-2" />
        <motion.div 
          whileHover={{ rotate: 180 }}
          className="p-3 md:p-4 cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-indigo-400" />
        </motion.div>
      </motion.nav>
    </div>
  );
}
