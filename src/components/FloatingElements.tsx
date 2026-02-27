import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star, Sparkles } from 'lucide-react';

const FloatingElements = () => {
  const [elements, setElements] = useState<{ id: number; x: number; y: number; size: number; type: string; delay: number }[]>([]);

  useEffect(() => {
    const newElements = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 25 + 10,
      type: ['heart', 'star', 'circle', 'sparkle'][Math.floor(Math.random() * 4)],
      delay: Math.random() * 10,
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ opacity: 0, y: '110vh' }}
          animate={{
            opacity: [0, 0.8, 0],
            y: '-10vh',
            x: [`${el.x}vw`, `${el.x + (Math.random() - 0.5) * 20}vw`],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 15,
            repeat: Infinity,
            delay: el.delay,
            ease: 'easeInOut',
          }}
          className="absolute text-pink-400/60"
          style={{ left: `${el.x}vw`, width: el.size, height: el.size }}
        >
          {el.type === 'heart' && <Heart fill="currentColor" size={el.size} />}
          {el.type === 'star' && <Star fill="currentColor" size={el.size} />}
          {el.type === 'sparkle' && <Sparkles fill="currentColor" size={el.size} />}
          {el.type === 'circle' && <div className="rounded-full bg-pink-300 opacity-30" style={{ width: el.size, height: el.size }} />}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;
