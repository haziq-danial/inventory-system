import ChevronLeft from '@mui/icons-material/ChevronLeft';
import { Box, Button, Container, Grid, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableHead, TableRow, Toolbar } from '@mui/material';
import Title from '../../../components/Title';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';

import { Routes, Route, Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import swal from 'sweetalert';

function ViewInventory() {

    const navigate = useNavigate();
    const { vendor_id } = useParams();
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

    const handleNavigate = (route) => {
        setAnchor(null);
        if (route === 'generate qr code') {
            navigate(`/user/inventory/view/qr-code/${value}`);
        }

        if (route === 'edit item') {
            navigate(`/user/inventory/edit/${value}`);
        }
    };

    const handleDelete =async () => {
      await swal({
        title: "Are You Sure?",
        text: "Do you want to proceed to deleteing this vendor?",
        icon: "warning",
        dangerMode: true,
        buttons: {
            cancel: 'Cancel',
            delete: {
                text: 'Delete',
                value: 'delete',
            },
        },
      }).then(async (willDelete) => {
        if (willDelete) {
            await deleteItem();
            swal("Succesfully delete item!!", {
                icon: "success"
            });
        }
      });  
    };

    const deleteItem =async () => {
      try {
            let request = await fetch("http://localhost:8080/ims-fyp/api/items/delete/"+value, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (request.status === 200``) {
                let response = await request.json();
            }
      } catch (error) {
        console.error(error);
      }  
    };

    useEffect(() => {
        (async () => {
            
            const controller = new AbortController();
            const signal = controller.signal;

            let request = await fetch("http://localhost:8080/ims-fyp/api/items/find/vendor/"+vendor_id, {
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

                response.forEach(item => {

                    object.item_id = item.item_id;
                    object.vendor_id = item.vendor_id;
                    object.name = item.name;
                    object.quantity = item.quantity;
                    object.price_unit = item.price_unit;
                    object.barcode_id = item.barcode_id;
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
                <Grid item container direction="row" justifyContent="space-between" xs={12} mb={4} mt={4}>
                    <Grid item xs>
                        <Button variant="contained" startIcon={<ChevronLeft/>} onClick={() => navigate('/user/inventory')}>
                            Back
                        </Button>
                    </Grid>
                    <Grid justifyContent="flex-end">
                        <Grid item xs>
                            <Button startIcon={<AddIcon/>} variant='contained' onClick={() => navigate('/user/inventory/add/'+vendor_id)}>
                                Add Item
                            </Button>
                        </Grid>
                    </Grid>
                    
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Title>All Items</Title>
                        <Table size='medium'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Barcode ID</TableCell>
                                    <TableCell align='center'>Price Unit (MYR)</TableCell>
                                    <TableCell align='center'>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.barcode_id}</TableCell>
                                        <TableCell align='center'>{item.price_unit}</TableCell>
                                        <TableCell align='center'>
                                            <Button value={item.item_id} onClick={handleClick} endIcon={<KeyboardArrowDownIcon />} variant="contained">Action</Button>
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
                                                <MenuItem onClick={() => {handleNavigate('generate qr code')}}>Generate qr code</MenuItem>
                                                <MenuItem onClick={() => {handleNavigate('edit item')}}>Edit Item</MenuItem>
                                                <MenuItem onClick={handleDelete}>Delete Item</MenuItem>
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

export default ViewInventory;