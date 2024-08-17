import { Button, Divider, Modal, ModalDialog } from "@mui/joy"
import { DialogActions, DialogContent, DialogTitle } from "@mui/material"


interface IConfirmationDialog {
    open: boolean
    title?: string
    content?: string
    onConfirm: () => void
    onCancel: () => void
}

export default function ConfirmationDialog({
    open,
    title = "Requiere confirmación",
    content = "¿Estas seguro?",
    onConfirm,
    onCancel
}: IConfirmationDialog) {
    return (
        <>
            <Modal open={open} onClose={onCancel}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>{title}</DialogTitle>
                    <Divider></Divider>
                    <DialogContent>{content}</DialogContent>
                    <DialogActions>
                        <Button variant="plain" color="neutral" onClick={onCancel}>Cancelar</Button>
                        <Button variant="solid" color="danger" onClick={onConfirm}>Eliminar</Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </>
    )
}