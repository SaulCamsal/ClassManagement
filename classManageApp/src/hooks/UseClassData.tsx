import { useEffect, useState } from "react"
import { IClass } from "../components/classes/IClass"
import { deleteClass, getClass, postClass, putClass } from "../services/class-service"


export function UseClassData() {
    const [classes, setClasses] = useState<IClass[]>([])
    const [filteredClasses, setFilteredClasses] = useState<IClass[]>([])
    const [searchFilter, setSearchFilter] = useState<string>("")

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        applyClassFilter()
    }, [classes])

    useEffect(() => {
        applyClassFilter()
    }, [searchFilter])

    const loadData = async () => {
        const data = await getClass()
        setClasses(data)
    }

    const applyClassFilter = () => {
        const searchLower = searchFilter.toLowerCase()
        setFilteredClasses(classes.filter((clase: IClass) =>
            clase.nombre?.toLowerCase().includes(searchLower) ||
            clase.costo?.toLocaleString))
    }

    const putClasses = async (bodyData: any) => {
        const data = await putClass(bodyData)
        setClasses(
            classes.map((clase) =>
                clase.id === data.id ? { ...clase, ...data } : clase)
        )
    }

    const postClasses = async (bodyData: any) => {
        const data = await postClass(bodyData)
        setClasses([...classes, data])
    }
    const deleteClasses = async (id: string) => {
        const data = await deleteClass(id)
        setClasses(classes.filter((clase) => clase.id !== id))
    }

    return { classes, filteredClasses, putClasses, postClasses, deleteClasses, setSearchFilter }
}
