import DeleteIcon from '@mui/icons-material/Delete';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import PrintIcon from "@mui/icons-material/Print";
import { Box, Card, CardActions, CardContent, CardMedia, Fab, Grid, Pagination, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import styles from "../css/Impresion.module.css";
import api from "../utils/api";
import Dialogo from "./Dialogo.jsx";
import Zoom from '@mui/material/Zoom';


function ListadoDonacionesCard() {
    const [datos, setDatos] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Para el dialogo
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogSeverity, setDialogSeverity] = useState("success");

    useEffect(() => {
        async function fetchDonaciones() {
            try {
                const respuesta = await api.get(`/donaciones/cards/${page}`);

                // Actualizamos los datos de las donaciones
                setDatos(respuesta.datos);
                // Actualizamos el total de páginas
                setTotalPages(respuesta.pagination.totalPages);
                // Y no tenemos errores
                setError(null);
            } catch (e) {
                setError(e.mensaje || "No se pudo conectar al servidor");
                setDatos([]);
            }
        }

        fetchDonaciones();
    }, [page]);

    const handleChange = (event, value) => {
        setPage(value);
    };

    //Borrado de una donación
    async function handleDelete(id_donacion) {
        try {
            await api.delete("/donaciones/" + id_donacion);

            //Buscamos la donación borrada y la quitamos de los datos
            const datos_nuevos = datos.filter(donacion => donacion.id_donacion != id_donacion);
            // Actualizamos los datos de donaciones sin la que hemos borrado
            setDatos(datos_nuevos);
            // Y no tenemos errores
            setError(null);

            setDialogMessage("Borrado con exito"); // Mensaje del dialogo
            setDialogSeverity("success"); // Color de la alerta
            setOpenDialog(true); // Abrir el diálogo
        } catch (error) {
            setError(error.mensaje || "No se pudo conectar al servidor");
            setDatos([]);

            setDialogMessage(error.mensaje || "Error al borrar la donación");
            setDialogSeverity("error");
            setOpenDialog(true);
        }
    }

    //Cerrando el dialogo
    function handleDialogClose() {
        setOpenDialog(false);
    }

    //Mensaje de error
    if (error != null) {
        return (
            <>
                <Typography variant="h5" align="center" sx={{ mt: 10 }}>
                    {error}
                </Typography>
            </>
        );
    }

    return (
        <>
            {/* Título */}
            <Typography variant="h4" align="center" sx={{ my: 3 }}>
                Listado de Donaciones en Cards
            </Typography>

            {/* Grid responsivo con tarjetas */}
            <Grid container spacing={1}>
                {datos.map((row) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={row.id_donacion}>
                        {/* Tarjeta de donación */}
                        <Card>
                            {/* Imagen del donante */}
                            <CardMedia
                                sx={{ height: 500 }}
                                image={row.URL_image}
                                title={row.nombre_donante}
                            />

                            {/* Contenido de la tarjeta */}
                            <CardContent>
                                {/* Nombre del donante */}
                                <Typography gutterBottom variant="h5" component="div">
                                    {row.nombre_donante}
                                </Typography>

                                {/* Campaña */}
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    {row.id_campana_campaña.nombre_campana}
                                </Typography>

                                {/* Fecha de donación */}
                                <Typography variant="caption" gutterBottom>
                                    <strong>Fecha de Donación:</strong> {new Date(row.fecha_donacion).toLocaleDateString('es-ES')}
                                </Typography>
                                <br />

                                {/* Peso */}
                                <Typography variant="caption" gutterBottom>
                                    <strong>Peso:</strong> {row.peso_donante}
                                </Typography>
                                <br />

                                {/* Grupo Sanguíneo */}
                                <Typography variant="caption" gutterBottom>
                                    <strong>Grupo Sanguíneo:</strong> {row.grupo_sanguineo}
                                </Typography>
                            </CardContent>

                            {/* Botones de acciones */}
                            <CardActions>
                                <Tooltip
                                    title="Borrar Donación"
                                    arrow
                                    disableInteractive
                                    slotProps={{
                                        popper: {
                                            modifiers: [
                                                {
                                                    name: 'offset',
                                                    options: {
                                                        offset: [0, -7],
                                                    },
                                                },
                                            ],
                                        },
                                    }}>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(row.id_donacion)}
                                        sx={{ mx: 2, position: 'relative', }}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </Tooltip>

                                <Tooltip
                                    title="Editar Donación"
                                    arrow
                                    disableInteractive
                                    slotProps={{
                                        popper: {
                                            modifiers: [
                                                {
                                                    name: 'offset',
                                                    options: {
                                                        offset: [0, -7],
                                                    },
                                                },
                                            ],
                                        },
                                    }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => { }}
                                        sx={{ mx: 2, position: 'relative', }}
                                        href={`/donaciones/edit/${row.id_donacion}`}
                                    >
                                        <EditSquareIcon />
                                    </Button>
                                </Tooltip>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Paginación */}
            {/* Estilo para que no se imprima la paginación (Metodo window.print()) */}
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }} className={styles.noprint}>
                <Pagination
                    count={totalPages} // Usamos el estado que viene del backend
                    page={page}
                    onChange={handleChange}
                    color="primary"
                    size="large"
                />
            </Box>

            {/* Botón flotante para imprimir */}
            <Tooltip title="Windows Print"
                arrow
                disableInteractive
                slots={{
                    transition: Zoom,
                }}>
                <Fab
                    className={styles.noprint}
                    color="secondary"
                    aria-label="imprimir"
                    onClick={() => window.print()}
                    sx={{
                        position: "fixed",
                        top: 85,
                        right: 20,
                    }}
                >
                    <PrintIcon />
                </Fab>
            </Tooltip>

            {/* Dialogo para cuando se borra una donación */}
            <Dialogo
                open={openDialog}
                onClose={() => handleDialogClose()}
                dialogSeverity={dialogSeverity}
                dialogMessage={dialogMessage}
            />
        </>
    )
}

export default ListadoDonacionesCard;
