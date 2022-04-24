import { Box, Button, Container, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Toolbar } from "@mui/material";
import Title from "../../../components/Title";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ManageVendor() {

    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    useEffect(() => {
        (async () => {
            
            let request = await fetch("http://localhost:8080/ims-fyp/api/vendors/get", {
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

                    object.key = counter;
                    object.company_name = item.company_name;
                    object.brand = item.brand;
                    object.contact = item.contact;
                    object.address = item.address;
                    object.email = item.email;
                    rows.push(object);
                    object = {};
                    counter++;
                });

                setItems(rows);
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
                                <TableCell>Company Name</TableCell>
                                <TableCell>Brand</TableCell>
                                <TableCell>Contact</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                {items.map(item => (
                                    <TableRow key={item.key}>
                                        <TableCell>{item.company_name}</TableCell>
                                        <TableCell>{item.brand}</TableCell>
                                        <TableCell>{item.contact}</TableCell>
                                        <TableCell>{item.address}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained">Action</Button>
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