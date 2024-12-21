/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-21 10:51:31
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-21 10:55:28
 * @FilePath: /Recipe_Finder/src/utils/animation.jsx
 */
import { motion, Variants } from "framer-motion";

export const FadeUp = (delay: number): Variants => {
  return {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay,
        duration: 1,
      },
    },
  };
};

export const FadeLeft = (delay: number): Variants => {
  return {
    hidden: {
      opacity: 0,
      x: 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: delay,
        duration: 1,
      },
    },
  };
};

export const FadeRight = (delay: number): Variants => {
  return {
    hidden: {
      opacity: 0,
      x: -100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: delay,
        duration: 1,
      },
    },
  };
};