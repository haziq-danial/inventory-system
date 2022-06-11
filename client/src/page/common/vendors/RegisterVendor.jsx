import { Box, Button, Container, Grid, Paper, TextField, Toolbar } from "@mui/material";
import ChevronLeft from '@mui/icons-material/ChevronLeft';

import React from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Title from "../../../components/Title";


export default function RegisterVendor() {

    const navigate = useNavigate();
    const registerVendor = async (event) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);

            const response = await fetch("http://localhost:8080/ims-fyp/api/vendors/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    company_name: data.get('companyName'),
                    brand: data.get('brand'),
                    contact: data.get('contact'),
                    address: data.get('address'),
                    email: data.get('email')
                })
            });

            if(response.status === 200) {
                await swal({
                    title: "Success",
                    text: "Successfully registered vendor",
                    icon: "success",
                    button: "OK",
                });
                navigate('/user/vendors');
            }


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
                alignItems: 'center'
            }}
        >
            <Toolbar/>
            <Container 
                maxWidth="lg"
                sx={{ mt: 4, mb: 4 }}
            >
                <Grid item xs={12} mb={4} mt={4}>
                    <Button variant="contained" startIcon={<ChevronLeft/>} onClick={() => navigate('/user/vendors')}>
                        Back
                    </Button>
                </Grid>
                <Container maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
                    <Grid item>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Title>Register Vendor</Title>
                            <Box component="form" noValidate onSubmit={registerVendor} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} sx={{ mb:3 }}>
                                        <TextField
                                            autoComplete="company-name"
                                            name="companyName"
                                            required
                                            fullWidth
                                            label="Company Name"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} sx={{ mb:3 }}>
                                        <TextField
                                            autoComplete="brand"
                                            name="brand"
                                            required
                                            fullWidth
                                            label="Brand Name"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} sx={{ mb:3 }}>
                                        <TextField
                                            autoComplete="contact"
                                            name="contact"
                                            required
                                            fullWidth
                                            label="Company Contact"
                                            type="number"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} sx={{ mb:3 }}>
                                        <TextField
                                            autoComplete="address"
                                            name="address"
                                            required
                                            fullWidth
                                            multiline
                                            rows={4}
                                            label="Address"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} sx={{ mb:3 }}>
                                        <TextField
                                            autoComplete="email"
                                            name="email"
                                            required
                                            fullWidth
                                            label="Company Email"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mb: 2 }}
                                    >
                                    Register Vendor
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Container>
            </Container>
        </Box>
    );
}