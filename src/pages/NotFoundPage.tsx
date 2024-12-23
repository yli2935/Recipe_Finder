/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-22 21:46:25
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-22 22:00:00
 * @FilePath: /Recipe_Finder/src/pages/NotFoundPage.tsx
 */
import React from 'react';

// Import image from assets directory
import logo from '../assets/Scarecrow.png';

const MainContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 md:p-12">
        <div className="flex justify-center">
          <img
            className="w-72 md:w-96 lg:w-full animate-pulse"
            src={logo}
            alt="Oops, Not Found! Scarecrow!"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="font-extrabold text-5xl sm:text-6xl text-gray-900 mb-4">
            404
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            The page you are looking for might have been removed or is
            temporarily unavailable.
          </p>
          <button
            className="mt-6 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold uppercase py-4 px-8 rounded-md shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50"
            onClick={() => (window.location.href = '/')}
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
