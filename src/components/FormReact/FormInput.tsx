import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const FormInput = ({ name, defaultValue, type, ...otherProps }: any) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          {...otherProps}
          {...field}
          type={type}
          error={!!errors[name]}
          helperText={errors[name] ? errors[name]?.message : ""}
        />
      )}
    />
  );
};

export default FormInput;
