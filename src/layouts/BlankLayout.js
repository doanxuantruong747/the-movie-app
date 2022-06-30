import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { Stack } from "@mui/material";

import Image from '../assets/background.jpg'


const styles = {
    paperContainer: {
        backgroundImage: `url(${Image})`
    }
};

function BlankLayout() {
    return (
        <Stack minHeight="100vh" style={styles.paperContainer} >

            <Stack sx={{ mt: 3, ml: 3, opacity: 10 }}>
                <Logo sx={{ width: 50, height: 50 }} />
            </Stack>

            <Stack justifyContent="center" alignItems="center" sx={{ mt: '5%' }} >
                <Outlet />
            </Stack>

        </Stack>
    );
}

export default BlankLayout;