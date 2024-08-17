import { Button } from "@mui/material"

interface AddPaymentProps {
    alumno: string
    clase: string
    costo: number
    fechaDePago: string
    buttonText: string
    onSubmit: (e: any) => void
    onCancel: () => void
}

export const AddPayment = ({
    alumno,
    clase,
    costo,
    fechaDePago,
    buttonText = "Guardar",
    onSubmit,
    onCancel,
}: AddPaymentProps) => {
    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Alumno ID"
                name="alumno"
                defaultValue={alumno}
            />
            <input
                type="text"
                placeholder="Clase ID"
                name="clase"
                defaultValue={clase}
            />
            <input
                type="text"
                placeholder="Costo"
                name="costo"
                defaultValue={costo}
            />
            <input
                type="text"
                placeholder="DD/MM/AAAA"
                name="fechaDePago"
                defaultValue={fechaDePago}
            />
            <div>
                <Button onClick={onCancel}>Cancelar</Button>
                <Button type="submit">{buttonText}</Button>
            </div>
        </form>
    )
}