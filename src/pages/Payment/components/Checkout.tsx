import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";

import { PaletteMode } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import AddressForm from "./AddressForm";
import getCheckoutTheme from "./getCheckoutTheme";
import Info from "./Info";
import imageHeader from "@/assets/image/Header.png";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import authenticationApiService from "@/services/API/AuthenticationApiService";
import paymentApiService from "@/services/API/PaymentApiService";
import { Course } from "@/types/Course";
import utils from "@/utils/Utils";

const logoStyle = {
  width: "140px",
  height: "40px",
  marginLeft: "-4px",
  marginRight: "-8px",
};

export default function Checkout() {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const checkoutTheme = createTheme(getCheckoutTheme(mode));

  const [course, setCourse] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  const { id } = useParams();

  useLayoutEffect(() => {
    authenticationApiService
      .getDetailCourse(Number(id))
      .then((data: any) => {
        setCourse(data.data);
        localStorage.setItem("course", JSON.stringify(data.data));
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
      });
  }, []);

  return (
    <ThemeProvider theme={checkoutTheme}>
      <CssBaseline />
      <Grid
        container
        sx={{ height: { xs: "100%", sm: "100dvh" }, marginTop: 12 }}
      >
        <Grid
          item
          sm={12}
          md={7}
          lg={7}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "start",
            pt: { xs: 2, sm: 4 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: { sm: "100%", md: 700 },
              maxHeight: "720px",
              gap: { xs: 5, md: "none" },
            }}
          >
            <AddressForm />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          lg={5}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "start",
            pt: 4,
            px: 10,
            gap: 4,
            mt: 6,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: 500,
            }}
          >
            <Info course={course} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
