import { Box, Button, Container, Grid, Paper, TextField, Toolbar } from "@mui/material";
import React from "react";
import Title from "../../../components/Title";


export default function RegisterVendor() {
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
                maxWidth="xs"
                sx={{ mt: 4, mb: 4 }}
            >
                <Grid item>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Title>Register Vendor</Title>
                        <Box component="form" noValidate sx={{ mt: 3 }}>
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
        </Box>
    );
}