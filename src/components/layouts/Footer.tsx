import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Stack, IconButton, Button, ButtonGroup, Grid } from "@mui/material";

export default function Footer() {
  return (
    <Box
      display="flex"
      justifyContent={"center"}
      bgcolor="red"
      height={400}
      boxShadow={20}
      sx={{
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: "#0c0b30",
        opacity: 0.9,
        color: "#FFF",
        padding: 2,
      }}
    >
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        mt={4}
      >
        <Box display="flex" justifyContent="center">
          <img
            src="/assets/logo-light.png"
            alt="Cheyni"
            style={{ width: "40%", marginRight: 2 }}
          />
          <Divider
            orientation="horizontal"
            variant="middle"
            flexItem
            sx={{
              borderWidth: 1,
              borderColor: "white",
              mr: 2,
              ml: 2,
            }}
          />
          <Typography color="#FFF" sx={{ alignSelf: "center", fontSize: 16 }}>
            UNLOCK LOYALTY WITH <b>STREAMING COLLECTIBLES</b>
          </Typography>
        </Box>
        <Divider
          orientation="horizontal"
          variant="middle"
          flexItem
          sx={{
            borderWidth: 1,
            borderColor: "white",
            mr: 2,
            ml: 2,
            mt: 6,
          }}
        />
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography color="#FFF">
            Get the latest milestone updates by joining the newsletter
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Link href="#" sx={{ color: "#FFF", fontSize: 12 }}>
            Main Page
          </Link>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{
              borderWidth: 1,
              borderColor: "white",
              mr: 1,
              ml: 1,
            }}
          />
          <Link href="#" sx={{ color: "#FFF", fontSize: 12 }}>
            Screening Room
          </Link>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{
              borderWidth: 1,
              borderColor: "white",
              mr: 1,
              ml: 1,
            }}
          />
          <Link href="#" sx={{ color: "#FFF", fontSize: 12 }}>
            Team & RoadMap
          </Link>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{
              borderWidth: 1,
              borderColor: "white",
              mr: 1,
              ml: 1,
            }}
          />
          <Link href="#" sx={{ color: "#FFF", fontSize: 12 }}>
            Get Involved
          </Link>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{
              borderWidth: 1,
              borderColor: "white",
              mr: 1,
              ml: 1,
            }}
          />
          <Link href="#" sx={{ color: "#FFF", fontSize: 12 }}>
            Blog
          </Link>
          <Link href="#" sx={{ color: "#FFF", fontSize: 12 }}>
            Join the newsletter
          </Link>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{
              borderWidth: 1,
              borderColor: "white",
              mr: 1,
              ml: 1,
            }}
          />
          <Link href="#" sx={{ color: "#FFF", fontSize: 12 }}>
            Contact Us
          </Link>
        </Box>
        {/* <Box display={{ xs: "none", md: "flex" }} justifyContent="left" mt={4}>
          <Stack direction={"column"}>
            <Typography align="left" mb={2} color={"#FFF"}>
              main project advisors
            </Typography>
            <Box display="flex">
              <img
                src="/assets/logo3.png"
                alt="Cheyni"
                style={{
                  width: "40px",
                  height: "30px",
                  marginRight: 10,
                }}
              />
              <img
                src="/assets/logo4.png"
                alt="Cheyni"
                style={{
                  width: "80px",
                  height: "30px",
                  marginRight: 10,
                }}
              />
              <img
                src="/assets/logo5.png"
                alt="Cheyni"
                style={{
                  width: "80px",
                  height: "30px",
                  marginRight: 2,
                }}
              />
              <img
                src="/assets/logo2.png"
                alt="Cheyni"
                style={{
                  width: "80px",
                  height: "30px",
                  marginRight: 10,
                }}
              />
              <img
                src="/assets/logo6.png"
                alt="Cheyni"
                style={{
                  width: "50px",
                  height: "10px",
                  marginRight: "10px",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              />
              <img
                src="/assets/logo7.png"
                alt="Cheyni"
                style={{
                  width: "150px",
                  height: "30px",
                  marginRight: "10px",
                }}
              />
              <img
                src="/assets/logo8.png"
                alt="Cheyni"
                style={{
                  width: "100px",
                  height: "30px",
                  marginRight: "10px",
                }}
              />
              <img
                src="/assets/logo9.png"
                alt="Cheyni"
                style={{
                  width: "120px",
                  height: "30px",
                  marginRight: 4,
                }}
              />
            </Box>
          </Stack>
        </Box> */}
        <Box display="flex" justifyContent="center" mt={6}>
          <Typography color="#FFF" fontSize={12}>
            STATION F, Paris/France S Parv. Alan Turing, 75013 & All rights
            reserved © 2021 - {new Date().getFullYear()} |{" "}
            <Link href="#" sx={{ color: "#FFF", fontSize: 12 }}>
              Terms And Conditions
            </Link>{" "}
            |
            <Link href="#" sx={{ color: "#FFF", fontSize: 12 }}>
              {" "}
              Privacy Policy
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

