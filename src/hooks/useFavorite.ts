/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-20 11:45:50
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-20 14:31:06
 * @FilePath: /Recipe_Finder/src/hooks/useFavorite.ts
 */
import { useState, useCallback, useEffect } from "react";
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

  const isFavorite = favorites.some((fav) => fav.idMeal === meal.idMeal);

  const toggleFavorite = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      let updatedFavorites: Recipe[];

      if (isFavorite) {
        updatedFavorites = favorites.filter(
          (fav) => fav.idMeal !== meal.idMeal
        );
        toast.success("Unfavorited!");
      } else {
        updatedFavorites = [...favorites, meal];
        toast.success("Favorited!");
      }

      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    },
    [favorites, isFavorite, meal]
  );

  return {
    isFavorite,
    toggleFavorite,
  };
};

export default useFavorite;
