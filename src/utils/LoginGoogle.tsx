import authenticationApiService from "@/services/API/AuthenticationApiService";
import userApiService from "@/services/API/UserApiService";
import { toast } from "react-toastify";

export const loginGoogleSuccess = async (response: any) => {
  await authenticationApiService
    .LoginGoogle(
      response.profileObj.email,
      response.profileObj.imageUrl,
      response.profileObj.name.trim()
    )
    .then((data: any) => {
      localStorage.setItem("token", data.data.token);
      userApiService.setToken(data.data.token);

      userApiService
        .getUser()
        .then((data: any) => {
          localStorage.setItem("user", JSON.stringify(data.data));
          window.location.href = "/";
        })
        .catch((error: any) => {
          toast.error(`${error.message}`);
        });
    })
    .catch((error: any) => {
      toast.error(`${error.message}`);
    });
};

export const loginGoogleError = (response: any) => {
  toast.error(`Đăng nhập thất bại!`);
};
