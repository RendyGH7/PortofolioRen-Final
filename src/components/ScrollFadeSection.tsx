import React from 'react';

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
}) => {
  return (
    <section id={id} className={`w-full ${className}`}>
      {children}
    </section>
  );
};
