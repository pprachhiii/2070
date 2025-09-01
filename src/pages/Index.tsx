import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WildlifeHero from "../components/WildlifeHero";
import Dashboard from "../components/Dashboard";
import SpeciesList from "../components/SpeciesList";
import SpeciesProfile from "../components/SpeciesProfile";
import { Home, BarChart3, Users, Bell } from "lucide-react";
import speciesData from "../data/speciesData.json";

type ViewMode = "hero" | "dashboard" | "species" | "profile";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewMode>("hero");
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSpeciesSelect = (speciesId: string) => {
    setSelectedSpecies(speciesId);
    setCurrentView("profile");
  };

  const selectedSpeciesData = selectedSpecies
    ? speciesData.species.find((s) => s.id === selectedSpecies)
    : null;

  const renderNavigation = () => {
    if (currentView === "hero") return null;

    const baseButtonClasses =
      "flex items-center gap-2 font-medium px-3 py-1.5 rounded-md text-sm transition-colors duration-300";

    const getButtonClasses = (view: ViewMode) => {
      return `${baseButtonClasses} ${
        currentView === view
          ? "bg-green-500 text-black"
          : "bg-black text-white hover:bg-purple-500 hover:text-black"
      }`;
    };

    const getAlertButtonClasses = () => {
      return `${baseButtonClasses} bg-red-600 text-white hover:bg-red-700 hover:text-black`;
    };

    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className={getButtonClasses("hero")}
                onClick={() => setCurrentView("hero")}
              >
                <Home size={16} />
                Home
              </button>

              <button
                className={getButtonClasses("dashboard")}
                onClick={() => setCurrentView("dashboard")}
              >
                <BarChart3 size={16} />
                Dashboard
              </button>

              <button
                className={getButtonClasses("species")}
                onClick={() => setCurrentView("species")}
              >
                <Users size={16} />
                Species
              </button>

              <button
                className={getAlertButtonClasses()}
                onClick={() => navigate("/alerts")}
              >
                <Bell size={16} />
                Alerts
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  };

  const renderContent = () => {
    const contentClass = currentView === "hero" ? "" : "pt-20";

    switch (currentView) {
      case "hero":
        return (
          <WildlifeHero
            onGetStarted={() => setCurrentView("dashboard")}
            onSpeciesClick={() => setCurrentView("species")}
          />
        );

      case "dashboard":
        return (
          <div className={contentClass}>
            <Dashboard />
          </div>
        );

      case "species":
        return (
          <div className={`${contentClass} p-6`}>
            <SpeciesList
              species={speciesData.species}
              onSpeciesSelect={handleSpeciesSelect}
            />
          </div>
        );

      case "profile":
        return (
          <div className={contentClass}>
            {selectedSpeciesData && (
              <SpeciesProfile
                species={selectedSpeciesData}
                onClose={() => {
                  setCurrentView("species");
                  setSelectedSpecies(null);
                }}
              />
            )}
          </div>
        );

      default:
        return (
          <WildlifeHero
            onGetStarted={() => setCurrentView("dashboard")}
            onSpeciesClick={() => setCurrentView("species")}
          />
        );
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
