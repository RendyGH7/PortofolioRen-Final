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

  // For Hero section: smooth scroll-driven exit as user scrolls down
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.45, 0.85], [1, 0.75, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.85], [0, -45]);
  const heroScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.96]);
  const heroFilter = useTransform(
    scrollYProgress,
    [0, 0.45, 0.85],
    ['blur(0px)', 'blur(0px)', 'blur(8px)']
  );

  if (isHero) {
    return (
      <div ref={containerRef} id={id} className={`w-full ${className}`}>
        <motion.div
          animate={
            disabled
              ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
              : undefined
          }
          style={
            !disabled
              ? {
                  opacity: heroOpacity,
                  y: heroY,
                  scale: heroScale,
                  filter: heroFilter,
                  willChange: 'opacity, transform, filter',
                }
              : { willChange: 'auto' }
          }
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  // For all other sections (Bento, Projects, DevStudio, Timeline, Contact, Footer):
  // Smooth scroll-triggered fade in when entering viewport, and fade out when leaving
  return (
    <div ref={containerRef} id={id} className={`w-full ${className}`}>
      <motion.div
        initial={!disabled ? { opacity: 0, y: 42, filter: 'blur(8px)' } : false}
        whileInView={!disabled ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
        animate={
          disabled
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : undefined
        }
        viewport={
          !disabled
            ? {
                once: false,
                amount: 0.08,
                margin: '-40px 0px -40px 0px',
              }
            : undefined
        }
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        onViewportEnter={() => {
          if (isFooter && onReachInView) {
            onReachInView();
          }
        }}
        style={{
          willChange: !disabled ? 'opacity, transform, filter' : 'auto',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

