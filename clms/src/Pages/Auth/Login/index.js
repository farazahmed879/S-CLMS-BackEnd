import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../Components/custom-button";
import CustomCard from "../../../Components/custom-card";
import { CardActions, CardContent, CardHeader, CircularProgress, Grid } from "@mui/material";
import CustomInputComponent from "../../../Components/custom-input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { AuthenticateEndPoints } from "../../../Configs/end-points";

const RegisterComponent = () => {
  const [formType, setFormType] = useState(0);
  const [isLoading, setIsloading] = useState(false);

  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleClick = (type) => {
    setFormType(type);
  };

  const onSubmit = async (form) => {
    handleGetToken(form);
  };

  const handleGetToken = async (form) => {
    try {
      const data = {
        username: form.username,
        password: form.password,
      };

      setIsloading(true);
      const result = await axios.post(AuthenticateEndPoints.login, data);
      setIsloading(false);

      if (result) {
        localStorage.setItem("token", result?.data?.token);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            userId: result?.data?.userId,
            role: result?.data?.role,
          })
        );
        navigate("/");
      }
    } catch (errors) {
      setIsloading(false);
      console.log(errors);
    }
  };

  return (
    <div
      className="container-sm 540px"
      style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
    >
      <div className="row">
        <div
          style={{
            padding: "30px",
            background: "#ececec",
            width: "500px",
          }}
        >
          {isLoading && <CircularProgress />}
          <CustomCard style={{ width: 500 }}>
            <CardHeader></CardHeader>
            <CardContent>
              <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Grid container>
                  {formType === 0 && (
                    <>
                      <p>
                        Login to Stay Update: {"  "}
                        <CustomButton
                          variant="contained"
                          onClick={() => handleClick(1)}
                        >
                          Login
                        </CustomButton>
                        <CustomButton
                          variant="outlined"
                          onClick={() => handleClick(0)}
                        >
                          Back
                        </CustomButton>
                      </p>
                      <p>
                        Not found?, Just signUp!{"  "}
                        <CustomButton
                          type="primary"
                          danger
                          onClick={() => handleClick(2)}
                        >
                          SignUp
                        </CustomButton>{" "}
                      </p>
                    </>
                  )}
                  {formType === 1 && (
                    <>
                      <Grid item xs={12}>
                        <CustomInputComponent
                          control={control}
                          title="Username"
                          name="username"
                          errors={errors}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomInputComponent
                          control={control}
                          title="Password"
                          name="password"
                          errors={errors}
                          type="password"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomButton variant="contained" type="submit">
                          Login
                        </CustomButton>
                        <CustomButton
                          variant="outlined"
                          onClick={() => handleClick(0)}
                        >
                          Back
                        </CustomButton>
                      </Grid>
                    </>
                  )}
                  {formType === 2 && <></>}
                </Grid>
              </form>
            </CardContent>
            <CardActions></CardActions>
          </CustomCard>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
