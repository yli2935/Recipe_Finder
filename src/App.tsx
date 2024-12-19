/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-18 16:32:56
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-18 22:39:35
 * @FilePath: /Recipe_Finder/src/App.tsx
 */
import { useRoutes } from "react-router-dom";
import routes from "./routers";

function App() {
  const element = useRoutes(routes);
  return (
    <main className='pb-14 lg:pb-0'>

      <div className='min-h-[90vh]'>
        {element}
      </div>
    </main>
  );
}

export default App;
