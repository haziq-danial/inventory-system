import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Toolbar } from "@mui/material";
import ChevronLeft from '@mui/icons-material/ChevronLeft';

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import Title from "../../components/Title";


export default function EditUser() {

    const { user_id } = useParams();
    const navigate = useNavigate();
    const [role, setRole] = useState(1);
    const [user, setUser] = useState({});

    const [full_name, setFullName] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeRole = (event: SelectChangeEvent) => {
        setRole(event.target.value);
    }

    const handleChange = (event) => {
        switch (event.target.name) {
            case "firstName":
                setFirstName(event.target.value);
                setFullName(event.target.value + ' ' + last_name);
                break;
            case "lastName":
                setLastName(event.target.value);
                setFullName(first_name + ' ' + event.target.value);
                break;
            case "email":
                setEmail(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
        }
    }

    const updateUser = async (event) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);

            const response = await fetch("http://localhost:8080/ims-fyp/api/accounts/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Object.fromEntries(data))
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

    const loadData = async () => {
        const controller = new AbortController();
        const signal = controller.signal;

        let request = await fetch("http://localhost:8080/ims-fyp/api/accounts/find/"+user_id, {
            signal: signal,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (request.status === 200) {
            let response = await request.json();
            
            setUser(response[0]);

        }

        return () => {
            controller.abort();
        }
    }

    useEffect(() => {
        (async () => {
            if (Object.keys(user).length === 0) {
                await loadData();
            } else {
                let [first_name, ...last_name] = user.full_name.split(' ').filter(Boolean);
    
                last_name = last_name.join(' ');
                setFullName(user.full_name);
                setFirstName(first_name);
                setLastName(last_name);
                setEmail(user.email);
                setPassword(user.password);
                setRole(user.role_type);

                console.log(full_name);
            }
        })();
    }, [user]);

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
                            <Title>Edit User</Title>
                            <Box component="form" noValidate onSubmit={updateUser} sx={{ mt: 3 }}>
                                <Grid container spacing={2} sx={{ mb: 3 }}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="firstName"
                                            required
                                            fullWidth
                                            label="First Name"
                                            value={first_name || ""}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="lastName"
                                            required
                                            fullWidth
                                            label="Last Name"
                                            value={last_name || ""}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <FormControl fullWidth>
                                            <InputLabel>Role</InputLabel>
                                            <Select
                                                value={role}
                                                label="Role Type"
                                                onChange={handleChangeRole}
                                                name="role_type"
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
                                            value={email || ""}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            name="password"
                                            required
                                            fullWidth
                                            label="password"
                                            type="password"
                                            value={password || ""}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <TextField
                                        sx={{ display: 'none' }}
                                        value={user.user_id || 0}
                                        name="user_id"
                                        type="number"
                                    />
                                    <TextField
                                        sx={{ display: 'none' }}
                                        value={full_name || ''}
                                        name="full_name"
                                    />
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