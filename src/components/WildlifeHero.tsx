import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, TreePine, Map, Activity, BarChart3, Clock } from 'lucide-react';
import './styles/wildelifeBackground.css';
import Navbar from './Navbar';

interface WildlifeHeroProps {
  onGetStarted: () => void;
}

const WildlifeHero: React.FC<WildlifeHeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar
        onHomeClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
            <Button
              size="lg"
              className="px-8 py-4 text-lg shadow-lg hover:scale-105 transition"
              onClick={onGetStarted}
            >
              <Play className="mr-2" size={20} />
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg border-2 hover:bg-green-50 dark:hover:bg-gray-800"
            >
              <TreePine className="mr-2" size={20} />
              Learn More
            </Button>
          </div>

          {/* Features List */}
          <div id="features" className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: <Map size={22} />, text: "Interactive Maps" },
              { icon: <Activity size={22} />, text: "Population Models" },
              { icon: <BarChart3 size={22} />, text: "Impact Insights" },
              { icon: <Clock size={22} />, text: "2070 Scenarios" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 shadow-md rounded-2xl hover:scale-105 transition"
              >
                <div className="mb-2 text-green-600 dark:text-green-400">{feature.icon}</div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
};

export default WildlifeHero;
