import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import DefaultLayout from "./layouts/DefaultLayout";
import AnimalDetailPage from "./pages/AnimalDetailPage";
import AnimalsPage from "./pages/AnimalsPage";

export default function App() {
  return (
    <BrowserRouter>
      {/*radice principale per definire le rotte*/}
      <Routes>
        {/*tutte le Route devono stare dentro Routes*/}
        <Route Component={DefaultLayout}>
          {/*Rotta usata per imporre un layout a tutte le rotte ivi contenute*/}
          <Route index Component={HomePage} />
          <Route path="/animals" element={<AnimalsPage />} />
          <Route
            path="/animals/:slug" /* rotta parametrica */
            element={<AnimalDetailPage />}
          />
          <Route path="*" Component={NotFoundPage} />
          {/*rotta a cui si giunge se non si intercetta nessuno dei casi precedenti: pagina 404-not found*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
