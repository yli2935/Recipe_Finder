/*
 * @Author: Li yli2935@uwo.ca
 * @Date: 2024-12-18 17:07:48
 * @LastEditors: Li
 * @LastEditTime: 2024-12-18 17:16:49
 * @FilePath: /Recipe_Finder/src/routers/index.tsx
 */

import { RouteObject } from "react-router-dom";

import Home from "../pages/Home";


const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home />,

    }
];
export default routes;