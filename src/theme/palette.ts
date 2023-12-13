import type { PaletteMode } from "@mui/material";

const PRIMARY = {
  main: "#000",
  light: "#FF0000",
  dark: "#FF0000",
};

const lightTheme = {
  primary: { ...PRIMARY, contrastText: "#000" },
  mode: "light" as PaletteMode,
  background: { paper: "#FF0000", default: "#FF0000" },
  text: { primary: "#000", secondary: "#000", disabled: "#000" },
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
