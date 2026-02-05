/**
 * @fileoverview Componente de diálogo modal reutilizable.
 * Muestra alertas y mensajes de confirmación al usuario.
 */
import * as React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

// Transición del dialogo: Desliza el diálogo hacia arriba al aparecer.
// Utiliza React.forwardRef para pasar la referencia al componente Slide subyacente.
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Componente Dialogo.
 * Muestra un cuadro de mensaje emergente con un título, contenido y botón de acción.
 * 
 * @param {object} props - Propiedades del componente.
 * @param {boolean} props.open - Controla si el diálogo está visible (true) u oculto (false).
 * @param {function} props.onClose - Función callback a ejecutar cuando se cierra el diálogo.
 * @param {string} props.dialogSeverity - Severidad de la alerta ('success', 'error', 'info', 'warning'). Determina el color y el título.
 * @param {string} props.dialogMessage - Mensaje de texto a mostrar dentro de la alerta.
 * 
 * @returns {JSX.Element} Un componente Dialog de Material UI configurado.
 */
function Dialogo(props) {
    return (
        <>
            <Dialog
                open={props.open}
                slots={{
                    transition: Transition,
                }}
                onClose={props.onClose}
                disableEscapeKeyDown
                aria-labelledby="result-dialog-title"
            >
                <DialogTitle id="result-dialog-title">
                    {props.dialogSeverity === "success" ? "Operación correcta" : "Error"}
                </DialogTitle>

                <DialogContent>

                    <Alert severity={props.dialogSeverity} variant="filled">
                        {props.dialogMessage}
                    </Alert>

                </DialogContent>

                <DialogActions>
                    <Button variant="contained" onClick={props.onClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Dialogo;