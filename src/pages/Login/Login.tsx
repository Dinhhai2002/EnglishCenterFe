import { zodResolver } from "@hookform/resolvers/zod";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert, Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import InputPassword from "@/components/InputPassword/InputPassword";
import InputText from "@/components/InputText/InputText";
import { routes } from "@/routes/routes";
import { loginGoogleError, loginGoogleSuccess } from "@/utils/LoginGoogle";
import { LoadingButton } from "@mui/lab";
import classNames from "classnames/bind";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import { SubmitHandler, useForm } from "react-hook-form";
import authenticationApiService from "../../services/API/AuthenticationApiService";
import userApiService from "../../services/API/UserApiService";
import styles from "./Login.module.scss";
import { ValidateInput, validateSchema } from "./ValidateFormLogin";
import { RoleEnum } from "@/utils/enum/RoleEnum";
import { AccountInvalid } from "@/utils/MessageToast";

const cx = classNames.bind(styles);

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // validate
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ValidateInput>({
    resolver: zodResolver(validateSchema),
  });

  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<ValidateInput> = async (values: any) => {
    setLoading(true);
    const dataLogin = await authenticationApiService.Login(
      values.name,
      values.password
    );
    if(dataLogin)
    {
      localStorage.setItem("token", dataLogin.data.token);
      userApiService.setToken(dataLogin.data.token);
      const dataUserDetail = await userApiService.getUser();
      localStorage.setItem("user", JSON.stringify(dataUserDetail.data));
      if (
        dataUserDetail.data.role === RoleEnum.TEACHER ||
        dataUserDetail.data.role === RoleEnum.ADMIN
      ) {
        toast.error(AccountInvalid);
        setLoading(false);
        return;
      }
      setLoading(false);
      window.location.href = "/";
    }
    setLoading(false);
    
    
  };

  // Dùng để xác thực xử lí đăng nhập google
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: `${process.env.REACT_APP_KEY_LOGIN_GOOGLE}`,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

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
            my: 8,
            mx: 4,
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
          {message !== "" && <Alert severity="info">{message}</Alert>}
          <Typography component="h3" variant="h5">
            Đăng Nhập
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

            <InputPassword
              errors={errors}
              name="password"
              label="Mật khẩu"
              register={register}
            />

            <LoadingButton
              variant="contained"
              fullWidth
              type="submit"
              loading={loading}
              sx={{ mt: 4, mb: 4, padding: 1 }}
            >
              Đăng Nhập
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link className={cx("link")} to={routes.ForgotPassword}>
                  Quên mật khẩu?
                </Link>
              </Grid>
              <Grid item>
                <Link className={cx("link")} to={routes.Register}>
                  Chưa có tài khoản?Đăng ký
                </Link>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }}>hoặc</Divider>

            <GoogleLogin
              className={cx("btn_google")}
              clientId={`${process.env.REACT_APP_KEY_LOGIN_GOOGLE}`}
              buttonText="Đăng nhập"
              onSuccess={(response) => {
                setLoading(true);
                loginGoogleSuccess(response);
                // setLoading(false);
              }}
              onFailure={(error) => {
                setLoading(true);
                loginGoogleError(error);
                // setLoading(false);
              }}
              // cookiePolicy={"*"}
              // isSignedIn={true}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
