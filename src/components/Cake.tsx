import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface CakeProps {
  isWished: boolean;
}

const Cake: React.FC<CakeProps> = ({ isWished }) => {
  const layerColors = ['#ffb6c1', '#ffc0cb', '#ffd1dc'];
  
  return (
    <div className="relative flex flex-col-reverse items-center justify-start h-[400px] w-[300px]">
      {/* Shadow */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-[-10px] w-[200px] h-[20px] bg-pink-900 rounded-[100%] blur-md z-0"
      />

      {/* Layer 1 - Bottom */}
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 100, delay: 0.2 }}
        className="relative w-[240px] h-[100px] bg-[#ffb6c1] rounded-t-3xl border-b-8 border-pink-300 z-10"
      >
        <div className="absolute top-0 w-full h-6 bg-white/40 rounded-t-3xl" />
        {/* Kawaii Face */}
        <div className="absolute inset-0 flex items-center justify-center gap-10 pt-6">
          <motion.div 
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ repeat: Infinity, duration: 3, times: [0, 0.1, 0.2] }}
            className="w-3 h-3 bg-pink-800 rounded-full" 
          />
          <motion.div 
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ repeat: Infinity, duration: 3, times: [0, 0.1, 0.2] }}
            className="w-3 h-3 bg-pink-800 rounded-full" 
          />
        </div>
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-6 h-3 border-b-2 border-pink-800 rounded-full" />
        {/* Blushes */}
        <div className="absolute top-[55%] left-[25%] w-4 h-2 bg-pink-400/40 rounded-full blur-[2px]" />
        <div className="absolute top-[55%] right-[25%] w-4 h-2 bg-pink-400/40 rounded-full blur-[2px]" />
      </motion.div>

      {/* Layer 2 - Middle */}
      <motion.div
        initial={{ y: -300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.6, duration: 1, delay: 0.8 }}
        className="relative w-[180px] h-[80px] bg-[#ffc0cb] rounded-t-2xl border-b-8 border-pink-300 z-20 -mb-4"
      >
        {/* Cream Spread */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute top-0 w-full h-6 bg-white/60 rounded-t-2xl origin-center" 
        />
        {/* Drip Animation */}
        <div className="absolute -bottom-4 left-0 w-full flex justify-around">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: [0, 20, 15] }}
              transition={{ delay: 1.8 + i * 0.1, duration: 0.5 }}
              className="w-5 bg-[#6f4e37] rounded-b-full opacity-90 shadow-sm"
            />
          ))}
        </div>
      </motion.div>

      {/* Layer 3 - Top */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', delay: 2.2 }}
        className="relative w-[120px] h-[70px] bg-[#ffd1dc] rounded-t-xl border-b-8 border-pink-300 z-30 -mb-4"
      >
        <div className="absolute top-0 w-full h-6 bg-white/40 rounded-t-xl" />
        
        {/* Sparkles for this layer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.8, 1.5, 0.8] }}
          transition={{ delay: 2.4, duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center text-yellow-300 pointer-events-none"
        >
          <Sparkles size={40} />
        </motion.div>
        
        {/* Decorations */}
        <AnimatePresence>
          {[
            { left: '10%', top: '-15px', icon: '🍓' },
            { left: '45%', top: '-20px', icon: '🍒' },
            { left: '80%', top: '-15px', icon: '🍓' }
          ].map((dec, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 2.8 + i * 0.2, type: 'spring' }}
              className="absolute text-3xl cursor-pointer hover:scale-150 transition-transform drop-shadow-sm"
              style={{ left: dec.left, top: dec.top }}
            >
              {dec.icon}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Candles - Positioned relative to the top layer */}
      <div className="absolute top-[100px] z-40 flex gap-6">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5 + i * 0.2 }}
            className="flex flex-col items-center"
          >
            {/* Flame */}
            <motion.div
              animate={{
                scale: isWished ? [1, 1.8, 1.4] : [1, 1.2, 1],
                opacity: isWished ? [0.8, 1, 0.9] : [0.7, 1, 0.7],
                y: [0, -3, 0],
                filter: isWished 
                  ? ['blur(2px) brightness(1.5)', 'blur(3px) brightness(2)', 'blur(2px) brightness(1.5)'] 
                  : ['blur(2px)', 'blur(3px)', 'blur(2px)']
              }}
              transition={{ repeat: Infinity, duration: 0.4 + i * 0.1 }}
              className={`w-4 h-6 rounded-full ${isWished ? 'bg-yellow-200 shadow-[0_0_25px_rgba(255,255,0,1)]' : 'bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.6)]'}`}
            />
            {/* Candle Body */}
            <div className="w-3 h-12 bg-gradient-to-b from-pink-100 to-pink-200 border-x border-pink-300 rounded-t-sm" />
          </motion.div>
        ))}
      </div>
      {/* Idle Animation Wrapper */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
};

export default Cake;
