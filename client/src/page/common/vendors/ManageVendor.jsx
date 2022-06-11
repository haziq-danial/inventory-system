import { Box, Button, Container, Grid, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableHead, TableRow, Toolbar } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Title from "../../../components/Title";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert";

function ManageVendor() {

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
        setAnchor(null);
    };

    const navigateToEdit = () => {
        setAnchor(null);
        navigate(`/user/vendors/edit/${value}`);
    };

    const deleteVendor = async () => {
        try {
            let request = await fetch("http://localhost:8080/ims-fyp/api/vendors/delete/"+value, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (request.status === 200``) {
                let response = await request.json();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleButton = async (type) => {
        if (type === 'delete') {
            await Swal({
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
                    await deleteVendor();
                    Swal("Succesfully delete item!!", {
                        icon: "success"
                    });
                }
            });
            console.log(value);
            setAnchor(null);
        } else {
            console.log(value);
            setAnchor(null);
        }
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
                    <Button variant="contained" startIcon={<AddIcon/>} onClick={() => navigate('/user/vendors/register')}>
                        Add Vendor
                    </Button>
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
                                                key={index}
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
                                                <MenuItem onClick={navigateToEdit}>Edit Vendor</MenuItem>
                                                <MenuItem onClick={() => handleButton('delete')}>Delete Vendor</MenuItem>
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

export default ManageVendor;