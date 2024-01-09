import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
;import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from './Logo';
import { makeStyles, styled, useTheme, withStyles } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import api from 'src/services/api';
import { useNavigate } from 'react-router-dom';
import { setCookie } from 'nookies';
import CustomizedTables from './CustomTable';

export default function Wallet() {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    api.post('/auth/signIn', {
      email: data.get('email'),
      password: data.get('password')
    }).then((response) => {
      if (response.data.access_token) {
        setCookie(null, 'accessToken', response.data.access_token, { 
          maxAge: 30 * 24 * 60 * 60,
          path: '/'
        });
        localStorage.setItem('accessToken', response.data.access_token);
        console.log(response.data.access_token);
        navigate('/browse');
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Logo />
        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
        <Typography component="h1" variant="h5">
          Wallet
        </Typography>
        <Box>
          <Typography component="h1" variant="h5">
            0.38
          </Typography>
        </Box>
      </Box>
      <CustomizedTables />

    </Container>
  );
}