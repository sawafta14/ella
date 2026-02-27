import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Music, Music2, Heart } from 'lucide-react';
import Cake from './components/Cake';
import FloatingElements from './components/FloatingElements';

export default function App() {
  const [isWished, setIsWished] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleMakeAWish = useCallback(() => {
    setIsWished(true);
    
    // Confetti burst
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 80 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#ff69b4', '#ffb6c1', '#ffffff'] });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#ff69b4', '#ffb6c1', '#ffffff'] });
    }, 200);

    // Sparkle explosion at center
    confetti({
      particleCount: 250,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ffb6c1', '#ffffff', '#ffd700', '#ff1493']
    });

    setTimeout(() => setShowMessage(true), 1000);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      <FloatingElements />

      {/* Background Glow Pulse */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="fixed inset-0 bg-pink-200/20 pointer-events-none z-0"
      />

      {/* Background Music Hint (Visual Only as per guidelines) */}
      <div className="fixed top-4 right-4 z-50">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="bg-white/50 backdrop-blur-sm p-3 rounded-full cursor-pointer border border-pink-200 shadow-sm flex items-center gap-2"
        >
          <Music className="text-pink-400" size={20} />
          <span className="text-xs font-medium text-pink-500">Cute B-Day Beats</span>
        </motion.div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="z-10 text-center mb-12"
      >
        <div className="relative inline-block">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <h1 className="text-5xl md:text-7xl font-bubble text-[#ff69b4] glow-pink drop-shadow-lg">
              ✨ Happy Birthday Ella ✨
            </h1>
          </motion.div>
          
          {/* Sparkles around text */}
          <motion.div
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-6 -left-6 text-yellow-400"
          >
            <Sparkles size={32} />
          </motion.div>
          <motion.div
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, delay: 1 }}
            className="absolute -bottom-6 -right-6 text-yellow-400"
          >
            <Sparkles size={32} />
          </motion.div>
        </div>
      </motion.div>

      {/* Main Cake Area */}
      <div className="relative z-10 flex flex-col items-center">
        <Cake isWished={isWished} />

        {/* Wish Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 4, type: 'spring' }}
          className="mt-16"
        >
          {!isWished ? (
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(255, 105, 180, 0.4)' }}
              whileTap={{ scale: 0.9 }}
              onClick={handleMakeAWish}
              className="px-8 py-4 bg-gradient-to-r from-[#ff69b4] to-[#ffb6c1] text-white font-bubble text-2xl rounded-full shadow-lg border-4 border-white flex items-center gap-3 group"
            >
              Make a Wish <Heart className="group-hover:fill-white transition-colors" />
            </motion.button>
          ) : (
            <AnimatePresence>
              {showMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <p className="text-2xl font-bubble text-pink-500 animate-bounce">
                    May all your dreams come true! 💖
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed bottom-0 left-0 w-full flex justify-between px-8 pointer-events-none">
        <motion.div
          initial={{ x: -100, rotate: -20 }}
          animate={{ x: 0, rotate: 0 }}
          transition={{ delay: 4.5, type: 'spring' }}
          className="text-6xl"
        >
          🎈
        </motion.div>
        <motion.div
          initial={{ x: 100, rotate: 20 }}
          animate={{ x: 0, rotate: 0 }}
          transition={{ delay: 4.5, type: 'spring' }}
          className="text-6xl"
        >
          🎈
        </motion.div>
      </div>

      {/* Ribbon Banners */}
      <div className="fixed top-0 left-0 w-full pointer-events-none">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 5, duration: 1 }}
          className="flex justify-center gap-4"
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-12 h-24 bg-pink-200 rounded-b-full shadow-sm border-x border-b border-pink-300 flex items-end justify-center pb-2">
              <div className="w-2 h-2 bg-white rounded-full opacity-50" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
