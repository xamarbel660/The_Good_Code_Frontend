/**
 * @fileoverview Componente de página de inicio (Landing Page).
 * Muestra el mensaje de bienvenida y el propósito de la aplicación.
 */
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

/**
 * Componente funcional para la pantalla de inicio.
 * Utiliza un Grid centrado para presentar el título y subtítulo.
 * 
 * @returns {JSX.Element} Vista de bienvenida.
 */
function Inicio() {
    return (
        <Grid container justifyContent="center" alignItems="center">
            <Typography variant="h1" component="h1" gutterBottom>
                Bienvenido a The Good Code
            </Typography>
            <Typography variant="h4" color="textSecondary">
                Gestión integral de campañas de donación de sangre.
            </Typography>
        </Grid>
    )
}

export default Inicio;