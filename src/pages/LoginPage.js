import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
});
const defaultValues = {
    username: "",
};

function LoginPage() {
    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });
    const { handleSubmit } = methods;

    const onSubmit = async (data) => {
        let from = location.state?.from?.pathname || "/";
        let username = data.username;

        auth.login(username, () => {
            navigate(from, { replace: true });
        });
    };

    return (
        <FormProvider

            methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{
                backgroundColor: '#212121', opacity: 0.9,
                height: 400, borderRadius: 2,
            }} >
                <Stack spacing={3} sx={{ minWidth: "350px" }}>
                    <Typography sx={{ color: '#fff', mt: 3, }} variant="h4" textAlign="center">
                        Login
                    </Typography>
                    <FTextField name="username" label="Username"
                        sx={{ color: '#fff', background: '#757575', borderRadius: 1 }} />
                    <Button sx={{ height: 50, backgroundColor: '#d32f2f' }} type="submit" variant="contained">
                        Login
                    </Button>
                </Stack>
            </Box>
        </FormProvider>
    );
}

export default LoginPage;