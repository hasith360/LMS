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
    <div className="relative w-full aspect-[4/3] sm:aspect-[3/4] md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
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
      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-gold w-6' 
                : 'bg-white/60 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
