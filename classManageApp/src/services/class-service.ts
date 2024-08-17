import { IClass } from "../components/classes/IClass"


export const url = "https://backend-subs-control.onrender.com/api/clase"

export async function getClass() {
    const response = await fetch(url)
    const data = await response.json()

    return data
}

export async function postClass(body: IClass) {
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

export async function saveClass(body: IClass, isNew: boolean){
    if(isNew){
        return postClass(body)
    }else{
        return putClass(body)
    }
}

export async function putClass(body: IClass){
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

export async function deleteClass(id: string){
    const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
    })
    const data = await response.json()
    return data
}

