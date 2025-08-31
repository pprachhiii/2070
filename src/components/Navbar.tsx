import React, { useState } from "react";
import { TreePine, X } from "lucide-react";

interface NavbarProps {
  onHomeClick?: () => void; // callback when Wildlife logo/text is clicked
}

const Navbar: React.FC<NavbarProps> = ({ onHomeClick }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-xl cursor-pointer"
            onClick={onHomeClick} // triggers the same action as Home
          >
            <TreePine size={22} />
            Wildlife
          </div>

          {/* Links */}
          <div className="hidden md:flex gap-6 text-gray-700 dark:text-gray-200 font-medium items-center">
            <a href="#features" className="hover:text-green-600">Features</a>
            <a href="#about" className="hover:text-green-600">About</a>
            <a href="#contact" className="hover:text-green-600">Contact</a>

            {/* Feedback Button */}
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="ml-4 px-4 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition shadow-md"
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
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
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
