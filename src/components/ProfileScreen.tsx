import React, { useEffect } from 'react';
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
import { DateField } from '@mui/x-date-pickers';

interface State extends SnackbarOrigin {
  open: boolean;
}

export default function Profile() {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const [message, setMessage] = React.useState<string>('');
  const [userData, setUserData] = React.useState({
    name: '',
    birthDate: null,
    email: '',
    password: ''
  });
  const { vertical, horizontal, open } = state;
  const navigate = useNavigate(); // Inicialize useNavigate

  const tokens = localStorage.getItem('accessToken');

  //Pegar o token e os dados do usuário
  useEffect(() => {
    api.get('/auth', {
      headers: {
        Authorization: `Bearer ${tokens}`
      }
    }).then((response) => {
      setUserData({
        name: response.data.name,
        birthDate: response.data.birthDate,
        email: response.data.email,
        password: ''
      });
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  // }; const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);

  //   api.post('/auth/signUp', {
  //     name: data.get('name'),
  //     birthDate: data.get('birthday'),
  //     email: data.get('email'),
  //     password: data.get('password')
  //   }).then((response) => {
  //     setMessage('Account created successfully!');
  //     setState({ ...state, open: true });
  //     setTimeout(() => {
  //       navigate('/login');
  //     }, 2000);
  //   }).catch((error) => {
  //     setMessage('Error creating account, try again!');
  //     setState({ ...state, open: true });
  //   });
  // };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    api.put('/auth', {
      name: data.get('name'),
      birthDate: data.get('birthDate'),
      email: data.get('email'),
      // Inclua a senha apenas se ela tiver sido alterada
      ...(data.get('password') && { password: data.get('password') })
    }, {
      headers: {
        Authorization: `Bearer ${tokens}`
      }
    }).then((response) => {
      setMessage('Account updated successfully!');
      setState({ ...state, open: true });
    }).catch((error) => {
      setMessage('Error updating account, try again!');
      setState({ ...state, open: true });
    });
  }

  useEffect(() => {
    if (tokens === null) {
      navigate('/login');
    }
  }, []);

  const handleDateChange = (event: any) => {
    const { value } = event.target;
    // Regex para garantir a formatação yyyy-mm-dd
    const formattedDate = value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1-$2-$3');
    setUserData({ ...userData, birthDate: formattedDate });
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
          Edit Profile
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
                value={userData.name}
                autoComplete="new-password"
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="birthDate"
                label="Birthdate"
                type="date" // Define o tipo como 'date' para usar o seletor de data nativo
                id="birthDate"
                value={userData.birthDate}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true, // Isso garante que o rótulo se comporta corretamente com o tipo 'date'
                }}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                value={userData.email}
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                value={userData.password}
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
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
            Update
          </Button>
          {/* <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
    </Container>
  );
}