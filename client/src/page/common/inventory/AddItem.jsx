import { Box, Button, Container, Grid, Paper, TextField, Toolbar } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';

import * as React from 'react';
import { Routes, Route, Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import Title from '../../../components/Title';
import swal from 'sweetalert';

function AddItem() {

    const { vendor_id } = useParams();
    const navigate = useNavigate();

    const addItem =async (event) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);

            const response = await fetch("http://localhost:8080/ims-fyp/api/items/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    vendor_id: vendor_id,
                    name: data.get('name'),
                    quantity: data.get('quantity'),
                    price_unit: data.get('price_unit'),
                    barcode_id: data.get('barcode_id')
                })
            });

            if (response.status === 200) {
                await swal({
                    title: "Success",
                    text: "Successfully registered item",
                    icon: "success",
                    button: "OK"
                });
                navigate('/user/inventory/view/'+vendor_id);
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
                    <Button variant="contained" startIcon={<ChevronLeft/>} onClick={() => navigate('/user/inventory/view/'+vendor_id)}>
                        Back
                    </Button>
                </Grid>
                <Container maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
                    <Grid item>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Title>Add item</Title>
                            <Box component="form" noValidate onSubmit={addItem}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} sx={{ mb:3 }}>
                                        <TextField
                                            autoComplete="item-name"
                                            name="name"
                                            required
                                            fullWidth
                                            label="Item Name"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} sx={{ mb:3 }}>
                                        <TextField
                                            autoComplete="item-quantity"
                                            name="quantity"
                                            required
                                            fullWidth
                                            type="number"
                                            label="Quantity"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} sx={{ mb:3 }}>
                                        <TextField
                                            autoComplete="item-price-unit"
                                            name="price_unit"
                                            required
                                            fullWidth
                                            type="number"
                                            label="Price Unit"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} sx={{ mb:3 }}>
                                        <TextField
                                            autoComplete="item-barcode-id"
                                            name="barcode_id"
                                            required
                                            fullWidth
                                            label="Barcode ID"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mb: 2 }}
                                    >
                                    Add Item
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Container>
            </Container>
        </Box>
    );
}

export default AddItem;