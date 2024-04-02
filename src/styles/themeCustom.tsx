import { createTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";

export const brand = {
  50: "#F0F7FF",
  100: "#CEE5FD",
  200: "#9CCCFC",
  300: "#55A6F6",
  400: "#0A66C2",
  500: "#0959AA",
  600: "#064079",
  700: "#033363",
  800: "#02294F",
  900: "#021F3B",
};
export const customTheme = createTheme({
  typography: {
    htmlFontSize: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          boxShadow: "none",
          borderRadius: "10px",
          textTransform: "none",
          ...(ownerState.size === "small" && {
            maxHeight: "32px",
          }),
          ...(ownerState.size === "medium" && {
            height: "40px",
          }),
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
              color: brand[50],
              backgroundColor: brand[500],
              backgroundImage: `linear-gradient(to bottom, ${brand[400]}, ${brand[500]})`,
              boxShadow: `inset 0 1px ${alpha(
                brand[300],
                0.5
              )}, inset 0 -2px ${alpha(brand[700], 0.5)}`,
              border: `1px solid ${brand[500]}`,
              "&:hover": {
                backgroundColor: brand[400],
                backgroundImage: "none",
                boxShadow: `0 0 0 1px  ${alpha(brand[300], 0.5)}`,
              },
            }),
          ...(ownerState.variant === "outlined" && {
            backgroundColor: alpha(brand[300], 0.1),
            borderColor: brand[300],
            color: brand[500],
            "&:hover": {
              backgroundColor: alpha(brand[300], 0.3),
              borderColor: brand[200],
            },
          }),
          ...(ownerState.variant === "text" && {
            color: brand[500],
            "&:hover": {
              backgroundColor: alpha(brand[300], 0.3),
              borderColor: brand[200],
            },
          }),
          ...(theme.palette.mode === "dark" && {
            ...(ownerState.variant === "contained" &&
              ownerState.color === "primary" && {
                border: `1px solid ${brand[600]}`,
                backgroundImage: "none",
                backgroundColor: brand[500],
                "&:hover": {
                  background: brand[600],
                  backgroundImage: "none",
                  boxShadow: `0 0 0 1px  ${alpha(brand[700], 0.5)}`,
                },
              }),
            ...(ownerState.variant === "outlined" && {
              backgroundColor: alpha(brand[600], 0.1),
              borderColor: brand[700],
              color: brand[300],
              "&:hover": {
                backgroundColor: alpha(brand[600], 0.3),
                borderColor: brand[700],
              },
            }),
            ...(ownerState.variant === "text" && {
              color: brand[300],
              "&:hover": {
                backgroundColor: alpha(brand[600], 0.3),
                borderColor: brand[700],
              },
            }),
          }),
        }),
      },
    },
  },
});
