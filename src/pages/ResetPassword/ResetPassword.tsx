import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import InputPassword from "@/components/InputPassword/InputPassword";
import { routes } from "@/routes/routes";
import { LoadingButton } from "@mui/lab";
import { Grid, Paper } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import authenticationApiService from "../../services/API/AuthenticationApiService";
import styles from "./ResetPassword.module.scss";
import { ValidateInput, validateSchema } from "./ValidateFormResetPassword";

const cx = classNames.bind(styles);

export default function ResetPassword() {
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
    const username = localStorage.getItem("username")
      ? localStorage.getItem("username")
      : "";

    authenticationApiService
      .resetPassword(username, values.password, values.passwordConfirm)
      .then((data: any) => {
        toast.success(`Thành công!`);
        localStorage.removeItem("username");
        setTimeout(() => {
          navigate(routes.Login);
        }, 3000);
      })
      .catch((error: any) => {
        setLoading(false);
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
            margin: 2,
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
            Thay đổi mật khẩu mới
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitHandler)}
            autoComplete="off"
            noValidate
            sx={{ mt: 1 }}
          >
            <InputPassword
              errors={errors}
              name="password"
              label="Mật khẩu"
              register={register}
            />
            <InputPassword
              errors={errors}
              name="passwordConfirm"
              label="Xác nhận mật khẩu"
              register={register}
            />

            <LoadingButton
              variant="contained"
              fullWidth
              type="submit"
              loading={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng kí
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
