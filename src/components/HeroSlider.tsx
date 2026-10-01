'use client';
import { useState, useEffect } from 'react';

const images = [
  { src: '/images/passports.jpg', alt: 'Travel Passports' },
  { src: '/images/hostess.jpg', alt: 'Cabin Crew' },
  { src: '/images/airplane.jpg', alt: 'Airplane' },
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
