import React, { useState } from "react";
import { Users, X } from "lucide-react";

interface NavbarProps {
  onHomeClick?: () => void;
  onSpeciesClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onHomeClick, onSpeciesClick }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // Updated button classes with increased height
  const buttonClasses =
    "flex items-center gap-1 font-medium text-white bg-black px-3 py-1.5 rounded-md text-sm transition-colors duration-300 hover:bg-purple-500 hover:text-black";

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-20 bg-transparent backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Left Side Text */}
          <div
            className="text-base font-bold cursor-pointer text-green-600 dark:text-green-400"
            onClick={onHomeClick}
          >
            2070
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-2">
            <button className={buttonClasses} onClick={onSpeciesClick}>
              <Users size={14} />
              Species
            </button>

            <button
              onClick={() => setIsFeedbackOpen(true)}
              className={buttonClasses}
            >
              Feedback
            </button>
          </div>
        </div>
      </nav>

      {/* Feedback Overlay */}
      {isFeedbackOpen && (
        <div className="fixed inset-0 z-30 flex">
          <div
            className="flex-grow bg-black/40"
            onClick={() => setIsFeedbackOpen(false)}
          />
          <div className="w-1/4 min-w-[300px] bg-white dark:bg-gray-900 shadow-xl p-6 relative animate-slideInRight">
            {/* Modified X button */}
            <button
              className="absolute top-3 right-3 text-red-500 bg-transparent p-0 transition-transform duration-200 hover:scale-110 focus:outline-none"
              onClick={() => setIsFeedbackOpen(false)}
            >
              <X size={22} />
            </button>

            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Feedback
            </h2>

            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="border rounded-lg p-2 dark:bg-gray-800 dark:text-white"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border rounded-lg p-2 dark:bg-gray-800 dark:text-white"
              />
              <textarea
                placeholder="Your Feedback"
                rows={4}
                className="border rounded-lg p-2 dark:bg-gray-800 dark:text-white"
              />
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
