import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AltaCampaña from "./components/AltaCampaña";
import AltaDonacion from "./components/AltaDonacion";
import Inicio from "./components/Inicio";
import ListadoCampañas from "./components/ListadoCampañas";
import ListadoCampañasParametrizado from "./components/ListadoCampañasParametrizado";
import ListadoDonaciones from "./components/ListadoDonaciones";
import ListadoDonacionesParametrizado from "./components/ListadoDonacionesParametrizado";
import ModificacionCampaña from "./components/ModificacionCampaña";
import ModificacionDonacion from "./components/ModificacionDonacion";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    errorElement: <ErrorPage />,
    children: [
      // Todo esto se ve en el Outlet de Home.jsx
      { index: true, Component: Inicio }, // Esto se ve en la ruta padre
      {
        path: "/campañas",
        element: <ListadoCampañas />,
      },
      {
        path: "/campañas/parametrizado",
        element: <ListadoCampañasParametrizado />,
      },
      {
        path: "/campañas/new",
        element: <AltaCampaña />,
      },
      {
        path: "/campañas/edit/:id",
        element: <ModificacionCampaña />,
      },
      {
        path: "/donaciones",
        element: <ListadoDonaciones />,
      },
      {
        path: "/donaciones/parametrizado",
        element: <ListadoDonacionesParametrizado />,
      },
      {
        path: "/donaciones/new",
        element: <AltaDonacion />,
      },
      {
        path: "/donaciones/edit/:id",
        element: <ModificacionDonacion />,
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
