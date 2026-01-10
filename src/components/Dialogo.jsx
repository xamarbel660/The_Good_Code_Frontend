import * as React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

//Trasicion del dialogo
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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