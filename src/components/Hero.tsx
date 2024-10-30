import React, { useEffect, useRef } from 'react';
import { Palmtree, Umbrella, Sunrise, Fish } from 'lucide-react';

type HeroProps = {
  onUserTypeChange: (type: 'user' | 'business') => void;
};

export function Hero({ onUserTypeChange }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const waves: Wave[] = [];
    const numWaves = 3;

    class Wave {
      x: number;
      y: number;
      wavelength: number;
      amplitude: number;
      speed: number;
      color: string;
      phase: number;

      constructor(wavelength: number, amplitude: number, speed: number, color: string) {
        this.x = 0;
        this.y = canvas.height * 0.5;
        this.wavelength = wavelength;
        this.amplitude = amplitude;
        this.speed = speed;
        this.color = color;
        this.phase = 0;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x < canvas.width; x++) {
          const y = this.y + Math.sin(x * this.wavelength + this.phase) * this.amplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }

      update() {
        this.phase += this.speed;
      }
    }

    waves.push(
      new Wave(0.02, 20, 0.02, 'rgba(59, 130, 246, 0.4)'),
      new Wave(0.03, 15, 0.03, 'rgba(59, 130, 246, 0.3)'),
      new Wave(0.04, 10, 0.04, 'rgba(59, 130, 246, 0.2)')
    );

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      waves.forEach(wave => {
        wave.update();
        wave.draw(ctx);
      });
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = (type: 'user' | 'business') => {
    onUserTypeChange(type);
    const formElement = document.getElementById('signup-section');
    formElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      <div className="absolute inset-0 overflow-hidden">
        {[Palmtree, Umbrella, Sunrise, Fish].map((Icon, index) => (
          <div
            key={index}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            <Icon 
              className="w-8 h-8 text-white/20" 
              style={{ transform: `rotate(${Math.random() * 360}deg)` }}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 h-full flex items-center justify-center text-white px-4">
        <div className="max-w-4xl text-center">
          <div className="mb-4 text-blue-200 font-semibold animate-fade-in">
            DISCOVER DIANI LIKE A LOCAL
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            Your AI-Powered Guide to
            <span className="bg-gradient-to-r from-blue-200 to-blue-100 bg-clip-text text-transparent block mt-2">
              Paradise on Earth
            </span>
            <span className="text-2xl md:text-3xl block mt-4 text-blue-200">
              Experience Diani Beach Like Never Before
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in-delay max-w-3xl mx-auto">
            Join our community of smart travelers and local businesses using AI to unlock 
            the best of Diani Beach - from hidden gems to exclusive deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
            <button
              onClick={() => handleClick('user')}
              className="group relative px-8 py-4 bg-white text-blue-900 rounded-lg text-lg font-semibold transition-all hover:scale-105 hover:bg-blue-50 overflow-hidden"
            >
              <span className="relative z-10">Get Early Access (Free)</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
            <button
              onClick={() => handleClick('business')}
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg text-lg font-semibold transition-all hover:scale-105 hover:bg-white/20"
            >
              <span className="relative z-10">List Your Business</span>
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          </div>
          <p className="mt-6 text-sm text-blue-200 animate-fade-in-delay-2">
            🎉 Launch Special: First 100 businesses list for free
          </p>
        </div>
      </div>
    </section>
  );
}