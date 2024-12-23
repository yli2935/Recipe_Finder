/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-22 14:43:12
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-22 21:13:59
 * @FilePath: /Recipe_Finder/src/components/Footer.tsx
 */

import { IoFastFoodSharp } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full text-gray-600 body-font border-t border-gray-200 h-16 bg-white z-50">
      {/* Container ensures content is centered and spaced correctly */}
      <div className="container mx-auto flex items-center justify-between h-full px-4">
        {/* Logo/Icon Section */}
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <IoFastFoodSharp />
        </a>

        {/* Placeholder for additional content (if any) */}
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 font-semibold sm:border-gray-200 sm:py-2 sm:mt-0 mt-1"></p>

        {/* Creator Info */}
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-1 text-sm font-semibold justify-center sm:justify-start">
          Created by{" "}
          <span className="hover:bg-blue-500 hover:text-white hover:scale-105 hover:-rotate-3 transition-all duration-300 rounded-lg cursor-pointer">
            &nbsp;Adam Li&nbsp;
          </span>
        </span>

        {/* Social Media Icons */}
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-1 justify-center sm:justify-start">
          <a
            href="https://www.facebook.com/profile.php?id=100022486025413"
            target="_blank"
            className="text-gray-500 cursor-pointer hover:text-blue-900"
          >
            {/* Facebook Icon */}
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
            </svg>
          </a>
          <a
            href="https://github.com/yli2935"
            target="_blank"
            className="ml-3 cursor-pointer hover:text-gray-800 text-gray-500"
          >
            {/* GitHub Icon */}
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.799 8.205 11.387.6.113.82-.26.82-.578 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.082-.729.082-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.805 1.305 3.49.998.108-.774.418-1.306.762-1.605-2.665-.305-5.467-1.334-5.467-5.933 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.006-.403c1.02.004 2.045.137 3.006.403 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.479 5.922.429.37.813 1.1.813 2.215 0 1.598-.015 2.887-.015 3.277 0 .321.216.695.825.578C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"></path>
            </svg>
          </a>

          <a
            href="https://www.instagram.com/liyaguang4717/"
            target="_blank"
            className="ml-3 cursor-pointer hover:text-pink-600 text-gray-500"
          >
            {/* Instagram Icon */}
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <rect
                width="20"
                height="20"
                x="2"
                y="2"
                rx="5"
                ry="5"
              ></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/adam-li-41a44b251/"
            target="_blank"
            className="ml-3 cursor-pointer hover:text-indigo-900 text-gray-500"
          >
            {/* LinkedIn Icon */}
            <svg
              fill="currentColor"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              ></path>
              <circle
                cx="4"
                cy="4"
                r="2"
                stroke="none"
              ></circle>
            </svg>
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
