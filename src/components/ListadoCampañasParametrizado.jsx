import DeleteIcon from "@mui/icons-material/Delete";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
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

function ListadoCampañasParametrizadas() {
  const [campaña, setCampaña] = useState({
    nombre_campana: "",
    objetivo_litros_campana_min: -1,
    objetivo_litros_campana_max: -1,
    fecha_inicio_campana: "",
    fecha_fin_campana: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);

  // Para el dialogo
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSeverity, setDialogSeverity] = useState("success");

  useEffect(() => {
    async function fetchRecuperarCampañas() {
      try {
        const respuesta = await api.get(
          `/campanas?nombre_campana=${campaña.nombre_campana}&objetivo_litros_campana_min=${campaña.objetivo_litros_campana_min == -1 ? "" : campaña.objetivo_litros_campana_min}&objetivo_litros_campana_max=${campaña.objetivo_litros_campana_max == -1 ? "" : campaña.objetivo_litros_campana_max}&fecha_inicio_campana=${campaña.fecha_inicio_campana}&fecha_fin_campana=${campaña.fecha_fin_campana}`, 
        // &urgente_campana=${campaña.urgente_campana}
        );
        setDatos(respuesta.datos);
      } catch (error) {
        console.error("Error al recuperar las campañas:", error);
      }
      // Pase lo que pase hemos terminado el proceso de actualización
      setIsUpdating(false);
    }

    if (isUpdating) fetchRecuperarCampañas();
  }, [isUpdating]);

  // Cambio de valor en el formulario
  function handleChange(e) {
    setCampaña({ ...campaña, [e.target.name]: e.target.value });
  }

  function handleClick() {
    // evitar envíos duplicados por pulsar el botón tras el mensaje de inserción correcta
    if (isUpdating) return;
    setIsUpdating(true);
  }

  // Borrado de una campaña
  async function handleDelete(id_campana) {
    try {
      await api.delete("/campanas/" + id_campana);

      //Buscamos la campaña borrada y la quitamos de los datos
      const datos_nuevos = datos.filter(
        (campana) => campana.id_campana != id_campana,
      );
      // Actualizamos los datos de campañas sin la que hemos borrado
      setDatos(datos_nuevos);
      // Y no tenemos errores
      setError(null);

      setDialogMessage("Borrado con exito"); // Mensaje del dialogo
      setDialogSeverity("success"); // Color de la alerta
      setOpenDialog(true); // Abrir el diálogo
    } catch (error) {
      setError(error.mensaje || "No se pudo conectar al servidor");
      setDatos([]);

      setDialogMessage(error.mensaje || "Error al borrar la campaña");
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
    { field: 'id_campana', headerName: 'ID', width: 70 },
    {
      field: 'nombre_campana',
      headerName: 'Nombre Campaña',
      width: 250,
    },
    {
      field: 'objetivo_litros_campana',
      headerName: 'Objetivo Litros Sangre',
      align: 'center',
      headerAlign: "center",
      width: 200,
    },
    {
      field: 'fecha_inicio_campana',
      headerName: 'Fecha Inicio',
      align: 'center',
      headerAlign: "center",
      width: 150,
      renderCell: (params) => {
        // Formato de fecha que se pueda leer
        return new Date(params.value).toLocaleDateString("es-ES");
      },
    },
    {
      field: 'fecha_fin_campana',
      headerName: 'Fecha Fin',
      align: 'center',
      headerAlign: "center",
      width: 150,
      renderCell: (params) => {
        // Formato de fecha que se pueda leer
        return new Date(params.value).toLocaleDateString("es-ES");
      },
    },
    {
      field: 'urgente_campana',
      headerName: 'Urgente',
      align: 'center',
      headerAlign: "center",
      width: 100,
      renderCell: (params) => {
        // params.value (true/false)
        return params.value ? (
          <Chip label="Sí" color="success" size="small" />
        ) : (
          <Chip label="No" color="default" size="small" variant="outlined" />
        );
      },
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
              title="Borrar Campaña"
              arrow
              // para no poder copiar el texto que tiene el tooltip
              disableInteractive
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: 'offset',
                      //distancia entre el tooltip y el boton
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
              title="Editar Campaña"
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
                href={`/campañas/edit/${params.id}`}
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
          <Paper elevation={6} sx={{ my: 3, p: 3, maxWidth: 900, mx: "auto" }}>
            <Typography variant="h4" align="center" sx={{ mb: 3 }}>
              Listado de Campañas Parametrizado
            </Typography>

            <Grid
              container
              spacing={3}
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
                />
              </Grid>

              {/* Objetivo litros de sangre minimo y maximo */}
              <Grid
                item
                size={{ xs: 10 }}
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                <TextField
                  required
                  id="objetivo_litros_campana_min"
                  label="Objetivo Litros de Sangre Minimo"
                  name="objetivo_litros_campana_min"
                  type="number"
                  slotProps={{
                    htmlInput: {
                      max: 1000.00,
                      min: 50,
                      step: 2.5,
                    },
                  }}
                  value={campaña.objetivo_litros_campana_min == -1 ? null:campaña.objetivo_litros_campana_min}
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="objetivo_litros_campana_max"
                  label="Objetivo Litros de Sangre Máximo"
                  name="objetivo_litros_campana_max"
                  type="number"
                  slotProps={{
                    htmlInput: {
                      max: 1000.00,
                      min: 50,
                      step: 2.5,
                    },
                  }}
                  value={campaña.objetivo_litros_campana_max == -1 ? null:campaña.objetivo_litros_campana_max}
                  onChange={handleChange}
                />
              </Grid>

              {/* Fecha de inicio y fin de la campaña */}
              <Grid
                item
                size={{ xs: 10 }}
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="es"
                >
                  <DatePicker
                    label="Inicio de la campaña"
                    name="fecha_inicio_campana"
                    sx={{ mx: 2 }}
                    slotProps={{
                      textField: {
                        required: true,
                      },
                    }}
                    value={
                      campaña.fecha_inicio_campana
                        ? dayjs(campaña.fecha_inicio_campana)
                        : null
                    }
                    onChange={(newValue) =>
                      setCampaña({
                        ...campaña,
                        fecha_inicio_campana: newValue.format("YYYY-MM-DD"),
                      })
                    }
                  />
                </LocalizationProvider>

                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="es"
                >
                  <DatePicker
                    label="Fin de la campaña"
                    name="fecha_fin_campana"
                    sx={{ mx: 2 }}
                    minDate={
                      campaña.fecha_inicio_campana
                        ? dayjs(campaña.fecha_inicio_campana)
                        : null
                    }
                    slotProps={{
                      textField: {
                        required: true,
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
                  Buscar
                </Button>
              </Grid>

            </Grid>

          </Paper>
        </Grid>
      </Grid>

      {/* Tabla de campañas */}
      <DataGrid
        rows={datos}
        columns={columns}
        getRowId={(datos) => datos.id_campana} // Especificamos el campo que actua como ID unico
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />

      {/* Dialogo para cuando se borra una campaña */}
      <Dialogo
        open={openDialog}
        onClose={() => handleDialogClose()}
        dialogSeverity={dialogSeverity}
        dialogMessage={dialogMessage}
      />
    </>
  );
}

export default ListadoCampañasParametrizadas;
