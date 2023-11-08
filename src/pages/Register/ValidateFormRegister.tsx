import { object, string, TypeOf } from "zod";

export const validateSchema = object({
  name: string()
    .trim()
    .nonempty("Tên người dùng không được trống")
    .max(32, "Tên người dùng tối đa là 32 kí tự"),
  fullName: string()
    .trim()
    .nonempty("Tên đầy đủ người dùng không được trống")
    .max(32, "Tên người dùng tối đa là 32 kí tự"),
  email: string()
    .trim()
    .nonempty("Email là bắt buộc")
    .email("Email không hợp lệ"),
  phone: string()
    .trim()
    .nonempty("số điện thoại là bắt buộc")
    .refine((value) => /^(\+\d{1,3}[- ]?)?\d{9,}$/.test(value), {
      message: "số điện thoại không hợp lệ",
    }),
  password: string()
    .trim()
    .nonempty("Mật khẩu là bắt buộc")
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
  passwordConfirm: string().trim().nonempty("Xác nhận Mật khẩu là bắt buộc"),
  fullAddress: string()
    .nonempty("Địa chỉ người dùng không được trống")
    .max(255, "Địa chỉ người dùng tối đa là 255 kí tự"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "mật khẩu không trùng khớp",
});

export type ValidateInput = TypeOf<typeof validateSchema>;
