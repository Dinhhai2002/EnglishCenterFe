import userApiService from "@/services/API/UserApiService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import InputPassword from "@/components/InputPassword/InputPassword";
import { ValidateInput, validateSchema } from "./ValidateFormChangePassword";

function ChangePassword() {
  const [isError, setIsError] = useState(false);
  const [error, SetError] = useState("");

  // validate
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
    if (values.newPassword !== values.passwordConfirm) {
      SetError("Mật khẩu mới và xác nhận mật khẩu không trùng khớp!");
      return;
    }
    userApiService
      .changePassword(
        values.oldPassword,
        values.newPassword,
        values.passwordConfirm
      )
      .then((data: any) => {
        SetError("Thay đổi mật khẩu thành công!");
        // toast.success(`Thay đổi mật khẩu thành công!`);
      })
      .catch((error: any) => {
        setIsError(true);
        SetError(error.message);
      });
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmitHandler)}
        autoComplete="off"
        noValidate
        sx={{ mt: 1 }}
      >
        {error != "" && (
          <Alert color="info" severity="info">
            {error}
          </Alert>
        )}

        <InputPassword
          errors={errors}
          name="oldPassword"
          label="Mật khẩu cũ"
          register={register}
        />

        <InputPassword
          errors={errors}
          name="newPassword"
          label="Mật khẩu mới"
          register={register}
        />

        <InputPassword
          errors={errors}
          name="passwordConfirm"
          label="Xác nhận mật khẩu"
          register={register}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
          <Button variant="outlined" type="submit" autoFocus>
            Thay đổi mật khẩu
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default ChangePassword;
