/**
 * @fileoverview Componente que muestra el listado completo de donaciones.
 * Presenta una tabla con la información principal de cada donación y opciones de gestión.
 */
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

/**
 * Componente ListadoDonaciones.
 * Visualiza todas las donaciones en un DataGrid.
 * Muestra información como campaña asociada, donante, peso y fecha.
 * 
 * @returns {JSX.Element} Vista de tabla de donaciones.
 */
function ListadoDonaciones() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);

  // Para el dialogo
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSeverity, setDialogSeverity] = useState("success");

  /**
   * Efecto de carga inicial.
   * Recupera todas las donaciones del servidor.
   */
  useEffect(() => {
    async function fetchDonaciones() {
      try {
        const respuesta = await api.get("/donaciones/");

        // Actualizamos los datos de las donaciones
        setDatos(respuesta.datos);
        // Y no tenemos errores
        setError(null);
      } catch (e) {
        setError(e.mensaje || "No se pudo conectar al servidor");
        setDatos([]);
      }
    }

    fetchDonaciones();
  }, []);

  /**
   * Elimina una donación específica.
   * 
   * @param {number} id_donacion - ID de la donación a eliminar.
   */
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

  /**
   * Definición de columnas para el DataGrid.
   * Incluye getters de valor para datos anidados (campaña) y renderizado condicional.
   */
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
      <Typography variant="h4" align="center" sx={{ my: 3 }}>Listado de Donaciones</Typography>

      <DataGrid
        rows={datos}
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

      {/* Dialogo para cuando se borra una donación */}
      <Dialogo
        open={openDialog}
        onClose={() => handleDialogClose()}
        dialogSeverity={dialogSeverity}
        dialogMessage={dialogMessage}
      />

    </>
  );
}

export default ListadoDonaciones;
