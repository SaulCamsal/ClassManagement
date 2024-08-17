import { useState } from "react";
import Navbar2 from "../../components/navbar/Navbar2";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IPagos } from "../../components/Payments/IPagos";
import { UsePaymentData } from '../../hooks/UsePaymentData';
import ConfirmationDialog from "../../components/confirmationDialog";
import { Box } from "@mui/material";
import { AddPayment } from "../../components/Payments/AddPayment";

export function Suscription() {

    const { filteredPayments, putPayments, postPayments, deletePayments, setSearchFilter } = UsePaymentData()
    const [showNew, setShowNew] = useState<boolean>(false)
    const [selectedPayment, setSelectedPayment] = useState<IPagos | null>(null)
    const [open, setOpen] = useState<boolean>(false)


    const handleDelete = (pago: IPagos) => {
        setShowNew(false)
        setOpen(true)
        setSelectedPayment(pago)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const { alumno, clase, pago, fechaPago } = Object.fromEntries(formData.entries())

        const bodyData = {
            id: selectedPayment?.id,
            alumno,
            clase,
            pago,
            fechaPago
        }

        setShowNew(false)
        if (selectedPayment) {
            putPayments(bodyData)
            return
        }
        delete bodyData.id
        postPayments(bodyData)
    }

    const handleUpdate = (pago: IPagos) => {
        setSelectedPayment(pago)
        setShowNew(true)
    }

    const handleCancelUpdate = () => {
        setShowNew(false)
        setSelectedPayment(null)
    }

    const handleAddPayment = () => {
        setShowNew(true)
        setSelectedPayment(null)
    }
    const handleSearchChange = (text: string) => {
        setSearchFilter(text)
    }

    const handleConfirmDelete = async () => {
        deletePayments(selectedPayment?.id as string)
        setOpen(false)
        setSelectedPayment(null)
    }

    const handleCancelDelete = () => {
        setOpen(false)
        setSelectedPayment(null)
    }


    //Columns
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'studentID', headerName: 'Student ID', width: 130 , editable: true},
        { field: 'classID', headerName: 'Class ID', width: 130, editable: true },
        { field: 'Pago', headerName: 'Monto $', type: 'number', width: 90, editable: true},
        { field: 'fechaPago', headerName: 'Fecha de Pago', width: 160, editable: true/*, type: 'date' */}
    ];

    const rows = filteredPayments.map((pagos: IPagos) => (
        {
            id: pagos.id,
            studentID: pagos.alumno,
            classID: pagos.clase,
            Pago: '$' + pagos.pago,
            fechaPago: pagos.fechaPago,
            Button: ''
        }
    ))

    return (
        <>
            <Navbar2 />
            {/* confirm */}
            <ConfirmationDialog
                open={open}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
            <p/>
            <h1 >Pagos realizados</h1>

            {/* BUTTONS */}
            <Box
                sx={{
                    marginTop: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around'
                }}
            >
                {/* FILTER*/}
                <Box onSubmit={handleSubmit}>
                    <section className="ClassSection" key={selectedPayment?.id}>
                        {showNew ? (
                            <AddPayment
                                alumno={selectedPayment?.alumno || ""}
                                clase={selectedPayment?.clase || ""}
                                costo={0 /*selectedPayment?.pago.toString() || ''*/}
                                fechaDePago={selectedPayment?.fechaPago || ""}
                                buttonText={selectedPayment ? "Actualizar" : "Guardar"}
                                onSubmit={handleSubmit}
                                onCancel={handleCancelUpdate}
                            ></AddPayment>
                        ) : (
                            <button onClick={handleAddPayment}>Add Class</button>
                        )}
                    </section>

                    <section className="searchClassSection">
                        <></>
                    </section>
                </Box>
            </Box>


            {/* Table */}
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    editMode="row"
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    processRowUpdate={(updatedRow, originalRow) =>
                        handleUpdate(updatedRow)
                      }
                />
                
            </div>
        </>
    )
}