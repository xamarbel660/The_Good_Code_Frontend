import { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
//Comentado porque se esta usando otra importacion similar para modificar el estilo de la tabla
// import TableCell from "@mui/material/TableCell";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from '@mui/material/Card';
import Typography from "@mui/material/Typography";

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditSquareIcon from '@mui/icons-material/EditSquare';

import api from "../utils/api.js";

import Tooltip from '@mui/material/Tooltip';

import Dialogo from "./Dialogo.jsx";

import { DataGrid } from '@mui/x-data-grid';

import Chip from '@mui/material/Chip';

// Estilo para la tabla, seguir mirando la documentacion de MUI
//Se pone afuera por que si no da error de renderizado
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function ListadoDonaciones() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);

  // Para el dialogo
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSeverity, setDialogSeverity] = useState("success");

  //Recuperación de todas las donaciones
  useEffect(() => {
    async function fetchDonaciones() {
      try {
        const respuesta = await api.get("/donaciones/");

        // Actualizamos los datos de directores
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

  const columns = [
    { field: 'id_donacion', headerName: 'ID', width: 80 },
    {
      field: 'nombre_campana',
      headerName: 'Nombre Campaña',
      width: 200,
      // Usamos valueGetter para entrar en el objeto anidado
      valueGetter: (value, row) => {
        // "row" es la fila completa. Entramos al alias y luego al nombre.
        // El "?." es por seguridad, por si alguna donación viene sin campaña.
        return row.id_campana_campaña?.nombre_campana || 'Sin campaña';
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
      width: 150,
    },
    {
      field: 'fecha_donacion',
      headerName: 'Fecha Donación',
      align: 'center',
      headerAlign: "center",
      width: 150,
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
      width: 150,
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
                href="/campañas/new"
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
      <Typography variant="h4" align="center" sx={{ my: 3, mt: 11 }}>Listado de Donaciones</Typography>

      {/*<TableContainer component={Card}>
        <Table stickyHeader aria-label="Tabla de Campañas">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell align="center">Objetivo Litros Sangre</StyledTableCell>
              <StyledTableCell align="center">Fecha Inicio</StyledTableCell>
              <StyledTableCell align="center">Fecha Fin</StyledTableCell>
              <StyledTableCell align="center">Campaña Urgente</StyledTableCell>
              <StyledTableCell align="center">Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos.map((row) => (
              <TableRow key={row.id_campana}>
                <TableCell>{row.nombre_campana}</TableCell>
                <TableCell align="center">{row.objetivo_litros_campana}</TableCell>
                <TableCell align="center">{row.fecha_inicio_campana}</TableCell>
                <TableCell align="center">{row.fecha_fin_campana}</TableCell>
                <TableCell align="center">{row.urgente_campana ? <Typography variant="h6" color="success">Sí</Typography> : <Typography variant="h6" color="error">No</Typography>}</TableCell>
                <TableCell>
                  <Tooltip
                    title="Borrar Campaña"
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
                      onClick={() => handleDelete(row.id_campana)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

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

export default ListadoDonaciones;
