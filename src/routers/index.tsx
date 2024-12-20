/*
 * @Author: Li yli2935@uwo.ca
 * @Date: 2024-12-18 17:07:48
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-20 14:15:03
 * @FilePath: /Recipe_Finder/src/routers/index.tsx
 */

import { RouteObject } from "react-router-dom";

import Home from "../pages/Home";
import DetailsPage from "../pages/DetailsPage";
import FavouratePage from "../pages/FavoritePage";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/listings/:idMeal",
        element: <DetailsPage />,
    },
    {
        path: "/favorite",
        element: <FavouratePage />, 
    },
    
];
export default routes;