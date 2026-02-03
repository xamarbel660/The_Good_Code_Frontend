import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import styles from "../css/Impresion.module.css";

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                mt: 5,
                bgcolor: 'grey'
            }}
            // Estilo para que no se imprima el footer (Metodo window.print())
            className={styles.noprint}>
            <Container>
                <Typography variant="h6" align="center">
                    The Good Code - Gestión de Donaciones
                </Typography>
                <Typography variant="body1" color="textSecondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" underline="hover" href="https://github.com/xamarbel660/The_Good_Code_Frontend" sx={{fontWeight: 'bold'}}>
                        The Good Code
                    </Link>
                    {' 2026.'}
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;