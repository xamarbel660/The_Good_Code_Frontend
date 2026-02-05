/**
 * @fileoverview Pie de página de la aplicación.
 * Muestra información de copyright y enlaces relevantes.
 */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import styles from "../css/Impresion.module.css";

/**
 * Componente Footer.
 * Se adhiere al fondo de la página visualmente gracias al diseño flexbox del contenedor padre (Home).
 * Se integra con estilos de impresión para ocultarse cuando se genera un PDF o se imprime la página.
 * 
 * @returns {JSX.Element} Pie de página.
 */
function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                mt: 5,
                bgcolor: 'grey'
            }}
            // Estilo para que no se imprima el footer (Metodo window.print()).
            // Importante para vistas limpias de impresión (como generar PDFs).
            className={styles.noprint}>
            <Container>
                <Typography variant="h6" align="center">
                    The Good Code - Gestión de Donaciones
                </Typography>
                <Typography variant="body1" color="textSecondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" underline="hover" href="https://github.com/xamarbel660/The_Good_Code_Frontend" sx={{ fontWeight: 'bold' }}>
                        The Good Code
                    </Link>
                    {' 2026.'}
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;