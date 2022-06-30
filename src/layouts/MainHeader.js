import * as React from "react";
import Box from "@mui/material/Box";
//import useAuth from "../hooks/useAuth";
import Header from "../components/header/Header";

function MainHeader() {
    //const { user } = useAuth();
    //{user?.username}
    return (
        <Box position="static" sx={{ mb: 15, }}>
            <Header />
        </Box>
    );
}

export default MainHeader;