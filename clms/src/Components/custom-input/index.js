import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import CustomTextComponent from "../custom-text";

const CustomInputComponent = ({
  name = "",
  errors,
  control,
  title = "",
  variant = "outlined",
  placeholder = "",
  required = false,
  type = "text",
}) => {
  return (
    <>   
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        type={type}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
          id='outlined-basic'
            sx={{ marginTop: 2 }}
            fullWidth
            label={title}
            variant={variant}
            placeholder={placeholder}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
          />
        )}
      />
      {errors[name] && <CustomTextComponent data={errors[name]} />}
    </>
  );
};
export default CustomInputComponent;
