import { Box, Button, Container, Grid, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableHead, TableRow, Toolbar } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../../components/Title";


function ManageInventory() {

    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [value, setValue] = useState(0);
    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);

    const handleClick = (event) => {
        setAnchor(event.currentTarget);
        setValue(event.currentTarget.value);
    };
    const handleClose = () => {
        console.log(value);
        setAnchor(null);
    };

    const handleNavigate = () => {
        setAnchor(null);
        navigate(`/user/inventory/view/${value}`);
    };

    useEffect(() => {
        (async () => {
            const controller = new AbortController();
            const signal = controller.signal;

            let request = await fetch("http://localhost:8080/ims-fyp/api/vendors/get", {
                signal: signal,
                method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
            });
            
            if(request.status === 200) {
                let response = await request.json();

                let rows = [];
                let object = {};
                let counter = 1;

                response.forEach(item => {

                    object.vendor_id = item.vendor_id;
                    object.company_name = item.company_name;
                    object.brand = item.brand;
                    object.contact = item.contact;
                    object.address = item.address;
                    object.email = item.email;
                    rows.push(object);
                    object = {};
                });

                setItems(rows);
            }

            return () => {
                controller.abort();
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
                sx={{ mt: 4, mb: 4 }}
            >
                <Grid item xs={12} mb={4} mt={4}>
                    <Title>Manage Inventory</Title>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Title>All Vendors</Title>
                        <Table size="medium">
                            <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Company Name</TableCell>
                                <TableCell>Brand</TableCell>
                                <TableCell>Contact</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell>{item.company_name}</TableCell>
                                        <TableCell>{item.brand}</TableCell>
                                        <TableCell>{item.contact}</TableCell>
                                        <TableCell>{item.address}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell align="center">
                                            <Button value={item.vendor_id} onClick={handleClick} endIcon={<KeyboardArrowDownIcon />} variant="contained">Action</Button>
                                            <Menu
                                                anchorEl={anchor}
                                                open={open}
                                                onClose={handleClose}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >
                                                <MenuItem onClick={handleNavigate}>View Inventory</MenuItem>
                                            </Menu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Container>
        </Box>
    );
}

export default ManageInventory;