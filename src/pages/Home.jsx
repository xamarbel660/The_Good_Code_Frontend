/**
 * @fileoverview Componente de layout principal (Home).
 * Estructura la página con Navbar, contenido dinámico (Outlet) y Footer.
 * Utiliza Grid de Material UI para un diseño flexible y responsivo.
 */
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Grid } from "@mui/material";

/**
 * Componente funcional Home.
 * Actúa como contenedor principal para las rutas anidadas.
 * Asegura que el footer se mantenga al final de la página (sticky footer) mediante flexbox.
 * 
 * @returns {JSX.Element} Estructura base de la aplicación.
 */
function Home() {
  return (
    <>
      {/*minHeight: '100vh' -> Obliga a que la caja mida AL MENOS el 100% del alto de la ventana.
        flexDirection: 'column' -> Organiza los hijos uno debajo de otro (verticalmente). */}
      <Grid
        container
        sx={{
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >

        <Grid>
          <Navbar />
        </Grid>

        {/*flexGrow: 1 -> Hace que el contenido crezca y empuje el footer hacia abajo*/}
        <Grid sx={{ flexGrow: 1, p: 2, width: '100%' }}>
          <Outlet />
        </Grid>

        <Grid>
          <Footer />
        </Grid>

      </Grid>

    </>
  );
}

export default Home;
