import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { Link } from "react-router-dom";


export default function Navbar2() {

    const [open, setOpen] = useState(false)

    return (
        <>

            <AppBar position="fixed" >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        size="medium"
                        onClick={() => setOpen(true)}
                    >
                        <MenuIcon />
                        <Typography variant="h6" sx={{ p: 2 }}> Camsa School</Typography>
                    </IconButton>
                    <Typography sx={{ flexGrow: 1 }}></Typography>
                    <Box sx={{ flex: 'wrap', gap: "10px" }}>
                        <Link to={"/students"}>
                            <Button color="inherit" variant="contained" >Students</Button>
                        </Link>
                        <Link to={"/classes"}>
                            <Button color="inherit" variant="contained" >Classes</Button>
                        </Link>
                        <Link to={"/suscriptions"}>
                            <Button color="inherit" variant="contained" >Suscriptions</Button>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>

            {/*<Button 
            variant="contained" 
            onClick={() => setOpen(true)} 
            startIcon={<MenuIcon/>} 
            > </Button>*/}

            <Drawer
                open={open}
                anchor="left"
                onClose={() => setOpen(false)}
            >
                <NavListDrawer />
            </Drawer>
        </>
    )
}