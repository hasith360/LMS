'use client';
import { useState, useEffect } from 'react';

const images = [
  { src: '/images/hero-bg1.png', alt: 'World Landmarks' },
  { src: '/images/hero-bg2.png', alt: 'Travel Map and Accessories' },
  { src: '/images/hero-bg3.png', alt: 'European Cities' },
  { src: '/images/hero-bg4.jpg', alt: 'SriLankan Airlines' },
  { src: '/images/hero-bg5.png', alt: 'Global Monuments' },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500); // Change image every 3.5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      
      {images.map((img, index) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
}
