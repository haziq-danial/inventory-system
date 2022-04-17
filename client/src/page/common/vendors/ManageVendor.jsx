import { Box, Button, Container, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Toolbar } from "@mui/material";
import Title from "../../../components/Title";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

function ManageVendor() {

    const navigate = useNavigate();

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
                            <TableRow>
                                <TableCell>Company #1</TableCell>
                                <TableCell>Brand #1</TableCell>
                                <TableCell>0122222</TableCell>
                                <TableCell>Address #1</TableCell>
                                <TableCell>example@email.com</TableCell>
                                <TableCell align="center">
                                    <Button variant="contained">Action</Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                      </Table>
                  </Paper>
                </Grid>
            </Container>

        </Box>
    );
}

export default ManageVendor;