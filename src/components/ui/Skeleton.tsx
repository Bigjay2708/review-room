'use client';

import { useEffect, useState } from 'react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

const Skeleton = ({ className = '', width, height }: SkeletonProps) => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Add a small delay before starting the animation for a smoother effect
    const timeout = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  const style = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
    height: height ? (typeof height === 'number' ? `${height}px` : height) : '100%',
  };

  return (
    <div 
      className={`bg-gray-200 rounded-md overflow-hidden relative ${animate ? 'animate-pulse' : ''} ${className}`}
      style={style}
    >
      {animate && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-shine"></div>
      )}
    </div>
  );
};

export default Skeleton;
