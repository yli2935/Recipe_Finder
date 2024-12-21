import Container from "../components/Container";
import Navbar from "../components/navbar/Navbar";
import { useState, useCallback, useEffect } from "react";
import useFetchData from "../hooks/useFetchData";
import { Meals, Recipe } from "../types/SafeRecipe";
import EmptyState from "../components/EmptyState";
import ListingCard from "../components/listings/ListingCard";
import { useNavigate, useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import { motion } from "framer-motion";
import { FadeUp } from "../utils/animation";
import ListingCardSkeleton from "../components/listings/ListingCardSkeleton";
import { combineMeals } from "../utils/combineMeals";
const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Load initial state from sessionStorage or location.state
  const [queryParams, setQueryParams] = useState(() => {
    const savedParams =
      location.state?.queryParams || sessionStorage.getItem("queryParams");
    return savedParams ? JSON.parse(savedParams) : { page: 1, s: "" };
  });

  const [trigger, setTrigger] = useState(false);

  const [randomPage, setRandomPage] = useState(() => {
    const savedRandomPage =
      location.state?.randomPage || sessionStorage.getItem("randomPage");
    return savedRandomPage ? JSON.parse(savedRandomPage) : true;
  });

  useEffect(() => {
    sessionStorage.setItem("queryParams", JSON.stringify(queryParams));
    sessionStorage.setItem("randomPage", JSON.stringify(randomPage));
  }, [queryParams, randomPage]);

  const resetTrigger = useCallback(() => {
    setTrigger(false);
  }, []);

  // Load search results from sessionStorage when the component mounts
  const [cachedData, setCachedData] = useState<Recipe[]>(() => {
    const savedData = sessionStorage.getItem("searchResults");
    return savedData ? JSON.parse(savedData).meals : [];
  });

  // Fetch data by name
  const {
    data: nameData,
    isLoading: isLoadingByName,
    error: errorByName,
  } = useFetchData<Meals>(
    `https://www.themealdb.com/api/json/v1/1/search.php`,
    { method: "GET" },
    queryParams,
    trigger,
    resetTrigger,
    500
  );

  // Fetch data by ingredient
  const {
    data: ingredientData,
    isLoading: isLoadingByIngredient,
    error: errorByIngredient,
  } = useFetchData<Meals>(
    `https://www.themealdb.com/api/json/v1/1/filter.php`,
    { method: "GET" },
    { i: queryParams.s },
    trigger,
    resetTrigger,
    500
  );

  const combinedMeals: Recipe[] = combineMeals(
    nameData,
    ingredientData,
    cachedData
  );

  const handleCardClick = (idMeal: string) => {
    navigate(`/listings/${idMeal}`, {
      state: { randomPage, queryParams },
    });
  };

  const handleSearch = (query: string) => {
    sessionStorage.removeItem("searchResults");
    setCachedData([]);
    setQueryParams((prev: any) => ({ ...prev, s: query }));
    setTrigger(true);
    setRandomPage(false);
  };

  const isLoading = isLoadingByName || isLoadingByIngredient;
  const error = errorByName || errorByIngredient;

  return (
    <>
      <Navbar
        onSearch={handleSearch}
        onClickIcon={() => setRandomPage(true)}
      />
      {randomPage ? (
        <Container>
          <Hero />
        </Container>
      ) : isLoading ? (
        <Container>
          <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {Array(8)
              .fill(null)
              .map((_, index) => (
                <ListingCardSkeleton key={index} />
              ))}
          </div>
        </Container>
      ) : error ? (
        <p>Error loading data</p>
      ) : combinedMeals.length === 0 ? (
        <Container>
          <motion.div
            
            variants={FadeUp(0.5)}
            initial="hidden"
            animate="visible"
          >
            <EmptyState />
          </motion.div>
        </Container>
      ) : (
        <Container>
          <motion.div
            className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
            variants={FadeUp(0.5)}
            initial="hidden"
            animate="visible"
          >
            {combinedMeals.map((meal) => (
              <ListingCard
                key={meal.idMeal}
                data={meal}
                onClickMeal={() => handleCardClick(meal.idMeal)}
              />
            ))}
          </motion.div>
        </Container>
      )}
    </>
  );
};

export default Home;
