// function Inicio(){
//     return (
//         <p> Esto es el componente inicio, hacer cosas para que se vean bien, tambien hacer un footer en home, investigar lo del footer</p>
//     )
// }
// export default Inicio;

import { Grid } from "@mui/material"; // O el import que te funcione
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom"; // Asegúrate de tener este import si usas links

/* c)Hay una landpage en la ruta principal (/) que muestra la barra de navegación, un carrusel, texto
describiendo la web y un píe de página que se visualiza en todas las páginas. (0,5 puntos) */
function Inicio() {
    return (
        // Contenedor interno de la página de inicio
        <Grid container spacing={4} justifyContent="center" alignItems="center">

            {/* Título Principal y Bienvenida - Ocupa todo el ancho (size 12) */}
            <Grid size={12} sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Bienvenido a The Good Code
                </Typography>
                <Typography variant="h5" color="text.secondary">
                    Gestión integral de campañas de donación de sangre.
                </Typography>
            </Grid>

            {/* Caja 1: Ir a Donaciones (Ejemplo de uso de Grid) */}
            <Grid size={{ xs: 12, md: 5 }}>
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                    <Typography variant="h5" gutterBottom>
                        Donaciones
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Consulta el historial de donaciones o registra una nueva entrada en el sistema.
                    </Typography>
                    <Link to="/donaciones" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary">
                            Ver Donaciones
                        </Button>
                    </Link>
                </Paper>
            </Grid>

            {/* Caja 2: Otra opción (para equilibrar el grid) */}
            <Grid size={{ xs: 12, md: 5 }}>
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                    <Typography variant="h5" gutterBottom>
                        Campañas
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Gestiona las campañas activas, objetivos y urgencias del centro.
                    </Typography>
                    <Link to="/campañas" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="secondary">
                            Ver Campañas
                        </Button>
                    </Link>
                </Paper>
            </Grid>

        </Grid>
    )
}

export default Inicio;