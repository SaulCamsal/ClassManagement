import { useEffect, useState } from "react"
import { IPagos } from "../components/Payments/IPagos"
import { deletePayment, getPayments, postPayment, putPayment } from "../services/payment-service"

export function UsePaymentData() {
    const [payments, setPayments] = useState<IPagos[]>([])
    const [filteredPayments, setFilteredPayments] = useState<IPagos[]>([])
    const [searchFilter, setSearchFilter] = useState<string>("")

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        applyPaymentFilter()
    }, [payments])

    useEffect(() => {
        applyPaymentFilter()
    }, [searchFilter])

    const loadData = async () => {
        const data = await getPayments()
        setPayments(data)
    }

    const applyPaymentFilter = () => {
        const searchLower = searchFilter.toLowerCase()
        setFilteredPayments(payments.filter((payment: IPagos) =>
            payment.alumno?.toLowerCase().includes(searchLower) ||
            payment.clase?.toLowerCase().includes(searchLower)  ||
            payment.fechaPago?.toLowerCase().includes(searchLower)||
            payment.pago?.toLocaleString
        ))
    }

    const putPayments = async (bodyData: any) => {
        const data = await putPayment(bodyData)
        setPayments(
            payments.map((payment) =>
                payment.id === data.id ? { ...payment, ...data } : payment)
        )
    }

    const postPayments = async (bodyData: any) => {
        const data = await postPayment(bodyData)
        setPayments([...payments, data])
    }
    const deletePayments = async (id: string) => {
        const data = await deletePayment(id)
        setPayments(payments.filter((payment) => payment.id !== id))
    }

    return { filteredPayments, putPayments, postPayments, deletePayments, setSearchFilter }
}
