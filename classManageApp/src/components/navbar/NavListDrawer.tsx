import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import ClassIcon from '@mui/icons-material/Class';
import LogoutIcon from '@mui/icons-material/Logout';
import PaymentIcon from '@mui/icons-material/Payment';
import { Link } from "react-router-dom";

export default function NavListDrawer() {
    return (
        <Box sx={{ width: 250, bgcolor: "lightgrey" }}>
            <nav>

            </nav>
            <Divider></Divider>
            <nav>
                <List>
                    <Link to={"../students"}>
                        <ListItem>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Students" />
                        </ListItem>
                    </Link>
                    <Link to={"../classes"}>
                        <ListItem>
                            <ListItemIcon>
                                <ClassIcon />
                            </ListItemIcon>
                            <ListItemText primary="Classes" />
                        </ListItem>
                    </Link>
                    <Link to={"../suscriptions"}>
                        <ListItem>
                            <ListItemIcon>
                                <PaymentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Suscriptions" />
                        </ListItem>
                    </Link>
                </List>
            </nav>
            <Divider />
            <nav>
                <Link to={"/"}>
                    <ListItem>
                        <ListItemButton>
                            <LogoutIcon />
                            <ListItemText primary=". Logout" />
                        </ListItemButton>
                    </ListItem>
                </Link>
            </nav>
        </Box>
    )
}