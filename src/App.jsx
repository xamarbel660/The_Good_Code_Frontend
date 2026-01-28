import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AltaCampaña from "./components/AltaCampaña";
import AltaDonacion from "./components/AltaDonacion";
import Inicio from "./components/Inicio";
import ListadoCampañas from "./components/ListadoCampañas";
import ListadoCampañasParametrizado from "./components/ListadoCampañasParametrizado";
import ListadoDonaciones from "./components/ListadoDonaciones";
import ListadoDonacionesCard from './components/ListadoDonacionesCard';
import ListadoDonacionesParametrizado from "./components/ListadoDonacionesParametrizado";
import ModificacionCampaña from "./components/ModificacionCampaña";
import ModificacionDonacion from "./components/ModificacionDonacion";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import useThemeStore from './stores/useThemeStore';


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
        path: "/donaciones/cards",
        element: <ListadoDonacionesCard />,
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
  //Recuperamos el modo (dark / light) del localStorage
  const mode = useThemeStore((state) => state.mode);
  //Creamos el tema
  const theme = createTheme({
    palette: {
      mode: mode,
    }
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* CssBaseline aplica estilos base de MUI */}
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}
export default App
