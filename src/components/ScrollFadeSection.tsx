import React, { useRef, useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  if (isHero) {
    if (isMobile) {
      return (
        <div ref={containerRef} id={id} className={`w-full ${className}`}>
          {children}
        </div>
      );
    }
    return (
      <div ref={containerRef} id={id} className={`w-full ${className}`}>
        <motion.div style={{ opacity: heroOpacity }}>
          {children}
        </motion.div>
      </div>
    );
  }

  // On mobile: Native DOM rendering with 0% scroll listener overhead
  if (isMobile) {
    return (
      <div ref={containerRef} id={id} className={`w-full ${className}`}>
        {children}
      </div>
    );
  }

  // On desktop: Smooth hardware-accelerated one-shot entrance
  return (
    <div ref={containerRef} id={id} className={`w-full ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{
          once: true,
          margin: '80px 0px -20px 0px',
        }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
