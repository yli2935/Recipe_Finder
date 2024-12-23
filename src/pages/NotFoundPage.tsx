/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-22 21:46:25
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-22 21:50:51
 * @FilePath: /Recipe_Finder/src/pages/NotFoundPage.tsx
 */
import React from 'react';

// Import image from assets directory
import logo from '../assets/Scarecrow.png';

const MainContent: React.FC = () => {
  return (
    <div className="my-10 mx-10 grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-8 place-items-center">
      <div>
        <img
          className="w-auto animate-pulse"
          src={logo}
          alt="Oops, Not Found! Scarecrow!"
        />
      </div>
      <div className="mr-10 font-bodyfont grid grid-cols-1 gap-6 justify-items-start">
        <h1 className="font-bold text-4xl sm:text-5xl leading-relaxed md:leading-normal lg:leading-relaxed">
          I have bad news for you
        </h1>
        <p className="font-normal text-lg">
          The Page you are looking for might be removed or is temporarily unavailable
        </p>
        <button
          className="uppercase text-sm text-center py-5 mt-5 bg-gray-900 hover:bg-gray-600 active:bg-gray-800 text-white transform hover:-translate-y-1 hover:scale-110 active:scale-100 transition-transform w-56 cursor-pointer"
          onClick={() => (window.location.href = '/')}
        >
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default MainContent;
