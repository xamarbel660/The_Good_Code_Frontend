import { FormControl, MenuItem, } from '@mui/material';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputLabel from '@mui/material/InputLabel';
import Paper from "@mui/material/Paper";
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
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



function AltaDonaciones() {
    const navigate = useNavigate();

    // Campaña seleccionada
    const [campaña, setCampaña] = useState({
        nombre_campana: "",
        objetivo_litros_campana: 0.00,
        fecha_inicio_campana: "",
        fecha_fin_campana: "",
        urgente_campana: false,
    });

    // Campañas del select
    const [campañas, setCampañas] = useState([]);

    // Donación
    const [donacion, setDonacion] = useState({
        id_campana: 0,
        nombre_donante: "",
        peso_donante: 0.00,
        fecha_donacion: "",
        es_primera_vez: false,
        grupo_sanguineo: "",
        URL_image: "",
    });

    const tiposSanguineos = ["A+", "A-", "B+", "B-", "AB+", "AB-", "0+", "0-"];

    // Validación de los campos
    const [isCamposValidos, setIsCamposValidos] = useState({
        id_campana: true,
        nombre_donante: true,
        peso_donante: true,
        fecha_donacion: true,
        es_primera_vez: true,
        grupo_sanguineo: true,
        URL_image: true,
    });

    const [isUpdating, setIsUpdating] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogSeverity, setDialogSeverity] = useState("success");

    // Crear donación
    useEffect(() => {
        async function fetchCreateDonacion() {
            try {
                const respuesta = await api.post("/donaciones/", donacion);

                setDialogMessage(respuesta.mensaje); // Mensaje
                setDialogSeverity("success"); // Color verde
                setOpenDialog(true); // Abrir el diálogo
            } catch (error) {
                setDialogMessage(error.mensaje || "Error al crear la donación");
                setDialogSeverity("error"); // Color rojo
                setOpenDialog(true); // Abrir el diálogo
            }
            // Pase lo que pase hemos terminado el proceso de actualización
            setIsUpdating(false);
        }

        if (isUpdating) fetchCreateDonacion();
    }, [isUpdating]);

    // Recuperar campañas
    useEffect(() => {
        async function fetchRecuperarCampañas() {
            try {
                const respuesta = await api.get("/campanas/");
                setCampañas(respuesta.datos);
            } catch (error) {
                setDialogMessage(error.mensaje || "Error al recuperar las campañas");
                setDialogSeverity("error"); // Color rojo
                setOpenDialog(true); // Abrir el diálogo
            }
        }

        fetchRecuperarCampañas();
    }, []);

    function handleChange(e) {
        if (e.target.name == "es_primera_vez") {
            setDonacion({ ...donacion, [e.target.name]: e.target.checked });
        } else if (e.target.name == "id_campana") {
            setDonacion({ ...donacion, [e.target.name]: e.target.value });
            setCampaña(campañas.find(campaña => campaña.id_campana == e.target.value));
        } else {
            setDonacion({ ...donacion, [e.target.name]: e.target.value });
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

    function validarDatos() {
        let valido = true;
        let objetoValidacion = {
            id_campana: true,
            nombre_donante: true,
            peso_donante: true,
            fecha_donacion: true,
            es_primera_vez: true,
            grupo_sanguineo: true,
            URL_image: true,
        };

        // Validación del nombre_donante
        if (donacion.id_campana == 0) {
            valido = false;
            objetoValidacion.id_campana = false;
        }

        // Validación del nombre_donante
        if (donacion.nombre_donante.length < 10 || donacion.nombre_donante.length > 100) {
            valido = false;
            objetoValidacion.nombre_donante = false;
        }

        // Validación de la peso_donante
        if (donacion.peso_donante < 50.00 || donacion.peso_donante > 1000.00) {
            valido = false;
            objetoValidacion.peso_donante = false;
        }

        // Validación de la fecha_donacion como requerida
        if (!donacion.fecha_donacion) {
            valido = false;
            objetoValidacion.fecha_donacion = false;
        }

        // Validación de la grupo_sanguineo como requerida
        if (donacion.grupo_sanguineo.length !== 2 && donacion.grupo_sanguineo.length !== 3) {
            valido = false;
            objetoValidacion.grupo_sanguineo = false;
        }

        // Validación de la grupo_sanguineo que este en el array de tiposSanguineos
        if (!tiposSanguineos.includes(donacion.grupo_sanguineo)) {
            valido = false;
            objetoValidacion.grupo_sanguineo = false;
        }

        if (!isValidURL(donacion.URL_image)) {
            valido = false;
            objetoValidacion.URL_image = false;
        }

        // Actualizamos con los campos correctos e incorrectos
        setIsCamposValidos(objetoValidacion);

        return valido;
    }


    const isValidURL = (urlString) => {
        var patronURL = new RegExp(
            // valida protocolo (http o https)
            "^(https?:\\/\\/)?" +
            // valida nombre de dominio
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
            // valida OR dirección ip (v4)
            "((\\d{1,3}\\.){3}\\d{1,3}))" +
            // valida puerto y path
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
            // valida queries
            "(\\?[;&a-z\\d%_.~+=-]*)?" +
            // valida fragment locator
            "(\\#[-a-z\\d_]*)?$",
            "i"
        );
        return !!patronURL.test(urlString);
    };

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
                            Alta de Donación
                        </Typography>

                        <Grid
                            container
                            spacing={2}
                            sx={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            {/* Select Campaña */}
                            <Grid item size={{ xs: 10 }}>
                                <FormControl fullWidth error={!isCamposValidos.id_campana}>
                                    <InputLabel id="id_campana">Campaña</InputLabel>
                                    <Select
                                        labelId="id_campana"
                                        id="id_campana"
                                        name="id_campana"
                                        value={donacion.id_campana}
                                        label="Campaña"
                                        onChange={handleChange}
                                    >
                                        {campañas.map(campañas =>
                                            <MenuItem
                                                key={campañas.id_campana}
                                                value={campañas.id_campana}>
                                                {campañas.nombre_campana}
                                            </MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Nombre Donante */}
                            <Grid item size={{ xs: 10 }}>
                                <TextField
                                    required
                                    fullWidth
                                    id="nombre_donante"
                                    label="Nombre del Donante"
                                    name="nombre_donante"
                                    type="text"
                                    slotProps={{
                                        htmlInput: {
                                            maxLength: 100,
                                        }
                                    }}
                                    value={donacion.nombre_donante}
                                    onChange={handleChange}
                                    error={!isCamposValidos.nombre_donante}
                                    helperText={
                                        !isCamposValidos.nombre_donante && "El nombre debe tener entre 10 y 100 caracteres."
                                    }
                                />
                            </Grid>

                            {/* Peso del Donante */}
                            <Grid item size={{ xs: 10 }}>
                                <TextField
                                    required
                                    fullWidth
                                    id="peso_donante"
                                    label="Peso del Donante"
                                    name="peso_donante"
                                    type="number"
                                    slotProps={{
                                        htmlInput: {
                                            max: 1000.00,
                                            min: 50.00,
                                            step: 2.5,
                                        }
                                    }}
                                    value={donacion.peso_donante}
                                    onChange={handleChange}
                                    error={!isCamposValidos.peso_donante}
                                    helperText={
                                        !isCamposValidos.peso_donante && "Como minimo el peso debe de ser de 50.00KG y como maximo de 1000.00KG."
                                    }
                                />
                            </Grid>

                            {/* Fecha de la donacion */}
                            <Grid item size={{ xs: 5 }}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                    adapterLocale="es"
                                >
                                    <DatePicker
                                        label="Fecha de la Donación"
                                        name="fecha_donacion"
                                        disabled={donacion.id_campana == 0}
                                        maxDate={dayjs(campaña.fecha_fin_campana)}
                                        minDate={dayjs(campaña.fecha_inicio_campana)}
                                        slotProps={{
                                            textField: {
                                                required: true,
                                                error: !isCamposValidos.fecha_donacion,
                                                helperText: !isCamposValidos.fecha_donacion ? "La fecha es obligatoria" : "",
                                            },
                                        }}
                                        value={
                                            donacion.fecha_donacion ? dayjs(donacion.fecha_donacion) : null
                                        }
                                        onChange={(newValue) =>
                                            setDonacion({
                                                ...donacion,
                                                fecha_donacion: newValue.format("YYYY-MM-DD"),
                                            })
                                        }
                                    />
                                </LocalizationProvider>

                            </Grid>

                            {/* Grupo sanguineo */}
                            <Grid item size={{ xs: 5 }}>
                                <TextField
                                    required
                                    id="grupo_sanguineo"
                                    label="Grupo Sangíneo"
                                    name="grupo_sanguineo"
                                    type="text"
                                    slotProps={{
                                        htmlInput: {
                                            maxLength: 3,
                                        }
                                    }}
                                    value={donacion.grupo_sanguineo}
                                    onChange={handleChange}
                                    error={!isCamposValidos.grupo_sanguineo}
                                    helperText={
                                        !isCamposValidos.grupo_sanguineo && "Grupo sanguíneo erroneo (A+, AB-, 0+, etc...)."
                                    }
                                />
                            </Grid>

                            {/* URL Imagen */}
                            <Grid item size={{ xs: 10 }}>
                                <TextField
                                    required
                                    fullWidth
                                    id="URL_image"
                                    label="Url de la imagen"
                                    name="URL_image"
                                    type="text"
                                    value={donacion.URL_image}
                                    onChange={handleChange}
                                    error={!isCamposValidos.URL_image}
                                    helperText={
                                        !isCamposValidos.URL_image && "Url de la imagen es obligatoria."
                                    }
                                />
                            </Grid>

                            {/* ¿Primera vez donando? */}
                            <Grid item size={{ xs: 10 }}>
                                <Typography variant="body1" align="start" sx={{ mb: 1, }}>
                                    ¿Primera vez donando? {donacion.es_primera_vez ? "Sí" : "No"}
                                </Typography>
                                <Switch
                                    checked={donacion.es_primera_vez}
                                    name="es_primera_vez"
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

export default AltaDonaciones;