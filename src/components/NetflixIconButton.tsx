import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { forwardRef } from "react";

const CheyniIconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, sx, ...others }, ref) => {

    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
      <IconButton
        sx={{
          color: isDarkMode ? "grey.200" : "grey.700",
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: "grey.700",
          "&:hover, &:focus": {
            borderColor: "grey.200",
          },
          ...sx,
        }}
        {...others}
        ref={ref}
      >
        {children}
      </IconButton>
    );
  }
);

export default CheyniIconButton;
