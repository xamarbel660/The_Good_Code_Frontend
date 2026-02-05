/**
 * @fileoverview Componente para la creación de nuevas campañas de donación.
 * Gestiona el formulario de alta, validaciones y comunicación con la API.
 */
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api.js";
import Dialogo from "./Dialogo.jsx";

/**
 * Componente AltaCampaña.
 * Permite al usuario ingresar los datos necesarios para registrar una nueva campaña.
 * Incluye validación de campos en cliente y manejo de errores de servidor.
 * 
 * @returns {JSX.Element} Formulario de alta de campaña.
 */
function AltaCampaña() {
    const navigate = useNavigate();

    // Estado para los datos del formulario de la campaña
    const [campaña, setCampaña] = useState({
        nombre_campana: "",
        objetivo_litros_campana: 0.0,
        fecha_inicio_campana: "",
        fecha_fin_campana: "",
        urgente_campana: false,
    });

    // Estado para controlar la validez visual de cada campo (true: válido, false: error)
    const [isCamposValidos, setIsCamposValidos] = useState({
        nombre_campana: true,
        objetivo_litros_campana: true,
        fecha_inicio_campana: true,
        fecha_fin_campana: true,
        urgente_campana: true,
    });

    // Estados para control de UI: carga y diálogos
    const [isUpdating, setIsUpdating] = useState(false); // Indica si se está procesando el envío
    const [openDialog, setOpenDialog] = useState(false); // Visibilidad del modal
    const [dialogMessage, setDialogMessage] = useState(""); // Contenido del mensaje del modal
    const [dialogSeverity, setDialogSeverity] = useState("success"); // Tipo de mensaje (éxito/error)

    /**
     * Efecto que desencadena la petición a la API cuando isUpdating pasa a true.
     * Envía los datos de la campaña al backend.
     */
    useEffect(() => {
        async function fetchCreateCampaña() {
            try {
                const respuesta = await api.post("/campanas/", campaña);

                setDialogMessage(respuesta.mensaje); // Mensaje
                setDialogSeverity("success"); // Color verde
                setOpenDialog(true); // Abrir el diálogo
            } catch (error) {
                setDialogMessage(error.mensaje || "Error al crear la campaña");
                setDialogSeverity("error"); // Color rojo
                setOpenDialog(true); // Abrir el diálogo
            }
            // Pase lo que pase hemos terminado el proceso de actualización
            setIsUpdating(false);
        }

        if (isUpdating) fetchCreateCampaña();
    }, [isUpdating]);

    function handleChange(e) {
        // Si el campo es urgente_campana, se actualiza con el valor del switch
        if (e.target.name == "urgente_campana") {
            setCampaña({ ...campaña, [e.target.name]: e.target.checked });
        } else {
            setCampaña({ ...campaña, [e.target.name]: e.target.value });
        }
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

        if (dialogSeverity === "success") navigate("/");
    }

    /**
     * Valida los datos del formulario antes de enviar.
     * Verifica longitudes, rangos y campos obligatorios.
     * 
     * @returns {boolean} True si todos los datos son válidos, False en caso contrario.
     */
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
        if (campaña.objetivo_litros_campana < 50.0 || campaña.objetivo_litros_campana > 1000.00) {
            valido = false;
            objetoValidacion.objetivo_litros_campana = false;
        }

        // Validación de la fecha_inicio_campana como requerida
        if (!campaña.fecha_inicio_campana) {
            valido = false;
            objetoValidacion.fecha_inicio_campana = false;
        }

        // Validación de la fecha_fin_campana como requerida
        if (!campaña.fecha_fin_campana) {
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
                }}
            >
                <Grid item size={{ xs: 12, sm: 9, md: 7 }}>
                    <Paper elevation={6} sx={{ mt: 3, p: 3, maxWidth: 900, mx: "auto" }}>
                        <Typography variant="h4" align="center" sx={{ mb: 3 }}>
                            Alta de Campaña
                        </Typography>

                        <Grid
                            container
                            spacing={2}
                            sx={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {/* Nombre de la campaña */}
                            <Grid item size={{ xs: 10 }}>
                                <TextField
                                    required
                                    fullWidth
                                    id="nombre_campana"
                                    label="Nombre de la Campaña"
                                    name="nombre_campana"
                                    type="text"
                                    maxLength="100"
                                    value={campaña.nombre_campana}
                                    onChange={handleChange}
                                    error={!isCamposValidos.nombre_campana}
                                    helperText={
                                        !isCamposValidos.nombre_campana && "El nombre no es valido debe tener entre 10 y 100 caracteres."
                                    }
                                />
                            </Grid>
                            {/* Objetivo litros de sangre */}
                            <Grid item size={{ xs: 10 }}>
                                <TextField
                                    required
                                    fullWidth
                                    id="objetivo_litros_campana"
                                    label="Objetivo Litros de Sangre"
                                    name="objetivo_litros_campana"
                                    type="number"
                                    slotProps={{
                                        htmlInput: {
                                            min: 50.0,
                                            max: 1000.0,
                                            step: 2.5,
                                        },
                                    }}
                                    value={campaña.objetivo_litros_campana}
                                    onChange={handleChange}
                                    error={!isCamposValidos.objetivo_litros_campana}
                                    helperText={
                                        !isCamposValidos.objetivo_litros_campana &&
                                        "Como minimo de 50.00 y como maximo de 1000.00."
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
                                        id="fecha_inicio_campana"
                                        name="fecha_inicio_campana"
                                        minDate={dayjs()}
                                        slotProps={{
                                            textField: {
                                                required: true,
                                                error: !isCamposValidos.fecha_inicio_campana,
                                                helperText: !isCamposValidos.fecha_inicio_campana
                                                    ? "La fecha es obligatoria"
                                                    : "",
                                            },
                                        }}
                                        value={
                                            campaña.fecha_inicio_campana
                                                ? dayjs(campaña.fecha_inicio_campana)
                                                : null
                                        }
                                        // Asi es como se manejan los cambios en los DatePickers
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
                                    // Para que el formato de la fecha sea en español
                                    adapterLocale="es"
                                >
                                    <DatePicker
                                        label="Fin de la campaña"
                                        id="fecha_fin_campana"
                                        name="fecha_fin_campana"
                                        // Ponemos que la fecha minima sea la fecha de inicio de la campaña
                                        minDate={
                                            campaña.fecha_inicio_campana
                                                ? dayjs(campaña.fecha_inicio_campana)
                                                : null
                                        }
                                        slotProps={{
                                            textField: {
                                                required: true,
                                                error: !isCamposValidos.fecha_fin_campana,
                                                helperText: !isCamposValidos.fecha_fin_campana
                                                    ? "La fecha es obligatoria"
                                                    : "",
                                            },
                                        }}
                                        value={
                                            campaña.fecha_fin_campana && campaña.fecha_fin_campana >= campaña.fecha_inicio_campana
                                                ? dayjs(campaña.fecha_fin_campana)
                                                : null
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
                                <Typography variant="body1" align="start" sx={{ mb: 1 }}>
                                    ¿Es urgente? {campaña.urgente_campana ? "Sí" : "No"}
                                </Typography>
                                <Switch
                                    checked={campaña.urgente_campana}
                                    name="urgente_campana"
                                    onChange={handleChange}
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

export default AltaCampaña;
