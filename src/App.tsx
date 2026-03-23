import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-500/10 blur-[120px] rounded-full" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 mb-12 text-center"
      >
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 leading-none">
          Neon <span className="text-cyan-400 neon-text-cyan">Snake</span>
        </h1>
        <div className="flex items-center justify-center gap-4 mt-2">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-fuchsia-500" />
          <p className="text-[10px] uppercase tracking-[0.5em] text-fuchsia-400 font-mono neon-text-magenta">Arcade Experience</p>
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-fuchsia-500" />
        </div>
      </motion.header>

      <main className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-7xl">
        {/* Left Side - Info/Stats or just spacing */}
        <div className="hidden xl:flex flex-col gap-8 w-64">
          <div className="p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
            <h4 className="text-[10px] uppercase tracking-widest text-white/40 mb-4 font-mono">Controls</h4>
            <ul className="space-y-3 text-xs font-mono text-white/60">
              <li className="flex justify-between"><span>UP</span> <span className="text-cyan-400">↑</span></li>
              <li className="flex justify-between"><span>DOWN</span> <span className="text-cyan-400">↓</span></li>
              <li className="flex justify-between"><span>LEFT</span> <span className="text-cyan-400">←</span></li>
              <li className="flex justify-between"><span>RIGHT</span> <span className="text-cyan-400">→</span></li>
              <li className="flex justify-between"><span>PAUSE</span> <span className="text-fuchsia-400">SPACE</span></li>
            </ul>
          </div>
          
          <div className="p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
            <h4 className="text-[10px] uppercase tracking-widest text-white/40 mb-4 font-mono">System Status</h4>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse shadow-[0_0_8px_#a3e635]" />
              <span className="text-[10px] text-lime-400 uppercase tracking-widest">Online</span>
            </div>
          </div>
        </div>

        {/* Center - Snake Game */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <SnakeGame />
        </motion.div>

        {/* Right Side - Music Player */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-8"
        >
          <MusicPlayer />
          
          <div className="p-6 border border-cyan-500/20 rounded-3xl bg-cyan-500/5 backdrop-blur-sm neon-border-cyan">
            <h4 className="text-[10px] uppercase tracking-widest text-cyan-400 mb-2 font-mono">Now Playing</h4>
            <p className="text-xs text-white/70 italic">"The rhythm of the machine is the heartbeat of the future."</p>
          </div>
        </motion.div>
      </main>

      <footer className="mt-16 relative z-10 text-[10px] uppercase tracking-[0.3em] text-white/20 font-mono">
        &copy; 2026 Neon Arcade Systems // v1.0.4
      </footer>
    </div>
  );
}
