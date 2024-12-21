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
    setQuery(event.target.value);
  };

  return (
    <div
      className="border-[1px] w-full md:w-96 lg:w-[32rem] py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer relative"
      tabIndex={0} // Make the container focusable to detect blur
    >
      <div className="flex flex-row items-center justify-normal">
        <div className="text-sm font-semibold px-4 sm:px-6 w-full">
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

        <div className="text-sm pl-4 pr-2 text-gray-600 flex flex-row items-center gap-4">
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
            <BiSearch className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
