import { routes } from "@/routes/routes";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import InputText from "@/components/InputText/InputText";
import { LoadingButton } from "@mui/lab";
import { Grid, Paper } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import authenticationApiService from "../../services/API/AuthenticationApiService";
import styles from "./ForgotPassword.module.scss";
import { ValidateInput, validateSchema } from "./ValidateFormForgotPassword";

const cx = classNames.bind(styles);


export default function ForgotPassword() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // validate
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<ValidateInput>({
    resolver: zodResolver(validateSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<ValidateInput> = (values: any) => {
    setLoading(true);
    authenticationApiService
      .OtpForgot(values.name, values.email)
      .then((data: any) => {
        localStorage.setItem("username", values.name);
        localStorage.setItem("email", values.email);
        localStorage.setItem("typeOtp", "1");
        navigate(routes.OTP);
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(`${error.message}`);
      });
  };

  return (
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          className={cx("body")}
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage: Logo,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        ></Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Link to={routes.Home}>
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
            </Link>
            <Typography component="h1" variant="h5">
              Quên mật khẩu
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmitHandler)}
              autoComplete="off"
              noValidate
              sx={{ mt: 1 }}
            >
              <InputText
                errors={errors}
                register={register}
                autoFocus={true}
                name="name"
                label="Tên người dùng"
              />
              <InputText
                errors={errors}
                register={register}
                  name="email"
                label="Email"
              />

              <LoadingButton
                variant="contained"
                fullWidth
                type="submit"
                loading={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </LoadingButton>
              <Grid container sx={{ mt: 2 }}>
                <Grid item xs>
                  <Link className={cx("link")} to={routes.Login}>
                    Đã có tài khoản?Đăng nhập
                  </Link>
                </Grid>
                <Grid item>
                  <Link className={cx("link")} to={routes.Register}>
                    Chưa có tài khoản?Đăng kí
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}
