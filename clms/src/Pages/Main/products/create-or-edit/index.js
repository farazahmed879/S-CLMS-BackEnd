import { Grid } from "@mui/material";
import CustomInputComponent from "../../../../Components/custom-input";
import CustomButton from "../../../../Components/custom-button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../../../../service/common-service";
import { EndPoints } from "../../../../Configs/end-points";
import { useState } from "react";

const CreateOrEditProductComponent = () => {

  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const defaultValues = {
    name: "",
    version: "",
    description: "",
  };

  const schema = yup.object().shape({
    name: yup.string().required(),
    version: yup.string().required(),
    description: yup.string(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async(form) => {
    try {
      setIsloading(true);
      const url = EndPoints.products;
      const result = await apiCall("post", url,form);
      if (result) console.log("asda")
      setIsloading(false);
    } catch (errors) {
      setIsloading(false);
      console.log(errors);
    }
  };
  const handleCancel = () => {
    return navigate("main");
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CustomInputComponent
            control={control}
            name="name"
            title="Product Name"
            errors={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomInputComponent
            control={control}
            name="version"
            title="Version"
            errors={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomInputComponent
            control={control}
            name="description"
            title="Description"
            errors={errors}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton variant="contained" type="submit">
            Add
          </CustomButton>
          <CustomButton variant="outlined" onClick={handleCancel}>
            Back
          </CustomButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateOrEditProductComponent;
