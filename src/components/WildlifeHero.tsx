import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, TreePine } from 'lucide-react';
import heroImage from '../assets/hero-wildlife.jpg';

interface WildlifeHeroProps {
  onGetStarted: () => void;
}

const WildlifeHero: React.FC<WildlifeHeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={heroImage}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div
              key={i}
              className="border border-primary/10 animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: '3s',
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center w-full px-6 max-w-full">
        <div className="mb-8">
          <h1 className="text-3xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
            India 2070
            <br />
            <span className="text-4xl md:text-4xl">Wildlife Dashboard</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-full mx-auto">
            Experience the future of Indian wildlife through interactive simulations,
            real-time population modeling, and conservation impact visualization
          </p>
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-full mx-auto">
          <div className="glass-card p-6 hover:scale-105 transition-all duration-300">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10+</div>
            <div className="text-sm text-muted-foreground">Indian States</div>
          </div>
          <div className="glass-card p-6 hover:scale-105 transition-all duration-300">
            <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">6</div>
            <div className="text-sm text-muted-foreground">Iconic Species</div>
          </div>
          <div className="glass-card p-6 hover:scale-105 transition-all duration-300">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">2070</div>
            <div className="text-sm text-muted-foreground">Future Projection</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 w-full">
          <Button
            size="lg"
            className="btn-hero px-8 py-4 text-lg"
            onClick={onGetStarted}
          >
            <Play className="mr-2" size={20} />
            Explore Wildlife Future
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="px-8 py-4 text-lg border-2 border-primary/50 hover:bg-primary/10"
          >
            <TreePine className="mr-2" size={20} />
            Conservation Actions
          </Button>
        </div>

        {/* Features List - Centered */}
        <div className="flex justify-center w-full mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl">
            {[
              'Interactive Wildlife Maps',
              'Population Simulations',
              'Conservation Impact',
              '2070 Predictions',
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-2 p-3 bg-card/20 rounded-lg backdrop-blur-sm animate-float"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-float" />
      <div
        className="absolute top-40 right-32 w-12 h-12 bg-secondary/20 rounded-lg blur-lg animate-float"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="absolute bottom-32 left-16 w-20 h-20 bg-accent/20 rounded-2xl blur-2xl animate-float"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute bottom-20 right-20 w-8 h-8 bg-primary/30 rounded-full blur-sm animate-float"
        style={{ animationDelay: '0.5s' }}
      />
    </div>
  );
};

export default WildlifeHero;
