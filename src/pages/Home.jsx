import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Grid } from "@mui/material";

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
