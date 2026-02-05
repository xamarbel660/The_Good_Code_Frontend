/**
 * @fileoverview Componente para la edición de campañas existentes.
 * Recupera los datos de una campaña específica y permite modificarlos con validación.
 */
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Switch from '@mui/material/Switch';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import api from "../utils/api.js";
import Dialogo from "./Dialogo.jsx";


/**
 * Componente ModificacionCampaña.
 * Carga los datos de una campaña basada en el ID de la URL y permite su edición.
 * Reutiliza lógica de validación similar a la de alta.
 * 
 * @returns {JSX.Element} Formulario de edición de campaña.
 */
function ModificacionCampaña() {
    //Obtenemos el id de la campaña
    const { id } = useParams();

    const navigate = useNavigate();

    const [campaña, setCampaña] = useState({
        id_campana: 0,
        nombre_campana: "",
        objetivo_litros_campana: 0.00,
        fecha_inicio_campana: "",
        fecha_fin_campana: "",
        urgente_campana: false,
    });

    const [isCamposValidos, setIsCamposValidos] = useState({
        nombre_campana: true,
        objetivo_litros_campana: true,
        fecha_inicio_campana: true,
        fecha_fin_campana: true,
        urgente_campana: true,
    });

    // Estados de UI
    const [isUpdating, setIsUpdating] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogSeverity, setDialogSeverity] = useState("success");

    /**
     * Efecto de carga inicial.
     * Recupera los datos de la campaña por ID al montar el componente.
     */
    useEffect(() => {
        async function fetchRecuperarCampaña() {
            try {
                const respuesta = await api.get(`/campanas/${id}`);
                setCampaña(respuesta.datos);

            } catch (error) {
                setDialogMessage(error.mensaje || "Error al buscar la campaña");
                setDialogSeverity("error"); // Color rojo
                setOpenDialog(true); // Abrir el diálogo
            }
            // Pase lo que pase hemos terminado el proceso de actualización
        }
        fetchRecuperarCampaña();

    }, []);

    /**
     * Efecto de actualización.
     * Envía los datos modificados (PUT) cuando isUpdating es true.
     */
    useEffect(() => {
        async function fetchUpdateCampaña() {
            try {
                await api.put(`/campanas/${id}`, campaña);

                setDialogMessage("Campaña actualizada correctamente"); // Mensaje
                setDialogSeverity("success"); // Color verde
                setOpenDialog(true); // Abrir el diálogo
            } catch (error) {
                setDialogMessage(error.mensaje || "Error al actualizar la campaña");
                setDialogSeverity("error"); // Color rojo
                setOpenDialog(true); // Abrir el diálogo
            }
            // Pase lo que pase hemos terminado el proceso de actualización
            setIsUpdating(false);
        }

        if (isUpdating) fetchUpdateCampaña();
    }, [isUpdating]);

    function handleChange(e) {
        setCampaña({ ...campaña, [e.target.name]: e.target.value });
    }

    function handleChangeSwitch(e) {
        setCampaña({ ...campaña, [e.target.name]: e.target.checked });
    }

    function handleClick() {
        // evitar envíos duplicados por pulsar el botón tras el mensaje de inserción correcta
        if (isUpdating) return;

        if (validarDatos()) {
            setIsUpdating(true);
        }
    }

    function handleDialogClose() {
        setOpenDialog(false);

        navigate("/campañas");
    }

    function validarDatos() {
        let valido = true;
        let objetoValidacion = {
            nombre_campana: true,
            objetivo_litros_campana: true,
            fecha_inicio_campana: true,
            fecha_fin_campana: true,
            urgente_campana: true,
        };

        // Validación del nombre_campana
        if (campaña.nombre_campana.length < 10 || campaña.nombre_campana.length > 100) {
            valido = false;
            objetoValidacion.nombre_campana = false;
        }

        // Validación de la objetivo_litros_campana
        if (campaña.objetivo_litros_campana < 50.00 || campaña.objetivo_litros_campana > 1000.00) {
            valido = false;
            objetoValidacion.objetivo_litros_campana = false;
        }

        // Validación de la fecha_inicio_campana como requerida
        if (!campaña.fecha_inicio_campana) {
            valido = false;
            objetoValidacion.fecha_inicio_campana = false;
        }

        // Validación de la fecha_fin_campana como requerida
        if (!campaña.fecha_fin_campana || campaña.fecha_fin_campana < campaña.fecha_inicio_campana) {
            valido = false;
            objetoValidacion.fecha_fin_campana = false;
        }

        // Actualizamos con los campos correctos e incorrectos
        setIsCamposValidos(objetoValidacion);

        return valido;
    }


    return (
        <>
            <Grid
                container
                spacing={2}
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Grid item size={{ xs: 12, sm: 9, md: 7 }}>
                    <Paper elevation={6} sx={{ mt: 3, p: 3, maxWidth: 900, mx: "auto" }}>
                        <Typography variant="h4" align="center" sx={{ mb: 3 }}>
                            Modificación de Campaña
                        </Typography>

                        <Grid
                            container
                            spacing={2}
                            sx={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            {/* Nombre de la campaña */}
                            <Grid item size={{ xs: 10 }}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Nombre de la Campaña"
                                    name="nombre_campana"
                                    type="text"
                                    maxLength="100"
                                    value={campaña.nombre_campana}
                                    onChange={handleChange}
                                    error={!isCamposValidos.nombre_campana}
                                    helperText={
                                        !isCamposValidos.nombre_campana && "El nombre es pequeño."
                                    }
                                />
                            </Grid>
                            {/* Objetivo litros de sangre */}
                            <Grid item size={{ xs: 10 }}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Objetivo Litros de Sangre"
                                    name="objetivo_litros_campana"
                                    type="number"
                                    slotProps={{
                                        htmlInput: {
                                            max: 1000.00, step: 2.5,
                                        }
                                    }}
                                    value={campaña.objetivo_litros_campana}
                                    onChange={handleChange}
                                    error={!isCamposValidos.objetivo_litros_campana}
                                    helperText={
                                        !isCamposValidos.objetivo_litros_campana && "Como minimo el objetivo debe de ser de 50.00."
                                    }
                                />
                            </Grid>
                            {/* Fecha de inicio y fin de la campaña */}
                            <Grid item size={{ xs: 10 }}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                    adapterLocale="es"
                                >
                                    <DatePicker
                                        label="Inicio de la campaña"
                                        name="fecha_inicio_campana"
                                        sx={{}}
                                        slotProps={{
                                            textField: {
                                                required: true,
                                                error: !isCamposValidos.fecha_inicio_campana,
                                                helperText: !isCamposValidos.fecha_inicio_campana ? "La fecha es obligatoria" : "",
                                            },
                                        }}
                                        value={
                                            campaña.fecha_inicio_campana ? dayjs(campaña.fecha_inicio_campana) : null
                                        }
                                        onChange={(newValue) =>
                                            setCampaña({
                                                ...campaña,
                                                fecha_inicio_campana: newValue.format("YYYY-MM-DD"),
                                            })
                                        }
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item size={{ xs: 10 }}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                    adapterLocale="es"
                                >
                                    <DatePicker
                                        label="Fin de la campaña"
                                        name="fecha_fin_campana"
                                        minDate={campaña.fecha_inicio_campana ? dayjs(campaña.fecha_inicio_campana) : null}
                                        slotProps={{
                                            textField: {
                                                required: true,
                                                error: !isCamposValidos.fecha_fin_campana,
                                                helperText: !isCamposValidos.fecha_fin_campana
                                                    ? "La fecha es obligatoria y no puede ser menor que la fecha de inicio"
                                                    : "",
                                            },
                                        }}
                                        value={
                                            campaña.fecha_fin_campana && campaña.fecha_fin_campana >= campaña.fecha_inicio_campana ? dayjs(campaña.fecha_fin_campana) : null
                                        }
                                        onChange={(newValue) =>
                                            setCampaña({
                                                ...campaña,
                                                fecha_fin_campana: newValue.format("YYYY-MM-DD"),
                                            })
                                        }
                                    />
                                </LocalizationProvider>
                            </Grid>
                            {/* ¿Campaña urgente? */}
                            <Grid item size={{ xs: 10 }}>
                                <Typography variant="body1" align="start" sx={{ mb: 1, }}>
                                    ¿Es urgente? {campaña.urgente_campana ? "Sí" : "No"}
                                </Typography>
                                <Switch
                                    checked={campaña.urgente_campana}
                                    name="urgente_campana"
                                    onChange={handleChangeSwitch}
                                    slotProps={{ input: { 'aria-label': 'controlled' } }}
                                />
                            </Grid>
                            {/* Botón de aceptar */}
                            <Grid
                                item
                                size={{ xs: 10 }}
                                sx={{ display: "flex", justifyContent: "flex-end" }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{ mt: 3 }}
                                    loading={isUpdating}
                                    loadingPosition="end"
                                    onClick={handleClick}
                                >
                                    Aceptar
                                </Button>
                            </Grid>
                        </Grid>

                    </Paper>
                </Grid>
            </Grid>

            <Dialogo
                open={openDialog}
                onClose={() => handleDialogClose()}
                dialogSeverity={dialogSeverity}
                dialogMessage={dialogMessage}
            />
        </>
    );
}

export default ModificacionCampaña;