import DeleteIcon from "@mui/icons-material/Delete";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import { FormControl, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useEffect, useState } from "react";
import api from "../utils/api.js";
import Dialogo from "./Dialogo.jsx";

function ListadoDonacionesParametrizado() {
  // Campaña seleccionada
  /* const [campaña, setCampaña] = useState({
    nombre_campana: "",
    objetivo_litros_campana: 0.0,
    fecha_inicio_campana: "",
    fecha_fin_campana: "",
    urgente_campana: false,
  }); */

  // Campañas del select
  const [campañas, setCampañas] = useState([]);

  // Donación
  const [donacion, setDonacion] = useState({
    id_campana: 0,
    nombre_donante: "",
    peso_donante_min: -1,
    peso_donante_max: -1,
    fecha_donacion_min: "",
    fecha_donacion_max: "",
    grupo_sanguineo: "",
  });

  const campaña = campañas.find(c => c.id_campana == donacion.id_campana) || {
    nombre_campana: "",
    objetivo_litros_campana: 0.00,
    fecha_inicio_campana: "",
    fecha_fin_campana: "",
    urgente_campana: false,
  };

  const [isUpdating, setIsUpdating] = useState(false);
  const [datosRecuperados, setDatosRecuperados] = useState([]);
  const [error, setError] = useState(null);

  // Para el dialogo
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSeverity, setDialogSeverity] = useState("success");

  // Recuperar donaciones con filtro
  useEffect(() => {
    async function fetchRecuperarDonaciones() {
      try {
        const respuesta = await api.get(
          `/donaciones?id_campana=${donacion.id_campana == 0 ? "" : donacion.id_campana}&nombre_donante=${donacion.nombre_donante}&peso_donante_min=${donacion.peso_donante_min == -1 ? "" : donacion.peso_donante_min}&peso_donante_max=${donacion.peso_donante_max == -1 ? "" : donacion.peso_donante_max}&fecha_donacion_min=${donacion.fecha_donacion_min}&fecha_donacion_max=${donacion.fecha_donacion_max}&grupo_sanguineo=${donacion.grupo_sanguineo}`,
        );
        setDatosRecuperados(respuesta.datos);
      } catch (error) {
        console.error("Error al crear el director:", error);
      }
      // Pase lo que pase hemos terminado el proceso de actualización
      setIsUpdating(false);
    }

    if (isUpdating) fetchRecuperarDonaciones();
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

  // Cambio de valor en el formulario
  function handleChange(e) {
    if (e.target.name == "es_primera_vez") {
      setDonacion({ ...donacion, [e.target.name]: e.target.checked });
    } else if (e.target.name == "id_campana") {
      setDonacion({ ...donacion, [e.target.name]: e.target.value });
    } else {
      setDonacion({ ...donacion, [e.target.name]: e.target.value });
    }
  }

  function handleClick() {
    // evitar envíos duplicados por pulsar el botón tras el mensaje de inserción correcta
    if (isUpdating) return;
    setIsUpdating(true);
  }

  function handleClean() {
    setDonacion({
      id_campana: 0,
      nombre_donante: "",
      peso_donante_min: -1,
      peso_donante_max: -1,
      fecha_donacion_min: "",
      fecha_donacion_max: "",
      grupo_sanguineo: "",
    });
  }

  // Borrado de una campaña
  async function handleDelete(id_campana) {
    try {
      await api.delete("/campanas/" + id_campana);

      //Buscamos la campaña borrada y la quitamos de los datos
      const datos_nuevos = datosRecuperados.filter(
        (campana) => campana.id_campana != id_campana,
      );
      // Actualizamos los datos de campañas sin la que hemos borrado
      setDatosRecuperados(datos_nuevos);
      // Y no tenemos errores
      setError(null);

      setDialogMessage("Borrado con exito"); // Mensaje del dialogo
      setDialogSeverity("success"); // Color de la alerta
      setOpenDialog(true); // Abrir el diálogo
    } catch (error) {
      setError(error.mensaje || "No se pudo conectar al servidor");
      setDatosRecuperados([]);

      setDialogMessage(error.mensaje || "Error al borrar la donación");
      setDialogSeverity("error");
      setOpenDialog(true);
    }
  }

  // Cerrando el dialogo
  function handleDialogClose() {
    setOpenDialog(false);
  }

  // Mensaje de error
  if (error != null) {
    return (
      <>
        <Typography variant="h5" align="center" sx={{ mt: 10 }}>
          {error}
        </Typography>
      </>
    );
  }



  // Columnas de la tabla
  const columns = [
    { field: 'id_donacion', headerName: 'ID', width: 70 },
    {
      field: 'nombre_campana',
      headerName: 'Nombre Campaña',
      width: 200,
      // Usamos valueGetter para entrar en el objeto anidado
      valueGetter: (value, row) => {
        // "row" es la fila completa. Entramos al alias y luego al nombre.
        return row.id_campana_campaña.nombre_campana || "Sin campaña";
      }
    },
    {
      field: 'nombre_donante',
      headerName: 'Nombre Donante',
      align: 'center',
      headerAlign: "center",
      width: 200,
    },
    {
      field: 'peso_donante',
      headerName: 'Peso Donante',
      align: 'center',
      headerAlign: "center",
      width: 140,
    },
    {
      field: 'fecha_donacion',
      headerName: 'Fecha Donación',
      align: 'center',
      headerAlign: "center",
      width: 150,
      renderCell: (params) => {
        // Formato de fecha que se pueda leer
        return new Date(params.value).toLocaleDateString("es-ES");
      },
    },
    {
      field: 'es_primera_vez',
      headerName: '¿Primera Vez?',
      align: 'center',
      headerAlign: "center",
      width: 123,
      renderCell: (params) => {
        return params.value ? (
          <Chip label="Sí" color="success" size="small" />
        ) : (
          <Chip label="No" color="default" size="small" variant="outlined" />
        );
      },
    },
    {
      field: 'grupo_sanguineo',
      headerName: 'Grupo Sanguíneo',
      align: 'center',
      headerAlign: "center",
      width: 140,
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      headerAlign: "center",
      width: 225,
      sortable: false, //para que no se pueda ordenar la columna
      filterable: false, //para que no se pueda filtrar la columna
      renderCell: (params) => {
        // 'params' contiene toda la info de la fila.
        // params.id es el ID que definimos con getRowId
        return (
          <>
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
                onClick={() => handleDelete(params.id)}
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
                href={`/donaciones/edit/${params.id}`}
              >
                <EditSquareIcon />
              </Button>
            </Tooltip>
          </>
        );
      },
    },
  ];

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
              Alta de Donación
            </Typography>

            <Grid
              container
              spacing={2}
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Select Campaña */}
              <Grid item size={{ xs: 10 }}>
                <FormControl fullWidth>
                  <InputLabel id="campaña">Campaña</InputLabel>
                  <Select
                    labelId="campaña"
                    id="campaña"
                    name="id_campana"
                    value={donacion.id_campana}
                    label="campaña"
                    onChange={handleChange}
                  >
                    {campañas.map((campañas) => (
                      <MenuItem
                        key={campañas.id_campana}
                        value={campañas.id_campana}
                      >
                        {campañas.nombre_campana}
                      </MenuItem>
                    ))}
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
                      maxLength: 50,
                    },
                  }}
                  value={donacion.nombre_donante}
                  onChange={handleChange}
                />
              </Grid>

              {/* Peso del Donante Minimo*/}
              <Grid item size={{ xs: 10 }}>
                <TextField
                  required
                  fullWidth
                  id="peso_donante_min"
                  label="Peso del Donante Min"
                  name="peso_donante_min"
                  type="number"
                  slotProps={{
                    htmlInput: {
                      max: 1000.00,
                      min: 50.00,
                      step: 2.5,
                    },
                  }}
                  value={donacion.peso_donante_min == -1 ? "" : donacion.peso_donante_min}
                  onChange={handleChange}
                />
              </Grid>

              {/* Peso del Donante Maximo*/}
              <Grid item size={{ xs: 10 }}>
                <TextField
                  required
                  fullWidth
                  id="peso_donante_max"
                  label="Peso del Donante Max"
                  name="peso_donante_max"
                  type="number"
                  slotProps={{
                    htmlInput: {
                      max: 1000.00,
                      min: 50.00,
                      step: 2.5,
                    },
                  }}
                  value={donacion.peso_donante_max == -1 ? "" : donacion.peso_donante_max}
                  onChange={handleChange}
                />
              </Grid>

              {/* Fecha minima de donacion */}
              <Grid item size={{ xs: 10 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="es"
                >
                  <DatePicker
                    label="Fecha minima de Donación"
                    name="fecha_donacion_min"
                    maxDate={campaña.fecha_fin_campana ? dayjs(campaña.fecha_fin_campana) : null}
                    minDate={campaña.fecha_inicio_campana ? dayjs(campaña.fecha_inicio_campana) : null}
                    slotProps={{
                      textField: {
                        required: true,
                      },
                    }}
                    value={
                      donacion.fecha_donacion_min
                        ? dayjs(donacion.fecha_donacion_min)
                        : null
                    }
                    onChange={(newValue) =>
                      setDonacion({
                        ...donacion,
                        fecha_donacion_min: newValue.format("YYYY-MM-DD"),
                      })
                    }
                  />
                </LocalizationProvider>
              </Grid>

              {/* Fecha maxima de donacion */}
              <Grid item size={{ xs: 10 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="es"
                >
                  <DatePicker
                    label="Fecha maxima de Donación"
                    name="fecha_donacion_max"
                    maxDate={campaña.fecha_fin_campana ? dayjs(campaña.fecha_fin_campana) : null}
                    minDate={campaña.fecha_inicio_campana ? dayjs(campaña.fecha_inicio_campana) : null}
                    slotProps={{
                      textField: {
                        required: true,
                      },
                    }}
                    value={
                      donacion.fecha_donacion_max
                        ? dayjs(donacion.fecha_donacion_max)
                        : null
                    }
                    onChange={(newValue) =>
                      setDonacion({
                        ...donacion,
                        fecha_donacion_max: newValue.format("YYYY-MM-DD"),
                      })
                    }
                  />
                </LocalizationProvider>
              </Grid>

              {/* Grupo sanguineo */}
              <Grid item size={{ xs: 10 }}>
                <TextField
                  required
                  id="grupo_sanguineo"
                  label="Grupo Sangíneo"
                  name="grupo_sanguineo"
                  type="text"
                  slotProps={{
                    htmlInput: {
                      maxLength: 3,
                    },
                  }}
                  value={donacion.grupo_sanguineo}
                  onChange={handleChange}
                />
              </Grid>

              {/* Botón de aceptar y limpiar */}
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
                  onClick={handleClean}
                >
                  Limpiar
                </Button>
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

      {/* Tabla de donaciones */}
      <DataGrid
        rows={datosRecuperados}
        columns={columns}
        getRowId={(datos) => datos.id_donacion} // Especificamos el campo que actua como ID unico
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />

      {/* Dialogo para cuando se borra una donacion */}
      <Dialogo
        open={openDialog}
        onClose={() => handleDialogClose()}
        dialogSeverity={dialogSeverity}
        dialogMessage={dialogMessage}
      />
    </>
  );
}

export default ListadoDonacionesParametrizado;
