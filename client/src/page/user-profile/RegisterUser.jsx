import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Toolbar } from "@mui/material";
import ChevronLeft from '@mui/icons-material/ChevronLeft';

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Title from "../../components/Title";


export default function RegisterUser() {

    const navigate = useNavigate();
    const [role, setRole] = useState(1);

    const handleChangeRole = (event: SelectChangeEvent) => {
        setRole(event.target.value);
    }

    const registerUser = async (event) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            
            let full_name = data.get('firstName') + " " + data.get('lastName');

            const response = await fetch("http://localhost:8080/ims-fyp/api/accounts/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    full_name: full_name,
                    role_type: role,
                    email: data.get('email'),
                    password: data.get('password')
                }),
            });

            if(response.status === 200) {
                await swal({
                    title: "Success",
                    text: "Successfully registered user",
                    icon: "success",
                    button: "OK",
                });
                navigate(-1);
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
                            <Title>Register User</Title>
                            <Box component="form" noValidate onSubmit={registerUser} sx={{ mt: 3 }}>
                                <Grid container spacing={2} sx={{ mb: 3 }}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="firstName"
                                            required
                                            fullWidth
                                            label="First Name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="lastName"
                                            required
                                            fullWidth
                                            label="Last Name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <FormControl fullWidth>
                                            <InputLabel>Role</InputLabel>
                                            <Select
                                                value={role}
                                                label="Role Type"
                                                onChange={handleChangeRole}
                                            >
                                                <MenuItem value={1}>Admin</MenuItem>
                                                <MenuItem value={2}>User</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            name="email"
                                            required
                                            fullWidth
                                            label="Email"
                                            type="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            name="password"
                                            required
                                            fullWidth
                                            label="password"
                                            type="password"
                                        />
                                    </Grid>
                                </Grid>
                                
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mb: 2 }}
                                >
                                    Register User
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Container>
            </Container>
        </Box>
    );
}