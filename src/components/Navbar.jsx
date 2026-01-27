import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import EmergencyIcon from '@mui/icons-material/Emergency';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router";
import Divider from "@mui/material/Divider";
import ListSubheader from "@mui/material/ListSubheader";

function Navbar() {
  const [anclaMenuCampanas, setAnclaMenuCampanas] = React.useState(null);
  const [anclaMenuDonaciones, setAnclaMenuDonaciones] = React.useState(null);
  const [anclaMenuXS, setAnclaMenuXS] = React.useState(null);

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
    <AppBar position="static" color="error">
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
            </Menu>
              {/* Fin menú para donaciones en md */}
          </Box>
          {/* Fin menú para resolución md */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
