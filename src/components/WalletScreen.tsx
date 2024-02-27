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
import CustomizedTables from "./CustomTable";
import { useEffect, useState } from "react";
import { Card, CardContent, CardActions, Stack } from "@mui/material";

interface UserData {
  name: string;
  birthDate: Date | null;
  email: string;
  password: string;
  nfTokenAndUser?: any;
}

export default function Wallet() {
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    name: "",
    birthDate: null,
    email: "",
    password: "",
  });
  const tokens = localStorage.getItem("accessToken");
  const [hash, setHash] = useState("");
  const [image, setImage] = useState("");
  useEffect(() => {
    api
      .get("/auth", {
        headers: {
          Authorization: `Bearer ${tokens}`,
        },
      })
      .then((response) => {
        setUserData({
          name: response.data.name,
          birthDate: response.data.birthDate,
          email: response.data.email,
          password: "",
          nfTokenAndUser: response.data.nfTokenAndUser,
        });
        console.log(userData.nfTokenAndUser.length)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [initials, setInitials] = useState("");
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  useEffect(() => {
    setInitials(getInitials(userData.name));
  }, []);

  //Generate random hash for each token
  const generateHash = () => {
    return Math.random().toString(36).substring(7);
  };

  useEffect(() => {
    setHash(generateHash() + "-" + getInitials(userData.name));
  }, []);

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16
        }}
      >
        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
        <Typography component="h1" variant="h5" marginBottom={4}>
          Wallet
        </Typography>
        <Box>
          <Stack spacing={{ xs: 1, sm: 2 }} direction="row" flexWrap="wrap">
            {/* {userData.nfTokenAndUser.length > 0 ? <h1> a </h1> : <h1> b </h1>} */}
            {userData.nfTokenAndUser?.map((tokenAndUser: any, index: any) => (
              <Card
                sx={{
                  minWidth: 275,
                  minHeight: 300,
                  backgroundImage: "url('./assets/nftMemes.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#191761"
                }}
              >
                <CardContent
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <div>
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "white",
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                      }}
                      gutterBottom
                    >
                      <b>{tokenAndUser.nftoken.name}</b>
                    </Typography>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <Typography
                      sx={{
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                      }}
                      color="white"
                    >
                      {tokenAndUser.nftoken.token}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
                      color="white"
                    >
                      {hash}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
