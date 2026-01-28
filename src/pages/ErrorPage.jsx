import { Link, useRouteError } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import { Grid } from "@mui/material";
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      {/*minHeight: '100vh' -> Obliga a que la caja mida AL MENOS el 100% del alto de la ventana.
        flexDirection: 'column' -> Organiza los hijos uno debajo de otro (verticalmente).
        wrap="nowrap" -> Evita que se desborden cosas raras. */}
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
          <h1>Oops!</h1>
          <p>Ha ocurrido un error.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
          <Link to="/">Volver a la página de inicio</Link>
        </Grid>

        <Grid>
          <Footer />
        </Grid>

      </Grid>

    </>
  );
}