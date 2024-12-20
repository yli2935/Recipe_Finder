/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-20 13:06:27
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-20 14:28:49
 * @FilePath: /Recipe_Finder/src/pages/FavoritePage.tsx
 */
import { useState, useEffect } from "react";
import Container from "../components/Container";
import { FaAngleLeft } from "react-icons/fa";
import EmptyState from "../components/EmptyState";
import ListingCard from "../components/listings/ListingCard";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../types/SafeRecipe";
const FavoritePage = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  useEffect(() => {
    // Retrieve favorites from local storage and parse them as IMeal[]
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      try {
        const parsedFavorites: Recipe[] = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error("Error parsing favorites from local storage:", error);
      }
    }
  }, []);
  
  const navigate = useNavigate();
  const handleCardClick = (idMeal: string) => {
    navigate(`/listings/${idMeal}`);
  };
  return (
    <Container>
      <div className="flex items-center gap-6 mb-6 mt-6 border-b pb-4">
        <button
          onClick={() => window.history.back()}
          className="text-xl"
        >
          <FaAngleLeft />
        </button>
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          title="No favorites found!"
          showReset={false}
          subtitle="Explore recipes and save your favorites to view them here later."
        />
      ) : (
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
          {
    
            favorites.map((meal) => (
              <ListingCard
                key={meal.idMeal}
                data={meal}
                onClickMeal={() => handleCardClick(meal.idMeal)}
              />
            ))}
        </div>
      )}
    </Container>
  );
};
export default FavoritePage;
