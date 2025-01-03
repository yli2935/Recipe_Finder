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
import { Toaster } from "react-hot-toast";
import Pagination from "../components/Pagination";
import useResponsiveItemsPerPage from "../hooks/useResponsiveItemsPerPage";
import Footer from "../components/Footer";
const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  const [cachedData, setCachedData] = useState<Recipe[]>(() => {
    const savedData = sessionStorage.getItem("searchResults");
    return savedData ? JSON.parse(savedData).meals : [];
  });

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
    setQueryParams((prev: any) => ({ ...prev, s: query, page: 1 }));
    setTrigger(true);
    setRandomPage(false);
  };

  const isLoading = isLoadingByName || isLoadingByIngredient;
  const error = errorByName || errorByIngredient;
  console.log("error", error);

  const itemsPerPage = useResponsiveItemsPerPage();

  const { page } = queryParams;

  const totalItems = combinedMeals.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastMeal = page * itemsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
  const currentMeals = combinedMeals.slice(indexOfFirstMeal, indexOfLastMeal);

  // Pagination callback
  const handlePageChange = (newPage: number) => {
    setQueryParams((prev: any) => ({ ...prev, page: newPage }));
  };

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
      ) : !isLoading && error ? (
        <Container>
          <motion.div
            variants={FadeUp(0.5)}
            initial="hidden"
            animate="visible"
          >
            <EmptyState
              title="Something went wrong"
              subtitle={error}
            />
          </motion.div>
        </Container>
      ) : !isLoading && !error && currentMeals.length === 0 ? (
        <Container>
          <motion.div
            variants={FadeUp(1)}
            initial="hidden"
            animate="visible"
          >
            <EmptyState />
          </motion.div>
        </Container>
      ) : (
        <Container>
          <motion.div
            className="pt-24 grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 
                   gap-8"
            variants={FadeUp(0.5)}
            initial="hidden"
            animate="visible"
          >
            {currentMeals.map((meal) => (
              <ListingCard
                key={meal.idMeal}
                data={meal}
                onClickMeal={() => handleCardClick(meal.idMeal)}
              />
            ))}
          </motion.div>

          <motion.div
            variants={FadeUp(0.5)}
            initial="hidden"
            animate="visible"
          >
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <div className="h-5" />
          </motion.div>
        </Container>
      )}
      <Footer />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  );
};

export default Home;
