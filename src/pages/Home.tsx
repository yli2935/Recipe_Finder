/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-18 19:26:23
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-19 10:07:35
 * @FilePath: /Recipe_Finder/src/pages/Home.tsx
 */

import Container from "../components/Container";
import Navbar from "../components/navbar/Navbar";
import { useState, useCallback } from "react";
import useFetchData from "../hooks/useFetchData";
import { Recipe } from "../types/SafeRecipe";
const Home = () => {
  const [search, setSearch] = useState("");
  
  const [trigger, setTrigger] = useState(false);
  const resetTrigger = useCallback(() => {
    setTrigger(false);
  }, []);
  const { data, isLoading, error } = useFetchData<Recipe[]>(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=a",
    { method: "GET" },
    trigger,
    resetTrigger,
    500
  );
  console.log(data);

  const handleSearch = () => {
    console.log("searching...");
  };
  const handleFetchClick = () => {
    setTrigger((prev) => !prev);
  };
  return (
    <>
      <Navbar onSearch={handleSearch} />
      <Container>
        <div
          className="
            pt-24
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          <button onClick={handleFetchClick}>Click</button>
        </div>
      </Container>
    </>
  );
};

export default Home;
