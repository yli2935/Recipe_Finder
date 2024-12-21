/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-18 19:59:05
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-20 13:06:11
 * @FilePath: /Recipe_Finder/src/components/navbar/Search.tsx
 */
"use client";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const handleSearch = () => {
    onSearch(query);
  };

  const handleOnInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };
  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex flex-row items-center justify-normal">
        <div className="text-sm font-semibold px-4 sm:px-6 w-full sm:w-auto">
          <input
            type="text"
            value={query}
            placeholder="Search..."
            className="w-full bg-transparent outline-none"
            onChange={handleOnInputChanged}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
        <div className="hidden sm:block text-gray-600 text-sm  px-2 sm:px-5 border-x-[1px] flex-1 text-center">
          Category
        </div>
        <div
          className="text-sm pl-4 pr-2 
            text-gray-600
            flex
            flex-row
            items-center
            gap-4"
        >
          <div className="hidden sm:block">Area</div>
          <div
            onClick={handleSearch}
            className="
              p-2
              sm:p-3
              bg-black
              rounded-full
              text-white
              hover:bg-gray-600
              transition
              duration-200
              "
          >
            <BiSearch className="w-4 h-4 sm:w-5 sm:h-5 " />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;