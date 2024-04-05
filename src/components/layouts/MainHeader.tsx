import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_BAR_HEIGHT } from "src/constant";
import useOffSetTop from "src/hooks/useOffSetTop";
import api from "src/services/api";
import { changeTheme } from "src/store/slices/themeSlice";
import CheyniNavigationLink from "../CheyniNavigationLink";
import Logo from "../Logo";
import SearchBox from "../SearchBox";

const pages = [""];

const MainHeader = () => {
  const theme2 = useTheme();
  const isDarkMode = theme2.palette.mode === "dark";
  const isOffset = useOffSetTop(APP_BAR_HEIGHT);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigation = useNavigate();

  const handleLogout = () => {
    handleCloseUserMenu();
    localStorage.removeItem("accessToken");
    navigation("/login");
  };

  const handleGoToProfile = () => {
    handleCloseUserMenu();
    navigation("/profile");
  };

  const handleGoToWallet = () => {
    handleCloseUserMenu();
    navigation("/wallet");
  };

  const theme = useSelector((state: any) => state.theme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(changeTheme());
  };

  const token = localStorage.getItem("accessToken");

  const [display, setDisplay] = React.useState<string>(() => {
    const token = localStorage.getItem("accessToken");
    return token === null ? "none" : "flex";
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token === null) {
      // navigation("/login");
      setDisplay("none");
    } else {
      setDisplay("flex");
    }
  }, [setDisplay, navigation]);

  const tokens = localStorage.getItem("accessToken");
  const [userData, setUserData] = useState({
    name: "",
    avatar: "",
    birthDate: null,
    email: "",
    password: "",
  });

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
          avatar: response.data.avatar,
          birthDate: response.data.birthDate,
          email: response.data.email,
          password: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [tokens]);

  const handleSearchResults = (results: any[]) => {
    console.log("Search results:", results);
  };

  return (
    <AppBar
      sx={{
        // px: "4%",
        px: "60px",
        height: APP_BAR_HEIGHT,
        backgroundImage: "none",
        ...(isOffset
          ? {
              bgcolor: isDarkMode
                ? theme2.palette.primary.dark
                : theme2.palette.primary.light,
              boxShadow: (theme) => theme.shadows[4],
            }
          : {
              boxShadow: 0,
              bgcolor: isDarkMode
                ? theme2.palette.primary.dark
                : theme2.palette.primary.light,
            }),
      }}
    >
      <Toolbar disableGutters>
        <Logo sx={{ mr: { xs: 15, sm: 4 } }} />
        <Stack
          direction="row"
          spacing={3}
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
        >
          {pages.map((page) => (
            <CheyniNavigationLink
              to=""
              variant="subtitle1"
              key={page}
              onClick={handleCloseNavMenu}
            >
              {page}
            </CheyniNavigationLink>
          ))}
        </Stack>

        <Box sx={{ flexGrow: 0, display: "flex" }}>
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <SearchBox onSearchResults={handleSearchResults} />
          <Tooltip title="Open settings">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0, display: display }}
            >
              {userData.avatar ? (
                userData.avatar
              ) : (
                <Avatar alt={userData.name} src={userData.name} />
              )}
            </IconButton>
          </Tooltip>
          {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleGoToProfile}>Profile</MenuItem>
              <MenuItem onClick={handleGoToWallet}>Wallet</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box> */}
          <Menu
            sx={{ mt: "45px" }}
            id="avatar-menu"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleGoToProfile}>Profile</MenuItem>
            <MenuItem onClick={handleGoToWallet}>Wallet</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default MainHeader;
