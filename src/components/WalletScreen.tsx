import * as React from "react";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles, styled, useTheme, withStyles } from "@mui/material/styles";
import api from "src/services/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardActions, Stack, Alert } from "@mui/material";

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
        height: { xs: "100%", md: "100vh" },
      }}
    >
      <Typography component="h1" variant="h1" marginBottom={4} marginTop={10}>
        Wallet
      </Typography>
      <Alert severity="info" sx={{ margin: 10 }}>
        Welcome to your watching treasure! Every token collected brings you
        closer to exciting rewards! Watch your balance grow as you explore
        abundance. Soon, you'll have the thrilling opportunity to exchange your
        tokens for the coveted $CHEYNI and unlock a world of exclusive
        privileges and perks! Stay tuned for email notifications about giveaways
        and airdrops. Stick with us for a thrilling journey and enjoy reaping
        the rewards! <br /> Follow us on social media and join our Discord channel:
        <Link href="#" color={'#0C0B30'}> Instagram</Link> |<Link href="#"> Twitter </Link>  | <Link href="#"> Discord</Link> 
      </Alert>
      <Typography component="h4" variant="h4" marginBottom={4}>
        Watching Counter: {userData.nfTokenAndUser?.length}
      </Typography>
      <Grid container spacing={2} padding={10}>
        {userData.nfTokenAndUser?.map((tokenAndUser: any, index: any) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                minHeight: 300,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 2,
                backgroundColor: "#191761",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
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
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={'./assets/nftMemes.png'}
                    alt={tokenAndUser.nftoken.name}
                    style={{ width: 200, height: 200 }}
                  />
                </Box>
                
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
                    {tokenAndUser.nftoken.hash}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
