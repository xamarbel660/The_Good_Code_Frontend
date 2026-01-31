import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

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