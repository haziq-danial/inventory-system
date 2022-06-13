import { Box, Button, Container, Grid, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableHead, TableRow, Toolbar } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import { useEffect, useState } from "react";


export default function ManageUsers() {

    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [value, setValue] = useState(0);
    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);

    const user = JSON.parse(localStorage.getItem("user"));

    const handleClick = (event) => {
        setAnchor(event.currentTarget);
        setValue(event.currentTarget.value);
    };
    
    const handleClose = () => {
        setAnchor(null);
    };

    const handleNavigate = () => {
        setAnchor(null);
        navigate(`/admin/users/edit/${value}`);
    };

    useEffect(() => {
        (async () => {
            const controller = new AbortController();
            const signal = controller.signal;

            let request = await fetch("http://localhost:8080/ims-fyp/api/accounts/get", {
                method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
            });

            if (request.status === 200) {
                let response = await request.json();

                let rows = [];
                let object = {};
                let counter = 1;
                console.log(user);

                response.forEach(items => {
                    if (user.id != items.user_id) {
                        object.key = counter;
                        object.user_id = items.user_id;
                        object.full_name = items.full_name;
                        object.email = items.email;
                        object.password = items.password;
                        object.role_type = items.role_type;
                        object.created_at = items.created_at;
                        object.updated_at = items.updated_at;

                        rows.push(object);
                        object = {};
                        counter++;
                    }
                });

                setItems(rows);
            }

            return () => {
                controller.abort();
            }
        })();
    }, []);

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
                    <Button variant="contained" onClick={() => navigate('/admin/users/add-user')} startIcon={<AddIcon/>}>
                        Add User
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Title>All Users</Title>
                        <Table size="medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Full name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Role Type</TableCell>
                                    <TableCell>created at</TableCell>
                                    <TableCell>updated at</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map(item => (

                                    <TableRow key={item.key}>
                                        <TableCell>{item.key}</TableCell>
                                        <TableCell>{item.full_name}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.role_type}</TableCell>
                                        <TableCell>{item.created_at}</TableCell>
                                        <TableCell>{item.updated_at}</TableCell>
                                        <TableCell align="center">
                                            <Button value={item.user_id} variant="contained" onClick={handleClick} endIcon={<KeyboardArrowDownIcon/>}>Action</Button>
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
                                                <MenuItem onClick={handleNavigate}>Edit User</MenuItem>
                                                <MenuItem>Delete User</MenuItem>
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