{
  /* <Box sx={{ position: "relative", zIndex: 0 }}>
<Box
  sx={{
    mb: 3,
    pb: { xs: '140%', md: '30%' }, // Set the padding bottom to 10 on medium and larger screens
    top: 0,
    left: 0,
    right: 0,
    position: "relative",
    height: "990%",
  }}
>
  <Box
    sx={{
      width: "100%",
      height: "100%", // Set the height to "100%" to cover the entire parent Box
      position: "absolute",
    }}
  >
    <>
      <Box
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: "absolute",
        }}
      >
        <video
          src="./assets/footerVideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: "absolute",
            backgroundImage: `url('./assets/transparentDot.png')`,
            backgroundSize: "10%", // Ou experimente outros valores como "50%" ou "auto"
            opacity: 0.5,
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: "absolute",
            backgroundColor: "#000",
            opacity: "65%",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            marginTop: 5,
            top:"30%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            textAlign: "center",
          }}
        >
          <Box
            display="flex"
            justifyContent="left"
            alignItems="center"
            sx={{
              fontFamily: "Futura",
            }}
            marginTop={{ xs: 20, md: 4 }}
          >
            <img
              src="/assets/logo-light.png"
              alt="Cheyni"
              style={{ width: "40%", marginRight: 2 }}
            />
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{
                borderWidth: 1,
                borderColor: "white",
                mr: 2,
                ml: 2,
              }}
            />
            <Typography color="#FFF">
              UNLOCK LOYALTY WITH <b>STREAMING COLLECTIBLES</b>
            </Typography>
          </Box>
          <Box display="flex" justifyContent="left" mt={4}>
            <Button
              sx={{
                borderRadius: 8,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                padding: 2,
                color: "#FFF",
                "&:hover": {
                  backgroundColor: "#FFF",
                  color: "#0C0B30",
                },
              }}
            >
              Join the newsletter
            </Button>
            <Button
              sx={{
                borderRadius: 8,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                padding: 2,
                color: "#FFF",
                ml: 2,
                "&:hover": {
                  backgroundColor: "#FFF",
                  color: "#0C0B30",
                },
              }}
            >
              Contact Us
            </Button>
          </Box>
          <Box display="flex" justifyContent="left" mt={4}>
            <Typography color="#FFF">
              Get the latest milestone updates by joining the newsletter
            </Typography>
          </Box>
          <Box display="flex" justifyContent="left" mt={2}>
            <Link href="#" sx={{ color: "#FFF", fontSize: 12 }}>
              Main Page
            </Link>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{
                borderWidth: 1,
                borderColor: "white",
                mr: 1,
                ml: 1,
              }}
            />
            <Link href="#" sx={{ color: "#FFF", fontSize: 12 }}>
              Screening Room
            </Link>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{
                borderWidth: 1,
                borderColor: "white",
                mr: 1,
                ml: 1,
              }}
            />
            <Link href="#" sx={{ color: "#FFF", fontSize: 12 }}>
              Team & RoadMap
            </Link>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{
                borderWidth: 1,
                borderColor: "white",
                mr: 1,
                ml: 1,
              }}
            />
            <Link href="#" sx={{ color: "#FFF", fontSize: 12 }}>
              Get Involved
            </Link>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{
                borderWidth: 1,
                borderColor: "white",
                mr: 1,
                ml: 1,
              }}
            />
            <Link href="#" sx={{ color: "#FFF", fontSize: 12 }}>
              Blog
            </Link>
          </Box>
          <Box display={{ xs: "none", md: "flex" }} justifyContent="left" mt={4}>
            <Stack direction={"column"}>
              <Typography align="left" mb={2} color={"#FFF"}>
                main project advisors
              </Typography>
              <Box display="flex">
                <img
                  src="/assets/logo3.png"
                  alt="Cheyni"
                  style={{
                    width: "40px",
                    height: "30px",
                    marginRight: 10,
                  }}
                />
                <img
                  src="/assets/logo4.png"
                  alt="Cheyni"
                  style={{
                    width: "80px",
                    height: "30px",
                    marginRight: 10,
                  }}
                />
                <img
                  src="/assets/logo5.png"
                  alt="Cheyni"
                  style={{
                    width: "80px",
                    height: "30px",
                    marginRight: 2,
                  }}
                />
              </Box>
            </Stack>
            <Stack direction={"column"} ml={12}>
              <Typography align="left" mb={2} color="#FFF">
                main project advisors
              </Typography>
              <Box display="flex">
                <img
                  src="/assets/logo2.png"
                  alt="Cheyni"
                  style={{
                    width: "80px",
                    height: "30px",
                    marginRight: 10,
                  }}
                />
                <img
                  src="/assets/logo6.png"
                  alt="Cheyni"
                  style={{
                    width: "50px",
                    height: "10px",
                    marginRight: "10px",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                />
                <img
                  src="/assets/logo7.png"
                  alt="Cheyni"
                  style={{
                    width: "150px",
                    height: "30px",
                    marginRight: "10px",
                  }}
                />
                <img
                  src="/assets/logo8.png"
                  alt="Cheyni"
                  style={{
                    width: "100px",
                    height: "30px",
                    marginRight: "10px",
                  }}
                />
                <img
                  src="/assets/logo9.png"
                  alt="Cheyni"
                  style={{
                    width: "120px",
                    height: "30px",
                    marginRight: 4,
                  }}
                />
              </Box>
            </Stack>
          </Box>
          <Box display="flex" justifyContent="center" mt={6}>
            <Typography color="#FFF" fontSize={12}>
              STATION F, Paris/France S Parv. Alan Turing, 75013 & All
              rights reserved © 2021 - {new Date().getFullYear()} |{" "}
              <Link href="#" sx={{ color: "#FFF", fontSize: 12 }}>
                Terms And Conditions
              </Link>{" "}
              |
              <Link href="#" sx={{ color: "#FFF", fontSize: 12 }}>
                {" "}
                Privacy Policy
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  </Box>
</Box>
</Box> */
}
