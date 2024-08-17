import { IPagos } from "../components/Payments/IPagos"


export const url = 'https://backend-subs-control.onrender.com/api/pago'

export async function getPayments() {
    const response = await fetch(url)
    const data = await response.json()

    return data
}

export async function postPayment(body: IPagos) {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),//payload
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = response.json()
    return data
}

export async function savePayment(body: IPagos, isNew: boolean){
    if(isNew){
        return postPayment(body)
    }else{
        return putPayment(body)
    }
}

export async function putPayment(body: IPagos){
    console.log(JSON.stringify(body))
    const response = await fetch(`${url}/${body.id}`, {
        method:'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    const data = await response.json()
    return data
}

export async function deletePayment(id: string){
    const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
    })
    const data = await response.json()
    return data
}