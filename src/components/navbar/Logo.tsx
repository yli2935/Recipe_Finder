/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-18 19:52:07
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-21 12:41:46
 * @FilePath: /Recipe_Finder/src/components/navbar/Logo.tsx
 */
"use client";
import { NavLink } from "react-router-dom";
import { IoFastFoodSharp } from "react-icons/io5";
interface LogoProps {

  onClickIcon: () => void;
}
const Logo: React.FC<LogoProps> = ({ onClickIcon }) => {

  return (
    <NavLink
      to="/"
      className="hidden sm:flex items-center gap-2 -ml-6"
      onClick={onClickIcon}
    >
      <IoFastFoodSharp />
      <h5 className="text-sm font-bold">Recipe Finder</h5>
    </NavLink>
  );
};

export default Logo;
