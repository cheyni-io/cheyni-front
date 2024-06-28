import * as React from "react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Card, CardContent, CardActions, Button, Divider } from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";

export default function AuthorProfileScreen() {
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        marginBottom: 16,
        backgroundColor: "#FFF",
        height: { xs: "100%", sm: "100%", md: "100%" },
        paddingY: 16,
      }}
    >
      {/* Capa de fundo */}
      <Box
        sx={{
          width: "100%",
          height: "300px", // Defina a altura da capa
          backgroundImage: `url("/assets/cheyniBackProfile.png")`,
          backgroundSize: "cover", // Faz a imagem cobrir todo o espaço disponível
          backgroundPosition: "center", // Centraliza a imagem
          marginBottom: 4,
          position: "relative", // Permite que filhos usem posição absoluta relativa a este pai
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: { xs: "160px", sm: "200px" }, // Ajuste este valor conforme necessário para posicionar a box
            left: { xs: "8px", sm: "16px" }, // Ajuste este valor conforme necessário para posicionar a box
            zIndex: 1, // Garante que a box esteja sobre a imagem de fundo
            width: { xs: "90%", sm: "300px" }, // Ajuste a largura conforme necessário
            backgroundColor: "#0c0b30",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            height: "fit-content",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: 2,
            padding: "16px", // Adicione padding para evitar que o conteúdo encoste nas bordas
          }}
        >
          <Box sx={{ marginTop: 4 }}>
            <img src="https://via.placeholder.com/150" alt="Author" />
            <Typography variant="h5" sx={{ color: "#fff" }}>
              Author Name
            </Typography>
            <Typography variant="h6" sx={{ color: "#fff" }}>
              Description of the author
            </Typography>
            <Typography variant="h6" sx={{ color: "#fff" }}>
              Place
            </Typography>
            {/* Box with socials */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <Link href="#" sx={{ color: "#fff", mx: 1 }}>
                <Facebook />
              </Link>
              <Link href="#" sx={{ color: "#fff", mx: 1 }}>
                <Instagram />
              </Link>
            </Box>
            <Divider
              sx={{
                mt: 2,
                width: "100%",
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            />
            <Typography variant="h6" sx={{ color: "#fff", mt: 2 }}>
              Total videos: 10
            </Typography>
            <Typography variant="h6" sx={{ color: "#fff" }}>
              Total tokens: 100
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn={{ xs: "span 12", md: "span 3" }}></Box>{" "}
        {/* Esta box está vazia, pois a box esquerda está agora em posição absoluta */}
        <Box gridColumn={{ xs: "span 12", md: "span 8" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" sx={{ color: "#0c0b30" }}>
              Author's Videos
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Video Title
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Description of the video
                  </Typography>
                  <Typography variant="body2">
                    Status: <strong>Available</strong>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Watch Video</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Video Title
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Description of the video
                  </Typography>
                  <Typography variant="body2">
                    Status: <strong>Soon</strong>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Watch Video</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
