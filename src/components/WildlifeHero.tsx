import React from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import Navbar from './Navbar';
import './styles/wildelifeBackground.css';

interface WildlifeHeroProps {
  onGetStarted: () => void;
  onSpeciesClick: () => void;
}

const WildlifeHero: React.FC<WildlifeHeroProps> = ({ onGetStarted, onSpeciesClick }) => {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <Navbar onHomeClick={onGetStarted} onSpeciesClick={onSpeciesClick} />

      {/* Hero Section */}
      <div className="wildlife-bg relative flex-grow flex flex-col items-center justify-center overflow-hidden">
        <div className="sky" />
        <div className="clouds">
          <div className="cloud cloud1" />
          <div className="cloud cloud2" />
          <div className="cloud cloud3" />
          <div className="cloud cloud4" />
        </div>
        <div className="mountains" />
        <div className="field">
          <div className="grass-texture" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center w-full px-6 max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white leading-tight">
            Explore the Future of <span className="text-green-600">Wildlife</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Dive into interactive maps, population models, and conservation insights to discover how our ecosystems may look by 2070.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
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

          {/* Feedback Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-medium text-white mb-6 flex items-center gap-3">
              <MessageCircle size={24} className="text-yellow-400" />
              Send Your Feedback
            </h3>

            <form
              action="https://formspree.io/f/movepkgr"
              method="POST"
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:border-yellow-400 transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:border-yellow-400 transition-colors"
              />
              <textarea
                name="message"
                rows={4}
                placeholder="Share your thoughts about wildlife or this project!"
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-blue-900 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                Send Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WildlifeHero;
