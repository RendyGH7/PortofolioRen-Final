import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollFadeSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  isHero?: boolean;
  isFooter?: boolean;
  disabled?: boolean;
  onReachInView?: () => void;
}

export const ScrollFadeSection: React.FC<ScrollFadeSectionProps> = ({
  children,
  id,
  className = '',
  isHero = false,
  isFooter = false,
  disabled = false,
  onReachInView,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // For Hero section: smooth hardware-accelerated opacity fade when user scrolls down away from top
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  if (isHero) {
    return (
      <div ref={containerRef} id={id} className={`w-full ${className}`}>
        <motion.div
          style={{
            opacity: disabled ? 1 : heroOpacity,
          }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  // For non-Hero sections (Bento, Projects, DevStudio, Timeline, Contact, Footer):
  // Clean, buttery-smooth GPU fade & subtle 16px rise that reveals ONCE upon entering viewport.
  // Once in view, it remains fully visible forever (no disappearance, no layout shift, no flicker).
  // When user reaches footer and scrolls back up, sections are already 100% visible with zero re-animation.
  return (
    <div ref={containerRef} id={id} className={`w-full ${className}`}>
      <motion.div
        initial={disabled ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{
          once: true,
          amount: 0.05,
          margin: '0px 0px -20px 0px',
        }}
        transition={{
          duration: 0.55,
          ease: [0.16, 1, 0.3, 1],
        }}
        onViewportEnter={() => {
          if (isFooter && onReachInView) {
            onReachInView();
          }
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
