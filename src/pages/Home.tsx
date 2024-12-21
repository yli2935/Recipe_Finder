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

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Load initial state from sessionStorage or location.state
  const [queryParams, setQueryParams] = useState(() => {
    const savedParams = location.state?.queryParams || sessionStorage.getItem("queryParams");
    return savedParams ? JSON.parse(savedParams) : { page: 1, s: "" };
  });

  const [trigger, setTrigger] = useState(false);

  const [randomPage, setRandomPage] = useState(() => {
    const savedRandomPage = location.state?.randomPage || sessionStorage.getItem("randomPage");
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

  // Combine and deduplicate the results
  const combinedMeals: Recipe[] = (() => {
    if (!nameData?.meals && !ingredientData?.meals) return cachedData;

    const mealsByName = nameData?.meals || [];
    const mealsByIngredient = ingredientData?.meals || [];

    const mealMap = new Map<string, Recipe>();

    // Add meals by name
    mealsByName.forEach((meal) => mealMap.set(meal.idMeal, meal));

    // Add meals by ingredient (skip duplicates and fill missing fields with null)
    mealsByIngredient.forEach((meal) => {
      if (!mealMap.has(meal.idMeal)) {
        mealMap.set(meal.idMeal, {
          idMeal: meal.idMeal,
          strMeal: meal.strMeal,
          strMealThumb: meal.strMealThumb,
          strDrinkAlternate: null,
          strCategory: null,
          strArea: null,
          strInstructions: null,
          strTags: null,
          strYoutube: null,
          strIngredient1: null,
          strIngredient2: null,
          strIngredient3: null,
          strIngredient4: null,
          strIngredient5: null,
          strIngredient6: null,
          strIngredient7: null,
          strIngredient8: null,
          strIngredient9: null,
          strIngredient10: null,
          strIngredient11: null,
          strIngredient12: null,
          strIngredient13: null,
          strIngredient14: null,
          strIngredient15: null,
          strIngredient16: null,
          strIngredient17: null,
          strIngredient18: null,
          strIngredient19: null,
          strIngredient20: null,
          strMeasure1: null,
          strMeasure2: null,
          strMeasure3: null,
          strMeasure4: null,
          strMeasure5: null,
          strMeasure6: null,
          strMeasure7: null,
          strMeasure8: null,
          strMeasure9: null,
          strMeasure10: null,
          strMeasure11: null,
          strMeasure12: null,
          strMeasure13: null,
          strMeasure14: null,
          strMeasure15: null,
          strMeasure16: null,
          strMeasure17: null,
          strMeasure18: null,
          strMeasure19: null,
          strMeasure20: null,
          strSource: null,
          strImageSource: null,
          strCreativeCommonsConfirmed: null,
          dateModified: null,
        });
      }
    });

    const combined = Array.from(mealMap.values());
    sessionStorage.setItem(
      "searchResults",
      JSON.stringify({ meals: combined })
    );
    return combined;
  })();

  const handleCardClick = (idMeal: string) => {
    navigate(`/listings/${idMeal}`, {
      state: { randomPage, queryParams },
    });
  };

  const handleSearch = (query: string) => {
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
        <EmptyState showReset />
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