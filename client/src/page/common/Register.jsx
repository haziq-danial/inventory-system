import { useState } from "react";
import Swal from "sweetalert";
import { useNavigate } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from "@mui/material";
import { height } from "@mui/system";
import backgroundImg from '../../images/background.jpg';

const theme = createTheme();
function Register() {

    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleChangeRole = (event: SelectChangeEvent) => {
        setRole(event.target.value);
    }

    const register = async (event) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);

            let full_name = data.get('firstName') + " " + data.get('lastName');

            const response = await fetch("http://localhost:8080/api/auth/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                full_name: full_name,
                role_type: role,
                email: data.get('email'),
                password: data.get('password')
              }),
            });

            if (response.status === 200) {
              await Swal({
                title: "Success",
                text: "You have successfully registered",
                icon: "success",
                button: "OK",
              });
              navigate("/login");
            }

        } catch (e) {
            console.log(e);
        }
    }

    return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" 
        sx={{
          backgroundImage: `url(${require("../../images/background.jpg")})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '100vh',
          pt: '5vh'
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Paper
              sx={{
                backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 540,
                alignItems: 'center'
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'error.main' }}>
                <BadgeOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={register} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                      <FormControl fullWidth>
                          <InputLabel>Role</InputLabel>
                          <Select
                            value={role}
                            label="Role Type"
                            onChange={handleChangeRole}
                          >
                              <MenuItem value={1}>Admin</MenuItem>
                              <MenuItem value={2}>User</MenuItem>
                          </Select>
                      </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      type="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Container>
    </ThemeProvider>
    );
}

export default Register;