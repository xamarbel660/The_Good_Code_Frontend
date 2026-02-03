import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Text, Tooltip, XAxis, YAxis } from 'recharts';
import api from "../utils/api.js";
import BarraDeColor from "./BarraDeColor.jsx";

function GraficaCampañas() {
    // Estado para almacenar los datos del gráfico
    const [datos, setDatos] = useState([]);

    // Estado para manejar errores
    const [error, setError] = useState(null);

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
            <Box sx={{ width: '100%', height: 500, mt: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Número de Donaciones por Campaña
                </Typography>

                {/* ResponsiveContainer permite que el gráfico se adapte al tamaño del contenedor */}
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={datos}>
                        <CartesianGrid strokeDasharray="6 6" />
                        {/* <XAxis
                            dataKey="id_campana_campaña.nombre_campana"
                            tick={false}
                        /> */}
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
                        <Tooltip />

                        <Bar
                            dataKey="total"
                            // Shape permite usar un componente personalizado para dibujar la barra, cell esta deprecated
                            shape={<BarraDeColor />}
                            isAnimationActive={true}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </>
    );
}

export default GraficaCampañas;