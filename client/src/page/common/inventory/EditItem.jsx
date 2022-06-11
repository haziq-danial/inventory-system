import { Box, Button, Container, Grid, Paper, TextField, Toolbar } from "@mui/material";
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import { useNavigate, useParams } from "react-router-dom";
import Title from "../../../components/Title";
import { useEffect, useState } from "react";
import swal from "sweetalert";

export default function EditItem() {
    const navigate = useNavigate();
    const { item_id } = useParams();

    const [item, setItem] = useState({});
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price_unit, setPriceUnit] = useState(0);
    const [barcode_id, setBarcodeId] = useState("");

    const updateItem = async (event) => {
        try {
            event.preventDefault();

            const data = new FormData(event.currentTarget);

            const response = await fetch("http://localhost:8080/ims-fyp/api/items/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    item_id: item_id,
                    vendor_id: item.vendor_id,
                    name: name,
                    quantity: quantity,
                    price_unit: price_unit,
                    barcode_id: barcode_id
                })
            });

            if (response.status === 200) {
                await swal({
                    title: "Success",
                    text: "Succesfully update item",
                    icon: "success",
                    button: "OK"
                });
                navigate(-1);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event) => {
        switch (event.target.name) {
            case "name":
                setName(event.target.value);
                break;
            case "quantity":
                setQuantity(event.target.value);
                break;
            case "price_unit":
                setPriceUnit(event.target.value);
                break;
            case "barcode_id":
                setBarcodeId(event.target.value);
                break;
        }
    };

    const loadData =async () => {
        const controller = new AbortController();
        const signal = controller.signal;

        let request = await fetch("http://localhost:8080/ims-fyp/api/items/find/"+item_id, {
            signal: signal,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (request.status === 200) {
            let response = await request.json();
            
            setItem(response[0]);

        }

        return () => {
            controller.abort();
        }
    }

    useEffect(() => {
        (async () => {
            if (Object.keys(item).length === 0) {
                console.log('item is empty');
                await loadData();
            } else {
                setName(item.name);
                setQuantity(item.quantity);
                setPriceUnit(item.price_unit);
                setBarcodeId(item.barcode_id);
            }
        })()
    }, [item]);

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
                            <Title>Edit Item</Title>
                            <Box component="form" noValidate onSubmit={updateItem}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} sx={{ mb:3 }}>
                                        <TextField
                                            autoComplete="item-name"
                                            name="name"
                                            required
                                            fullWidth
                                            label="Item Name"
                                            value={name || ""}
                                            onChange={handleChange}
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
                                            value={quantity || ""}
                                            onChange={handleChange}
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
                                            value={price_unit || ""}
                                            onChange={handleChange}
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
                                            value={barcode_id || ""}
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
                                    Update Item
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Container>
            </Container>
        </Box>
    );
}