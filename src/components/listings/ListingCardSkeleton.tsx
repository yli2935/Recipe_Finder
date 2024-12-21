/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-21 13:13:02
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-21 13:13:06
 * @FilePath: /Recipe_Finder/src/components/listings/ListingCardSkeleton.tsx
 */
import React from "react";

const ListingCardSkeleton: React.FC = () => {
  return (
    <div className="col-span-1 cursor-pointer group focus:outline-none">
      <div className="flex flex-col gap-2 w-full animate-pulse">
        <div
          className="
            aspect-square
            w-full
            relative
            overflow-hidden
            rounded-xl
            bg-gray-300
          "
        ></div>

        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default ListingCardSkeleton;
