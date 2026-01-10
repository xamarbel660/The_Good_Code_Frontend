import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Container from "@mui/material/Container";

function Home() {
  return (
    <>
      <Navbar />
      <Container maxWidth={false} sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default Home;
