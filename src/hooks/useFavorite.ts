import { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { toast } from "react-hot-toast";
import { Recipe } from "../types/SafeRecipe";

interface IUseFavorite {
  meal: Recipe;
}

const useFavorite = ({ meal }: IUseFavorite) => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Debounced function for updating localStorage
  const debouncedUpdateLocalStorage = useCallback(
    debounce((updatedFavorites: Recipe[]) => {
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }, 100),
    []
  );

  const isFavorite = favorites.some((fav) => fav.idMeal === meal.idMeal);

  const toggleFavorite = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      setFavorites((prevFavorites) => {
        const alreadyFavorite = prevFavorites.some((fav) => fav.idMeal === meal.idMeal);

        let updatedFavorites: Recipe[];

        if (alreadyFavorite) {
          updatedFavorites = prevFavorites.filter((fav) => fav.idMeal !== meal.idMeal);
          toast.success("Unfavorited!");
        } else {
          updatedFavorites = [...prevFavorites, meal];
          toast.success("Favorited!");
        }

        // Update localStorage immediately
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

        // Call the debounced function to handle potential frequent updates
        debouncedUpdateLocalStorage(updatedFavorites);

        return updatedFavorites;
      });
    },
    [meal, debouncedUpdateLocalStorage]
  );

  return {
    isFavorite,
    toggleFavorite,
  };
};

export default useFavorite;
