/*
 * @Author: Li yli2935@uwo.ca
 * @Date: 2024-12-18 17:10:08
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-20 14:35:26
 * @FilePath: /Recipe_Finder/src/pages/DetailsPage.tsx
 */

import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { Meals } from "../types/SafeRecipe";
import Container from "../components/Container";
import ListingHead from "../components/listings/ListingHead";
import ListingInfo from "../components/listings/ListingInfo";
import { FaAngleLeft } from "react-icons/fa";
const DetailsPage = () => {
  const { idMeal } = useParams<{ idMeal: string }>();
  const [trigger, setTrigger] = useState(true);
  const { data, isLoading, error } = useFetchData<Meals>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`,
    {
      method: "GET",
    },
    { i: idMeal || "" },
    trigger,
    () => setTrigger(false),
    500
  );

  return (
    <Container>
      <div className="">
        <div className="flex items-center gap-6 mb-6 mt-6 border-b pb-4">
          <button
            onClick={() => window.history.back()}
            className="text-xl"
          >
            <FaAngleLeft />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {data?.meals[0] && (
            <>
              <ListingHead
                title={data.meals[0].strMeal || ""}
                imageSrc={data.meals[0].strMealThumb ?? ""}
                category={data.meals[0].strCategory ?? ""}
                strYoutube={data.meals[0].strYoutube ?? ""}
                id={data.meals[0].idMeal ?? ""}
                area={data.meals[0].strArea ?? ""}
                data={data.meals[0]}
              />
              <div className="flex flex-col gap-6">
                <ListingInfo recipe={data.meals[0]} />
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default DetailsPage;
