/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-18 19:26:23
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-19 17:11:17
 * @FilePath: /Recipe_Finder/src/pages/Home.tsx
 */

import Container from "../components/Container";
import Navbar from "../components/navbar/Navbar";
import { useState, useCallback, useEffect } from "react";
import useFetchData from "../hooks/useFetchData";
import { Meals } from "../types/SafeRecipe";
import EmptyState from "../components/EmptyState";
import ListingCard from "../components/listings/ListingCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [queryParams, setQueryParams] = useState(() => {
    // Load queryParams from sessionStorage or use default values
    const savedParams = sessionStorage.getItem("queryParams");
    return savedParams ? JSON.parse(savedParams) : { page: 1, s: "" };
  });

  const [trigger, setTrigger] = useState(false);
  const resetTrigger = useCallback(() => {
    setTrigger(false);
  }, []);

  const { data, isLoading, error } = useFetchData<Meals>(
    `https://www.themealdb.com/api/json/v1/1/search.php`,
    { method: "GET" },
    queryParams,
    trigger,
    resetTrigger,
    500
  );

  const navigate = useNavigate();

  useEffect(() => {
    // Save queryParams to sessionStorage when they change
    sessionStorage.setItem("queryParams", JSON.stringify(queryParams));
  }, [queryParams]);

  useEffect(() => {
    // Save the data to sessionStorage when data changes
    if (data && data.meals) {
      sessionStorage.setItem("searchResults", JSON.stringify(data));
    }
  }, [data]);

  const handleCardClick = (idMeal: string) => {
    navigate(`/listings/${idMeal}`);
  };

  const handleSearch = (query: string) => {
    setQueryParams((prev: any) => ({
      ...prev,
      s: query,
    }));
    setTrigger(true);
  };

  // Load search results from sessionStorage when the component mounts
  const [cachedData, setCachedData] = useState<Meals | null>(null);

  useEffect(() => {
    const savedData = sessionStorage.getItem("searchResults");
    if (savedData) {
      setCachedData(JSON.parse(savedData));
    }
  }, []);

  const displayData = data || cachedData;

  return (
    <>
      <Navbar onSearch={handleSearch} />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading data</p>}
      {displayData && !displayData.meals && <EmptyState showReset />}

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
          {displayData &&
            displayData.meals &&
            displayData.meals.map((meal) => (
              <ListingCard
                key={meal.idMeal}
                data={meal}
                onClickMeal={() => handleCardClick(meal.idMeal)}
              />
            ))}
        </div>
      </Container>
    </>
  );
};

export default Home;
