/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-18 20:20:08
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-20 15:37:52
 * @FilePath: /Recipe_Finder/src/components/navbar/Menu.tsx
 */

import { useNavigate } from "react-router-dom";

import { MdFavorite } from "react-icons/md";
const Menu = () => {
  const navigate = useNavigate();



  const handleClick = () => {
    navigate("/favorite");
  };

  return (
    <div className="relative focus:outline-none">
    <div className="flex flex-row items-center gap-3">
   
      <div
        onClick={handleClick}
        className="
         p-4
         md:py-2
         md:px-2
         border-[1px]
         border-neutral-200
         flex
         flex-row
         items-center
         gap-3
         rounded-full
         cursor-pointer
         hover:shadow-md
         transition
         md:mt-4
        "
      >
        <MdFavorite />
      </div>
    </div>

  </div>
  );
};

export default Menu;
