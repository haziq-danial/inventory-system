import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert";

import styles from "../../styles/common/Login.module.scss";

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from "@mui/material";


const theme = createTheme();
function Login() {

    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState('error');
    const [alertTitle, setAlertTitle] = useState('');
    const [alertmsg, setAlertmsg] = useState('');
    const navigate = useNavigate();

    const login = async (event) => {
		try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            
			let res, req;

			req = await fetch("http://localhost:8080/ims-fyp/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: data.get('email'),
					password: data.get('password'),
				}),
			});

			if (req.status === 200) {
				res = await req.json();

				localStorage.setItem('user', JSON.stringify({
          id: res.id,
          email: res.email,
          name: res.name,
          role: res.role,
          token: res.token
        }));

        await Swal({
					title: "Success",
					text: "You have successfully Logged in",
					icon: "success",
					button: "OK",
				});
        navigate('/user');
                
			} else {
                setOpen(true);
                setAlert('error');
                setAlertTitle('Unauthorized access');
                setAlertmsg('Incorrect credentials');
			}
		} catch (e) {
            setOpen(true);
            setAlert('error');
            setAlertTitle('Error logging in');
            setAlertmsg('Server Error');

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
            <Paper
              sx={{
                backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
                marginTop: 8,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 590,
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  marginTop: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'error.main' }}>
                  <AccountBoxIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Box
                  sx={{
                      marginTop: 2,
                      display: 'flex',
                      flexDirection: 'column',
                  }}
              >
                  <Collapse in={open}>
                      <Alert severity={alert} action={
                          <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                              setOpen(false);
                          }}
                          >
                          <CloseIcon fontSize="inherit" />
                          </IconButton>
                      }
                      sx={{ mb: 2 }}>
                          <AlertTitle>{alertTitle}</AlertTitle>
                          <strong>{alertmsg}</strong>
                      </Alert>
                  </Collapse>
        
              </Box>
            </Paper>
          </Container>
      </Container>
    </ThemeProvider>
        
    );
}

export default Login;