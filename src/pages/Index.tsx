import React, { useState } from 'react';
import WildlifeHero from '../components/WildlifeHero';
import Dashboard from '../components/Dashboard';
import SpeciesList from '../components/SpeciesList';
import SpeciesProfile from '../components/SpeciesProfile';
import { Button } from '@/components/ui/button';
import { Home, BarChart3, Users } from 'lucide-react';
import speciesData from '../data/speciesData.json';

type ViewMode = 'hero' | 'dashboard' | 'species' | 'profile';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('hero');
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);

  const handleSpeciesSelect = (speciesId: string) => {
    setSelectedSpecies(speciesId);
    setCurrentView('profile');
  };

  const selectedSpeciesData = selectedSpecies 
    ? speciesData.species.find(s => s.id === selectedSpecies) 
    : null;

  const renderNavigation = () => {
    if (currentView === 'hero') return null;

    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('hero')}
                className="flex items-center gap-2"
              >
                <Home size={16} />
                Home
              </Button>
              <Button
                variant={currentView === 'dashboard' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-2"
              >
                <BarChart3 size={16} />
                Dashboard
              </Button>
              <Button
                variant={currentView === 'species' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('species')}
                className="flex items-center gap-2"
              >
                <Users size={16} />
                Species
              </Button>
            </div>
            <div className="text-sm font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              India 2070 Wildlife Dashboard
            </div>
          </div>
        </div>
      </nav>
    );
  };

  const renderContent = () => {
    const contentClass = currentView === 'hero' ? '' : 'pt-20';
    
    switch (currentView) {
      case 'hero':
        return <WildlifeHero onGetStarted={() => setCurrentView('dashboard')} />;
      
      case 'dashboard':
        return (
          <div className={contentClass}>
            <Dashboard />
          </div>
        );
      
      case 'species':
        return (
          <div className={`${contentClass} p-6`}>
            <SpeciesList 
              species={speciesData.species} 
              onSpeciesSelect={handleSpeciesSelect}
            />
          </div>
        );
      
      case 'profile':
        return (
          <div className={contentClass}>
            {selectedSpeciesData && (
              <SpeciesProfile
                species={selectedSpeciesData}
                onClose={() => {
                  setCurrentView('species');
                  setSelectedSpecies(null);
                }}
              />
            )}
          </div>
        );
      
      default:
        return <WildlifeHero onGetStarted={() => setCurrentView('dashboard')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden w-full">
      {renderNavigation()}
      {renderContent()}
    </div>
  );
};

export default Index;
