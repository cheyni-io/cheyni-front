import type { PaletteMode } from "@mui/material";

const PRIMARY = {
  main: "#000",
  light: "#FFF",
  dark: "#0C0B30",
};

const lightTheme = {
  primary: { ...PRIMARY, contrastText: "#0C0B30" },
  mode: "light" as PaletteMode,
  background: { paper: "#FFF", default: "#FFF" },
  text: { primary: "#0C0B30", secondary: "#0C0B30", disabled: "#000" },
};

// Separate Dark Theme
const darkTheme = {
  primary: { ...PRIMARY, contrastText: "#fff" },
  mode: "dark" as PaletteMode,
  background: { paper: "#0c0b30", default: "#0C0B30" },
  text: { primary: "#fff", secondary: "#fff", disabled: "#fff" },
};

const palette = { light: lightTheme, dark: darkTheme };

export default palette;
