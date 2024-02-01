import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
; import FormControlLabel from '@mui/material/FormControlLabel';
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
import { useEffect, useState } from 'react';


interface UserData {
  name: string;
  birthDate: Date | null;
  email: string;
  password: string;
  nfTokenAndUser?: any;
}

export default function Wallet() {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    name: '',
    birthDate: null,
    email: '',
    password: ''
  });
  const tokens = localStorage.getItem('accessToken');
  const [hash, setHash] = useState('');
  const [image, setImage] = useState('');
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
        password: '',
        nfTokenAndUser: response.data.nfTokenAndUser
      });
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const [initials, setInitials] = useState('');
  //Get initials from user name
  const getInitials = (name: string) => {
    return name.split(' ').map((n) => n[0]).join('');
  }

  useEffect(() => {
    setInitials(getInitials(userData.name));
  }, []);

  //Generate random hash for each token
  const generateHash = () => {
    return Math.random().toString(36).substring(7);
  } 

  useEffect(() => {
    setHash(generateHash() + '-' + getInitials(userData.name));
  }, []);

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
            {userData.nfTokenAndUser?.map((tokenAndUser: any, index: any) => (
              <CustomizedTables
                key={index}
                data={[
                  {
                    name: tokenAndUser?.nftoken?.name || '',
                    token: tokenAndUser?.nftoken?.token || '',
                    hash: hash,
                  }
                ]}
              />
            ))}
          </Typography>
        </Box>
      </Box>


    </Container>
  );
}