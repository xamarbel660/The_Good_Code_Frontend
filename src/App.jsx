import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";

import Inicio from "./components/Inicio";
import ListadoCampañas from "./components/ListadoCampañas";
import ListadoDonaciones from "./components/ListadoDonaciones";
import AltaCampaña from "./components/AltaCampaña";

import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      // Todo esto se ve en el Outlet de Home.jsx
      { index: true, Component: Inicio }, // Esto se ve en la ruta padre
      {
        path: "/campañas",
        element: <ListadoCampañas />,
      },
      {
        path: "/campañas/new",
        element: <AltaCampaña />,
      },
      {
        path: "/donaciones",
        element: <ListadoDonaciones />,
      },
      {
        path: "/donaciones/new",
        element: <h1>Alta de donaciones</h1>,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App
