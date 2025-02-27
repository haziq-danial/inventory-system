import { Box, Button, Container, Grid, Paper, TextField, Toolbar } from "@mui/material";
import ChevronLeft from '@mui/icons-material/ChevronLeft';

import { useNavigate, useParams } from "react-router-dom";
import Title from "../../../components/Title";
import { useEffect, useState } from "react";

import swal from "sweetalert";

export default function EditVendor() {
    const navigate = useNavigate();
    const { vendor_id } = useParams();
    const [vendor, setVendor] = useState({});
    const [empty_string, setEmptyString] = useState('');
    const [company_name, setCompanyName] = useState("");
    const [brand, setBrand] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");

    const handleChange = (event) => {
        switch (event.target.name) {
            case "companyName":
                setCompanyName(event.target.value);
                break;
            case "brand":
                setBrand(event.target.value);
                break;
            case "contact":
                setContact(event.target.value);
                break;
            case "address":
                setAddress(event.target.value);
                break;
            case "email":
                setEmail(event.target.value);
                break;
        }
        
    };
    const editVendor = async (event) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);

            const response = await fetch("http://localhost:8080/ims-fyp/api/vendors/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    vendor_id: vendor.vendor_id,
                    company_name: data.get('companyName'),
                    brand: data.get('brand'),
                    contact: data.get('contact'),
                    address: data.get('address'),
                    email: data.get('email')
                })
            });

            if (response.status === 200) {
                await swal({
                    title: "Success",
                    text: "Succesfully update vendor",
                    icon: "success",
                    button: "OK"
                });
                navigate(-1);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const loadData = async () => {
        const controller = new AbortController();
        const signal = controller.signal;

        let request = await fetch("http://localhost:8080/ims-fyp/api/vendors/find/"+vendor_id, {
            signal: signal,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (request.status === 200) {
            let response = await request.json();
            
            setVendor(response[0]);

        }

        return () => {
            controller.abort();
        }
    }

    useEffect(() => {
        (async () => {
            // console.log(vendor);
            if (Object.keys(vendor).length === 0) {
                console.log('vendor is empty');
                await loadData();
            } else {
                console.log('data exist');
                console.log(vendor);
                setCompanyName(vendor.company_name);
                setBrand(vendor.brand);
                setContact(vendor.contact);
                setAddress(vendor.address);
                setEmail(vendor.email);
            }
        })();
    }, [vendor]);

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
                    <Button variant="contained" startIcon={<ChevronLeft/>} onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </Grid>
                <Container maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
                    <Grid item>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Title>Edit Vendor</Title>
                            <Box component="form" noValidate onSubmit={editVendor} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} sx={{ mb:3 }}>
                                        <TextField
                                            autoComplete="company-name"
                                            name="companyName"
                                            required
                                            fullWidth
                                            label="Company Name"
                                            value={company_name || ""}
                                            onChange={handleChange}
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
                                            value={brand || ""}
                                            onChange={handleChange}
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
                                            value={contact || ""}
                                            onChange={handleChange}
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
                                            value={address || ""}
                                            onChange={handleChange}
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
                                            value={email || ""}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mb: 2 }}
                                    >
                                    Edit Vendor
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Container>
            </Container>
        </Box>
    );
}