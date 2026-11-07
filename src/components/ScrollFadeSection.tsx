import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollFadeSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  isHero?: boolean;
  isFooter?: boolean;
}

export const ScrollFadeSection: React.FC<ScrollFadeSectionProps> = ({
  children,
  id,
  className = '',
  isHero = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // For Hero section: smooth hardware-accelerated opacity fade when user scrolls down
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  if (isHero) {
    return (
      <div ref={containerRef} id={id} className={`w-full ${className}`}>
        <motion.div style={{ opacity: heroOpacity }}>
          {children}
        </motion.div>
      </div>
    );
  }

  // Non-Hero sections reveal ONCE with subtle GPU-accelerated fade, then stay fully visible
  return (
    <div ref={containerRef} id={id} className={`w-full ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{
          once: true,
          amount: 0.04,
        }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
