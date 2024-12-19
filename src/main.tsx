/*
 * @Author: Li yli2935@uwo.ca
 * @Date: 2024-12-18 16:52:27
 * @LastEditors: Li
 * @LastEditTime: 2024-12-18 17:20:53
 * @FilePath: /Recipe_Finder/src/main.tsx
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
