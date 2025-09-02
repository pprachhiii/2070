import React, { useState } from "react";
import { Users, X, MessageCircle } from "lucide-react";

interface NavbarProps {
  onHomeClick?: () => void;
  onSpeciesClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onHomeClick, onSpeciesClick }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // Common button style
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
              className="px-4 py-2 text-sm shadow-lg bg-yellow-400 text-blue-900 rounded-lg hover:scale-105 transition flex items-center gap-2"
            >
              <MessageCircle size={16} />
              Feedback
            </button>
          </div>
        </div>
      </nav>

      {/* Feedback Sidebar */}
      {isFeedbackOpen && (
        <div className="fixed inset-0 z-30 flex">
          {/* Dark overlay */}
          <div
            className="flex-grow bg-black/40"
            onClick={() => setIsFeedbackOpen(false)}
          />
          {/* Slide-in panel */}
          <div className="w-1/4 min-w-[320px] bg-white dark:bg-gray-900 shadow-xl p-6 relative animate-slideInRight">
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-red-500 bg-transparent p-0 transition-transform duration-200 hover:scale-110 focus:outline-none"
              onClick={() => setIsFeedbackOpen(false)}
            >
              <X size={22} />
            </button>

            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
              <MessageCircle size={20} className="text-yellow-400" />
              Feedback
            </h2>

            <form
              action="https://formspree.io/f/movepkgr"
              method="POST"
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="border rounded-lg p-2 dark:bg-gray-800 dark:text-white"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="border rounded-lg p-2 dark:bg-gray-800 dark:text-white"
              />
              <textarea
                name="message"
                rows={4}
                placeholder="Share your thoughts!"
                required
                className="border rounded-lg p-2 dark:bg-gray-800 dark:text-white resize-none"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-blue-900 py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                Send Feedback
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
