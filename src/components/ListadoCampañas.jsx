import DeleteIcon from '@mui/icons-material/Delete';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Typography from "@mui/material/Typography";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import api from "../utils/api.js";
import Dialogo from "./Dialogo.jsx";
import { Grid } from '@mui/material';

function ListadoCampañas() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);

  // Para el dialogo
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSeverity, setDialogSeverity] = useState("success");

  //Recuperación de todas las campañas
  useEffect(() => {
    async function fetchCampañas() {
      try {
        const respuesta = await api.get("/campanas/");

        // Actualizamos los datos de las campañas
        setDatos(respuesta.datos);
        // Y no tenemos errores
        setError(null);
      } catch (e) {
        setError(e.mensaje || "No se pudo conectar al servidor");
        setDatos([]);
      }
    }

    fetchCampañas();
  }, []);

  //Borrado de una campaña
  async function handleDelete(id_campana) {
    try {
      await api.delete("/campanas/" + id_campana);

      //Buscamos la campaña borrada y la quitamos de los datos
      const datos_nuevos = datos.filter(campana => campana.id_campana != id_campana);
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

  //Columnas para el DataGrid
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
    <Grid>
      <Typography variant="h4" align="center" sx={{ my: 3 }}>Listado de Campañas</Typography>

      <DataGrid
        rows={datos}
        columns={columns}
        getRowId={(datos) => datos.id_campana} // Especificamos el campo que actua como ID unico
        initialState={{
          pagination: {
            // Numero de datos por pagina
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
    </Grid>


    </>
  );
}

export default ListadoCampañas;
