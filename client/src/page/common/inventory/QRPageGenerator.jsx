import { Box, Button, Container, Grid, Paper, Toolbar } from "@mui/material";
import ChevronLeft from '@mui/icons-material/ChevronLeft';

import { useNavigate, useParams } from "react-router-dom";
import Title from "../../../components/Title";

import {QRCodeSVG} from 'qrcode.react';
import { useEffect, useState } from "react";

export default function QRPageGenerator () {

    const navigate = useNavigate();
    const { item_id } = useParams();
    const [data, setData] = useState('test');
    const [items, setItems] = useState();

    useEffect(() => {
        (async () => {
            let request = await fetch("http://localhost:8080/ims-fyp/api/items/find/"+item_id, {
                method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
            });

            if (request.status === 200) {
                let response = await request.json();

                setData(response[0]);
                setItems(JSON.stringify(response[0]));
                console.log(data);
            }
        })();
    });
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
            }}
        >
            <Toolbar/>
            <Container
                maxWidth="lg"
                sx={{ mt:4, mb:4 }}
            >
                <Grid item direction="row" justifyContent="space-between" xs={12} mb={4} mt={4}>
                    <Grid item xs>
                        <Button variant="contained" startIcon={<ChevronLeft/>} onClick={() => navigate(-1)}>
                            Back
                        </Button>
                    </Grid>
                </Grid>
                <Container maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
                    <Grid item>
                        <Paper sx={{ paddingBottom: 5, paddingTop: 5,paddingLeft: 6, paddingRight: 5, display: 'flex', flexDirection: 'column' }}>
                            <Title>{data.name}</Title>
                            <QRCodeSVG value={items} size="300" />
                        </Paper>
                    </Grid>
                </Container>
            </Container>
        </Box>
    );
}