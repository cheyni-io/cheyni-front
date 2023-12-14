import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { ReactNode } from "react";

export default function MaturityRate({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const darkMode = theme.palette.mode === "dark";
  return (
    <Box
      sx={{
        py: 1,
        pl: 1.5,
        pr: 3,
        fontSize: 22,
        display: "flex",
        alignItem: "center",
        color: darkMode ? "#dcdcdc" : "#333333",
        border: darkMode ? "3px #dcdcdc" : "3px #333333",
        borderLeftStyle: "solid",
        bgcolor: darkMode ? "#333333" : "#dcdcdc",
      }}
    >
      {children}
    </Box>
  );
}
