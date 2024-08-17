import { useState } from "react";
import Navbar2 from "../../components/navbar/Navbar2";
import { UseClassData } from "../../hooks/UseClassData";
import { IClass } from "../../components/classes/IClass";
import { Card, CardContent, IconButton, Typography, Button } from "@mui/joy";
import { Box } from "@mui/material";
import { AddClass } from "../../components/classes/AddClass";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ConfirmationDialog from "../../components/confirmationDialog";
import EditIcon from '@mui/icons-material/Edit';



export function Classes() {

    //import from custom hook UseClassData
    const { filteredClasses, putClasses, postClasses, deleteClasses, setSearchFilter } = UseClassData()

    const [showNew, setShowNew] = useState<boolean>(false)
    const [selectedClass, setSelectedClass] = useState<IClass | null>(null)
    const [open, setOpen] = useState<boolean>(false)

    const handleDelete = (clase: IClass) => {
        setShowNew(false)
        setOpen(true)
        setSelectedClass(clase)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const { nombre, costo } = Object.fromEntries(formData.entries())

        const bodyData = {
            id: selectedClass?.id,
            nombre,
            costo
        }

        setShowNew(false)
        if (selectedClass) {
            putClasses(bodyData)
            return
        }
        delete bodyData.id
        postClasses(bodyData)
    }

    const handleUpdate = (clase: IClass) => {
        setSelectedClass(clase)
        setShowNew(true)
    }

    const handleCancelUpdate = () => {
        setShowNew(false)
        setSelectedClass(null)
    }

    const handleAddClass = () => {
        setShowNew(true)
        setSelectedClass(null)
    }
    const handleSearchChange = (text: string) => {
        setSearchFilter(text)
    }

    const handleConfirmDelete = async () => {
        deleteClasses(selectedClass?.id as string)
        setOpen(false)
        setSelectedClass(null)
    }

    const handleCancelDelete = () => {
        setOpen(false)
        setSelectedClass(null)
    }


    return (
        <>
            {/* NAVBAR */}
            <Navbar2 ></Navbar2>
            {/* confirm */}
            <ConfirmationDialog
                open={open}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
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
                    <section className="ClassSection">
                        {showNew ? (
                            <AddClass
                                nombre={selectedClass?.nombre || ""}
                                costo={selectedClass?.costo || ""}
                                buttonText={selectedClass ? "Actualizar" : "Guardar"}
                                onSubmit={handleSubmit}
                                onCancel={handleCancelUpdate}
                            ></AddClass>
                        ) : (
                            <button onClick={handleAddClass}>Add Class</button>
                        )}
                    </section>

                    <section className="searchClassSection">
                        <></>
                    </section>
                </Box>
            </Box>

            {/* CARDS */}
            <Box
                sx={{
                    marginTop: 1,
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    border: 'deepskyblue',
                    borderBlockStyle: '-moz-initial',
                    gap: '5px',
                    overflow: 'auto'
                }}
            >
                {filteredClasses.map((clase: IClass) => (
                    <div key={clase.id} >
                        <Card sx={{ Width: 1020, minWidth: 350, minHeight: 100 }}>
                            <div >
                                <Typography level="title-lg" sx={{ alignContent: "flex-start" }}>{clase.nombre}</Typography>
                                <IconButton
                                    aria-label="card of classes's info"
                                    variant="plain"
                                    color="neutral"
                                    size="sm"
                                    sx={{ position: 'absolute', top: '0.875rem', right: '2.5rem' }}
                                >
                                    <EditIcon
                                        onClick={() => handleUpdate(clase)}
                                    />
                                </IconButton>
                                <IconButton
                                    aria-label="card of classes's info"
                                    variant="plain"
                                    color="neutral"
                                    size="sm"
                                    sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
                                >
                                    <RemoveCircleOutlineIcon
                                        onClick={() => handleDelete(clase)}
                                    />
                                </IconButton>
                            </div>
                            <CardContent orientation="horizontal">
                                <div>
                                    <Typography fontSize="lg" fontWeight="lg" >$ {clase.costo}</Typography>
                                    <Typography fontSize="lg" fontWeight="lg" level="body-xs" sx={{ alignContent: "flex-start" }}>ID: {clase.id} </Typography>
                                </div>

                            </CardContent>
                        </Card>
                    </div>
                ))}
            </Box>

        </>
    )
}