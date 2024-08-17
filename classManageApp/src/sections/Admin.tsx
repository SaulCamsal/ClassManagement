

import { Box, Button, Container } from "@mui/material"
import { useLoginStore } from "../store/useLoginStore"
import { Link, useNavigate } from "react-router-dom"

export function Admin() {
    //Values
    const { user } = useLoginStore()
    //functions
    const { logout } = useLoginStore()
    /*const navigate = useNavigate()
    const handleSubmitStudents = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate("/students")
    }*/

    return (
        <>

            <h2>Bienvenido: {user}</h2>
            <Container component="main">
                <Box component="form"
                    sx={{ display: "flex", flexDirection: 'column' }}>
                    <Link to={'/students'}>
                        <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }} >Students</Button>
                    </Link>
                    <Link to={'/classes'}>
                        <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }} >Classes</Button>
                    </Link>
                    <Link to={'/suscriptions'}>
                        <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }} >Suscriptions</Button>
                    </Link>
                    <Button
                        type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => logout()}>
                        Salir </Button>
                </Box>
            </Container>

        </>
    )
}