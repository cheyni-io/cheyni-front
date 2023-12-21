import * as React from 'react';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Logo from './Logo';
import api from 'src/services/api';
import { Alert, Snackbar, SnackbarOrigin } from '@mui/material';
import dayjs from 'dayjs';
import router from 'src/routes';
import { useNavigate } from 'react-router-dom';

interface State extends SnackbarOrigin {
  open: boolean;
}

export default function SignUp() {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const [message, setMessage] = React.useState<string>('');
  const { vertical, horizontal, open } = state;
  const navigate = useNavigate(); // Inicialize useNavigate

  const handleClose = () => {
    setState({ ...state, open: false });
  }; const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    api.post('/auth/signUp', {
      name: data.get('name'),
      birthDate: data.get('birthday'),
      email: data.get('email'),
      password: data.get('password')
    }).then((response) => {
      setMessage('Account created successfully!');
      setState({ ...state, open: true });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }).catch((error) => {
      setMessage('Error creating account, try again!');
      setState({ ...state, open: true });
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={message.includes('successfully') ? 'success' : 'error'} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          marginTop: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Logo />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="name"
                label="Full Name"
                type="name"
                id="name"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker 
                label="Birthdate" 
                name="birthday"
                slotProps={{
                  textField: {
                    helperText: 'MM/DD/YYYY',
                  },
                }}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
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
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: dark ? "#0C0B30" : "#FFF", backgroundColor: dark ? "#FFF" : "#0C0B30", ":hover": { backgroundColor: dark ? "#FFF" : "#0C0B30" } }}
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
      </Box>
    </Container>
  );
}