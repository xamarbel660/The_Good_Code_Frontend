import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import EmergencyIcon from '@mui/icons-material/Emergency';
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListSubheader from "@mui/material/ListSubheader";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router";
import useThemeStore from '../stores/useThemeStore';
import styles from "../css/Impresion.module.css";


function Navbar() {
  const [anclaMenuCampanas, setAnclaMenuCampanas] = React.useState(null);
  const [anclaMenuDonaciones, setAnclaMenuDonaciones] = React.useState(null);
  const [anclaMenuXS, setAnclaMenuXS] = React.useState(null);

  //Recuperamos el modo (dark / light) y la función para cambiarlo (setMode)
  const { mode, setMode } = useThemeStore();

  const handleClickMenuCampanas = (event) => {
    setAnclaMenuCampanas(event.currentTarget);
  };

  const handleClickMenuDonaciones = (event) => {
    setAnclaMenuDonaciones(event.currentTarget);
  };

  const handleClickMenuXS = (event) => {
    setAnclaMenuXS(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnclaMenuCampanas(null);
    setAnclaMenuDonaciones(null);
    setAnclaMenuXS(null);
  };

  const linkStyle = { color: "black", textDecoration: "none" };

  return (
    // Estilo para que no se imprima la navbar (Metodo window.print())
    <AppBar position="static" color="error" className={styles.noprint}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Menú para resolución xs  */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu movies db resolucion xs"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClickMenuXS}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar-xs"
              anchorEl={anclaMenuXS}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anclaMenuXS)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <ListSubheader>Menú Campañas</ListSubheader>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/campañas/new" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Alta de campañas
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/campañas" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Listado de campañas
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/campañas/graph" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Gráfica de campañas
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/campañas/parametrizado" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Listado de campañas parametrizado
                  </Typography>
                </Link>
              </MenuItem>
              <Divider />
              <ListSubheader>Menú Donaciones</ListSubheader>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/donaciones/new" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Alta de donaciones
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/donaciones" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Listado de donaciones
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/donaciones/parametrizado" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Listado de donaciones parametrizado
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/donaciones/cards" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Listado de donaciones cards
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          {/* Logo y nombre de la web */}
          <EmergencyIcon />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mx: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Hospital Good Code
          </Typography>

          {/* Menú para resolución md */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* Menú para campañas en md */}
            <Button
              onClick={handleClickMenuCampanas}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Campañas
            </Button>
            <Menu
              id="menu-campañas"
              anchorEl={anclaMenuCampanas}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anclaMenuCampanas)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/campañas/new" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Alta de campañas
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/campañas" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Listado de campañas
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/campañas/graph" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Gráfica de campañas
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/campañas/parametrizado" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Listado de campañas parametrizado
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>

            {/* Menú para donaciones en md */}
            <Button
              onClick={handleClickMenuDonaciones}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Donaciones
            </Button>
            <Menu
              id="menu-donaciones"
              anchorEl={anclaMenuDonaciones}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anclaMenuDonaciones)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/donaciones/new" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Alta de donaciones
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/donaciones" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Listado de donaciones
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/donaciones/parametrizado" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Listado de donaciones parametrizado
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/donaciones/cards" style={linkStyle}>
                  <Typography sx={{ textAlign: "center" }}>
                    Listado de donaciones cards
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
            {/* Fin menú para donaciones en md */}

          </Box>
          {/* Fin menú para resolución md */}

          {/* Botón para cambiar el tema de color */}
          <Box sx={{ ml: 2 }}>
            <IconButton sx={{ ml: 1 }} onClick={setMode} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
