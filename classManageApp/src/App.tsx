
import { Route, Routes, useNavigate } from "react-router-dom"
import "./App.css"
import Login from "./sections/Login"
import { Admin } from "./sections/Admin"
import { Classes } from "./sections/classes/Classes"
import { StudentView } from "./sections/publicAccess/StudentView"
import { Suscription } from "./sections/suscriptions/Suscriptions"
import { Students } from "./sections/students/Students"
import { ProtectedRouter } from "./components/ProtectedRouter"
import { useEffect } from "react"
import { useLoginStore } from "./store/useLoginStore"
import { ThemeProvider } from "@mui/material"
import { AddStudent } from "./components/students/AddStudent"
import { AddClass } from "./components/classes/AddClass"

  //Validar con el servicio
  //Routes
  //Zustand para manejar el estado

function App() {

  const {login} = useLoginStore() 
  const navigate = useNavigate()

  useEffect(() =>{
    const user = window.localStorage.getItem("user_token")
    if (user){
      login(user)
      navigate("/admin")
    }
  },[])

  return (
    <>

      <Routes>
        <Route path="/" element={<Login/>} />
        <Route element={<ProtectedRouter/>}>
          <Route path="/students" element={<Students/>}/>
          <Route path="/addstudent" element={<AddStudent/>}/>
          <Route path="/addclass" element={<AddClass/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/classes" element={<Classes/>}/>
          <Route path="/suscriptions" element={<Suscription/>}/>
        </Route>
        <Route path="/studentview" element={<StudentView/>}/>
      </Routes>
    </>
  )
}

export default App
