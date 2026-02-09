/**
 * @fileoverview Componente que renderiza un gráfico de barras con el número de donaciones por campaña.
 * Utiliza la librería Recharts para la visualización de datos.
 */
import PrintIcon from "@mui/icons-material/Print";
import { Box, Fab, Tooltip, Typography } from "@mui/material";
import Zoom from '@mui/material/Zoom';
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from 'recharts';
import api from "../utils/api.js";
import generatePDF from "../utils/generatePDF";
import BarraDeColor from "./BarraDeColor.jsx";

/**
 * Componente GraficaCampañas.
 * Obtiene datos estadísticos del servidor y los visualiza en un gráfico de barras.
 * Personaliza el eje X para mejorar la legibilidad de etiquetas largas.
 * 
 * @returns {JSX.Element} Contenedor con el gráfico de campañas.
 */
function GraficaCampañas() {
    // Estado para almacenar los datos del gráfico
    const [datos, setDatos] = useState([]);

    // Estado para manejar errores
    const [error, setError] = useState(null);

    /**
     * Efecto de carga.
     * Recupera los datos para el gráfico (/campanas/graph).
     */
    useEffect(() => {
        async function fetchCampañas() {
            try {
                // Obtener datos de películas por director del backend
                const respuesta = await api.get("/campanas/graph");

                // Actualizar estado con los datos obtenidos
                setDatos(respuesta.datos);
                setError(null);
            } catch (error) {
                // En caso de error, mostrar mensaje
                setError(error.mensaje || "No se pudo conectar al servidor");
                setDatos([]);
            }
        }

        fetchCampañas();
    }, []);

    // Mostrar mensaje si hay error
    if (error != null) {
        return (
            <>
                <Typography variant="h5" align="center" sx={{ mt: 3 }}>
                    {error}
                </Typography>
            </>
        );
    }

    // Mostrar mensaje si no hay datos
    if (!datos || datos.length === 0) {
        return (
            <>
                <Typography variant="h5" align="center" sx={{ mt: 3 }}>
                    No hay datos disponibles
                </Typography>
            </>
        );
    }

    return (
        <>
            <Box id="pdf-content" sx={{ width: '100%', height: 500, mt: 3, position: "relative" }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Número de Donaciones por Campaña
                </Typography>

                {/* ResponsiveContainer permite que el gráfico se adapte al tamaño del contenedor */}
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={datos}>
                        <CartesianGrid strokeDasharray="6 6" vertical={false} />
                        {/* <XAxis
                            dataKey="id_campana_campaña.nombre_campana"
                            tick={false}
                        /> */}
                        {/* Configuración del Eje X para etiquetas rotadas y legibles */}
                        <XAxis
                            dataKey="id_campana_campaña.nombre_campana"
                            interval={0}           // Muestra todas las etiquetas
                            height={120}           // Espacio extra abajo para que quepan
                            tick={{
                                angle: -45,        // Inclinación
                                textAnchor: 'end', // CLAVE: Ancla el texto al final para que no se suba
                                dy: 5,             // Empuja el texto un poco hacia abajo para separarlo de la línea
                                fontSize: 12,      // Ajusta el tamaño si es necesario
                                fill: "#666"       // Color del texto
                            }}
                        />
                        <YAxis />
                        {/* Nombre diferente porque si no se lia con el otro tooltip */}
                        <RechartsTooltip />
                        <Legend verticalAlign="top" height={50} />

                        {/* Barra con forma personalizada para colores dinámicos */}
                        <Bar
                            dataKey="total"
                            name="Donaciones"
                            // Shape permite usar un componente personalizado para dibujar la barra, cell esta deprecated
                            shape={<BarraDeColor />}
                            isAnimationActive={true}
                        />
                    </BarChart>
                </ResponsiveContainer>
                {/* Botón flotante para descargar PDF */}
                <Tooltip title="html2canvas y jsPDF"
                    arrow
                    disableInteractive
                    slots={{
                        transition: Zoom,
                    }}>
                    <Fab
                        color="secondary"
                        aria-label="imprimir"
                        onClick={() => generatePDF("pdf-content", "Grafica_campañas")}
                        sx={{
                            position: "fixed",
                            top: 85,
                            right: 20,
                            className: "omitir-pdf",
                        }}
                    >
                        <PrintIcon />
                    </Fab>
                </Tooltip>
            </Box>
        </>
    );
}

export default GraficaCampañas;