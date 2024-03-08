import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Logo from "./Logo";
import { makeStyles, styled, useTheme, withStyles } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import api from "src/services/api";
import { useNavigate } from "react-router-dom";
import { setCookie } from "nookies";

export default function ForgotPassword() {
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";
  const [emailSent, setEmailSent] = React.useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    api
      .post("/auth/forgotPassword", {
        email: data.get("email"),
      })
      .then((response) => {
        setEmailSent(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (emailSent) {
    return (
      <Container component="main" maxWidth="xs" sx={{ height: "100vh" }}>
        <Box
          sx={{
            marginTop: 16,
            marginBottom: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Email sent
          </Typography>
          <Typography component="h2" variant="h6">
            Check your email for instructions on how to reset your password.
          </Typography>
          <Button
            onClick={() => navigate("/login")}
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              mb: 2,
              color: dark ? "#0C0B30" : "#FFF",
              backgroundColor: dark ? "#FFF" : "#0C0B30",
            }}
          >
            Login
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ height: "100vh" }}>
      <Box
        sx={{
          marginTop: 16,
          marginBottom: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <Logo /> */}
        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            color="primary" // Define a cor primária para o estado normal
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              color: dark ? "#0C0B30" : "#FFF",
              backgroundColor: dark ? "#FFF" : "#0C0B30",
            }}
          >
            Reset Password
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2" color={dark ? "#FFF" : "#0C0B30"}>
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link
                href="/signUp"
                variant="body2"
                color={dark ? "#FFF" : "#0C0B30"}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Link href="/login" variant="body2" color={dark ? "#FFF" : "#0C0B30"}>
            {"Login"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
