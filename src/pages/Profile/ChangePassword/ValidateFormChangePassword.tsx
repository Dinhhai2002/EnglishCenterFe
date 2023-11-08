import { object, string, TypeOf } from "zod";

export const validateSchema = object({
  oldPassword: string().trim()
    .nonempty("Mật khẩu cũ là bắt buộc")
    .min(8, "Mật khẩu tối thiểu là 8 kí tự")
    .max(20, "Mật khẩu tối đa là 20 kí tự")
    .refine(
      (value) => {
        const regexPattern =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/;
        return regexPattern.test(value);
      },
      {
        message:
          "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số, và một kí tự đặc biệt",
      }
    ),
  newPassword: string().trim()
    .nonempty("Mật khẩu mới là bắt buộc")
    .min(8, "Mật khẩu tối thiểu là 8 kí tự")
    .max(20, "Mật khẩu tối đa là 20 kí tự")
    .refine(
      (value) => {
        const regexPattern =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/;
        return regexPattern.test(value);
      },
      {
        message:
          "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số, và một kí tự đặc biệt",
      }
    ),
  passwordConfirm: string().trim()
    .nonempty("Xác nhận Mật khẩu là bắt buộc")
    .min(8, "Xác nhận Mật khẩu tối thiểu là 8 kí tự")
    .max(20, "Xác nhận Mật khẩu tối đa là 20 kí tự"),
}).refine((data) => data.newPassword === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "mật khẩu mới và xác nhận mật khẩu không trùng khớp",
});

export type ValidateInput = TypeOf<typeof validateSchema>;
