import { Button } from "@mui/material"

interface AddClassProps {
    nombre: string
    costo: string
    buttonText: string
    onSubmit: (e: any) => void
    onCancel: () => void
}

export const AddClass = ({
    nombre,
    costo,
    buttonText = "Guardar",
    onSubmit,
    onCancel,
}: AddClassProps) => {
    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Nombre"
                name="nombre"
                defaultValue={nombre}
            />
            <input
                type="text"
                placeholder="Costo"
                name="costo"
                defaultValue={costo}
            />
            <div>
                <Button onClick={onCancel}>Cancelar</Button>
                <Button type="submit">{buttonText}</Button>
            </div>
        </form>
    )
}