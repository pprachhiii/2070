import React from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import './styles/wildelifeBackground.css';
import Navbar from './Navbar';

interface WildlifeHeroProps {
  onGetStarted: () => void;
  onSpeciesClick: () => void;
}

const WildlifeHero: React.FC<WildlifeHeroProps> = ({ onGetStarted, onSpeciesClick }) => {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <Navbar
        onHomeClick={onGetStarted}
        onSpeciesClick={onSpeciesClick} 
      />

      {/* Hero Section */}
      <div className="wildlife-bg relative flex-grow flex items-center justify-center overflow-hidden">
        {/* Scenic Background */}
        <div className="sky" />
        <div className="clouds">
          <div className="cloud cloud1"></div>
          <div className="cloud cloud2"></div>
          <div className="cloud cloud3"></div>
          <div className="cloud cloud4"></div>
        </div>
        <div className="mountains" />
        <div className="field">
          <div className="grass-texture" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center w-full px-6 max-w-5xl">
          <div className="mb-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white leading-tight">
              Explore the Future of <span className="text-green-600">Wildlife</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Dive into interactive maps, population models, and conservation insights 
              to discover how our ecosystems may look by 2070.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button
              size="lg"
              className="px-8 py-4 text-lg shadow-lg bg-green-600 text-black hover:bg-green-600 hover:scale-105 focus:outline-none transition"
              onClick={onGetStarted}
            >
              <Play className="mr-2" size={20} />
              Get Started
            </Button>

            <a
              href="https://wildlife.org/1700-wildlife-species-at-risk-for-extinction-by-2070/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg border-2 text-black hover:bg-green-50 dark:hover:bg-gray-800 w-full sm:w-auto"
              >
                Learn More
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WildlifeHero;
