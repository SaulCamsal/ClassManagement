import { useEffect, useState } from "react"
import { IStudent } from "../components/students/IStudent"
import { deleteStudent, getStudents, postStudent, putStudent } from "../services/student-service"


export function UseStudentData() {
    const [students, setStudents] = useState<IStudent[]>([])
    const [filteredStudents, setFilteredStudents] = useState<IStudent[]>([])
    const [searchFilter, setSearchFilter] = useState<string>("")

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        applyStudentFilter()
    }, [students])

    useEffect(() => {
        applyStudentFilter()
    }, [searchFilter])

    const loadData = async () => {
        const data = await getStudents()
        setStudents(data)
    }

    const applyStudentFilter = () => {
        const searchLower = searchFilter.toLowerCase()
        setFilteredStudents(students.filter((student: IStudent) =>
            student.nombre?.toLowerCase().includes(searchLower) ||
            student.apellido?.toLowerCase().includes(searchLower)))
    }

    const putStudents = async (bodyData: any) => {
        const data = await putStudent(bodyData)
        setStudents(
            students.map((student) =>
                student.id === data.id ? { ...student, ...data } : student)
        )
    }

    const postStudents = async (bodyData: any) => {
        const data = await postStudent(bodyData)
        setStudents([...students, data])
    }
    const deleteStudents = async (id: string) => {
        const data = await deleteStudent(id)
        setStudents(students.filter((student) => student.id !== id))
    }

    return { students, filteredStudents, putStudents, postStudents, deleteStudents, setSearchFilter }
}
