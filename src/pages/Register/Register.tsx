import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

import { Divider, Paper } from "@mui/material";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import DropDown from "@/components/DropDown/DropDown";
import InputPassword from "@/components/InputPassword/InputPassword";
import InputText from "@/components/InputText/InputText";
import { routes } from "@/routes/routes";
import { loginGoogleError, loginGoogleSuccess } from "@/utils/LoginGoogle";
import { LoadingButton } from "@mui/lab";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import classNames from "classnames/bind";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import authenticationApiService from "../../services/API/AuthenticationApiService";
import styles from "./Register.module.scss";
import { ValidateInput, validateSchema } from "./ValidateFormRegister";

const cx = classNames.bind(styles);

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState("");

  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);

  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

  const handleChangeCity = (event: SelectChangeEvent) => {
    setCity(event.target.value);
    setWard("");
    setDistrict("");
  };

  const handleChangeDistrict = (event: SelectChangeEvent) => {
    setDistrict(event.target.value);
    setWard("");
  };
  const handleChangeWard = (event: SelectChangeEvent) => {
    setWard(event.target.value);
  };

  useEffect(() => {
    authenticationApiService.getAllCity().then((data) => {
      setListCity(data.data);
    });
  }, []);

  useEffect(() => {
    authenticationApiService
      .findWardByDistrictId(Number(district))
      .then((data) => {
        setListWard(data.data);
      });
  }, [district]);

  useEffect(() => {
    authenticationApiService.findDistrictByCityId(Number(city)).then((data) => {
      setListDistrict(data.data);
    });
  }, [city]);

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
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

  const onSubmitHandler: SubmitHandler<ValidateInput> = (values: any) => {
    setLoading(true);
    const formattedDate = dayjs(date).format("DD/MM/YYYY");
    const userRegister = {
      username: values.name,
      fullName: values.fullName,
      email: values.email,
      gender: 1,
      phone: values.phone,
      password: values.password,
      formattedDate: formattedDate,
      ward: Number(ward),
      district: Number(district),
      city: Number(city),
      fullAddress: values.fullAddress,
    };

    localStorage.setItem("userRegister", JSON.stringify(userRegister));

    authenticationApiService
      .OtpRegister(
        userRegister.username,
        userRegister.fullName,
        userRegister.email,
        userRegister.phone,
        userRegister.password,
        userRegister.gender,
        userRegister.formattedDate,
        userRegister.ward,
        userRegister.district,
        userRegister.city,
        userRegister.fullAddress
      )
      .then((data: any) => {
        localStorage.setItem("username", values.name);
        localStorage.setItem("email", values.email);
        localStorage.setItem("typeOtp", "0");
        navigate(routes.OTP);
      })
      .catch((error: any) => {
        setLoading(false);
      });
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
          <Typography component="h1" variant="h5">
            Đăng ký
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
              name="fullName"
              label="Tên đầy đủ"
            />

            <InputText
              errors={errors}
              register={register}
              name="email"
              label="Email"
            />

            {/* <FormControl
                sx={{ marginTop: 2, marginBottom: 2 }}
                fullWidth
                variant="outlined"
              > */}
            {/* <FormLabel id="demo-row-radio-buttons-group-label">
                Giới tính
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                {...register("gender")}
              >
                <FormControlLabel value={0} control={<Radio />} label="Nam" />
                <FormControlLabel value={1} control={<Radio />} label="Nữ" />
                <FormControlLabel value={2} control={<Radio />} label="Khác" />
              </RadioGroup>

              <FormHelperText error={!!errors["gender"]} id="gender">
                {errors["gender"] ? errors["gender"].message : ""}
              </FormHelperText> */}
            {/* </FormControl> */}
            <InputText
              type="number"
              errors={errors}
              register={register}
              name="phone"
              label="Số điện thoại"
            />

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

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Chọn ngày sinh"
                  value={date}
                  onChange={(newValue: any) => setDate(newValue)}
                  views={["year", "month", "day"]}
                />
              </DemoContainer>
            </LocalizationProvider>

            <DropDown
              isMargin={true}
              value={city}
              onChange={handleChangeCity}
              listValue={listCity}
              label="Tỉnh"
            />

            <DropDown
              isMargin={true}
              value={district}
              onChange={handleChangeDistrict}
              listValue={listDistrict}
              label="Huyện"
            />

            <DropDown
              isMargin={true}
              value={ward}
              onChange={handleChangeWard}
              listValue={listWard}
              label="Xã"
            />
            <InputText
              errors={errors}
              register={register}
              name="fullAddress"
              label="Địa chỉ cụ thể"
            />

            <LoadingButton
              variant="contained"
              fullWidth
              type="submit"
              loading={loading}
              sx={{ py: "0.8rem", mt: "1rem" }}
            >
              ĐĂNG KÝ
            </LoadingButton>
            <Grid container sx={{ mt: 2 }}>
              <Grid item xs>
                <Link className={cx("link")} to={routes.ForgotPassword}>
                  Quên mật khẩu?
                </Link>
              </Grid>
              <Grid item>
                <Link className={cx("link")} to={routes.Login}>
                  Đã có tài khoản?Đăng nhập
                </Link>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }}>hoặc</Divider>

            <GoogleLogin
              className={cx("btn_google")}
              clientId={`${process.env.REACT_APP_KEY_LOGIN_GOOGLE}`}
              buttonText="Đăng nhập"
              onSuccess={loginGoogleSuccess}
              onFailure={loginGoogleError}
              // cookiePolicy={"*"}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
