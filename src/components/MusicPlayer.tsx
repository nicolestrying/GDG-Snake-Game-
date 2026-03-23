import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';

const TRACKS = [
  {
    id: 1,
    title: "Cyberpunk Pulse",
    artist: "AI Genesis",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "cyan"
  },
  {
    id: 2,
    title: "Neon Night",
    artist: "Synth Mind",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "magenta"
  },
  {
    id: 3,
    title: "Synthwave Dreams",
    artist: "Digital Soul",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "lime"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.log("Playback blocked", e));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-black/40 backdrop-blur-xl border border-fuchsia-500/30 rounded-3xl neon-border-magenta flex flex-col gap-6">
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />
      
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 flex items-center justify-center shadow-lg relative overflow-hidden group">
          <Music className="w-8 h-8 text-white relative z-10" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          {isPlaying && (
            <motion.div 
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180, 270, 360] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-0 border-2 border-white/30 rounded-2xl"
            />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white truncate neon-text-magenta">{currentTrack.title}</h3>
          <p className="text-sm text-white/50 truncate uppercase tracking-widest font-mono">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 shadow-[0_0_10px_rgba(217,70,239,0.5)]"
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", bounce: 0, duration: 0.2 }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-white/30 font-mono uppercase tracking-tighter">
          <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : "0:00"}</span>
          <span>{audioRef.current ? formatTime(audioRef.current.duration) : "0:00"}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-8">
        <button onClick={prevTrack} className="text-white/60 hover:text-white transition-colors active:scale-90">
          <SkipBack className="w-6 h-6 fill-current" />
        </button>
        
        <button 
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
        </button>

        <button onClick={nextTrack} className="text-white/60 hover:text-white transition-colors active:scale-90">
          <SkipForward className="w-6 h-6 fill-current" />
        </button>
      </div>

      <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full">
        <Volume2 className="w-4 h-4 text-white/40" />
        <div className="h-1 flex-1 bg-white/10 rounded-full">
          <div className="h-full w-2/3 bg-white/40 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
