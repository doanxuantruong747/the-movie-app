import React from "react";
import { Link, Typography } from "@mui/material";

function MainFooter() {
    return (
        <Typography variant="body2" color="#fff" align="center" p={1}>
            {"Copyright © "}
            <Link color="inherit" href="https://www.coderschool.vn">
                DoanXuanTruong
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export default MainFooter;