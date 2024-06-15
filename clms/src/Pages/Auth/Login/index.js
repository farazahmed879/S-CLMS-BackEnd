import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../Components/custom-button";
import CustomCard from "../../../Components/custom-card";

const RegisterComponent = () => {
  const [formType, setFormType] = useState(0);
  const navigate = useNavigate();

  const handleClick = (type) => {
    setFormType(type);
  };

  const handleLogin = (values) => {
    return navigate("main");

    // if (values?.username && values?.password) {
    //   // Navigate to DrawerSideBar upon successful login
    // } else {
    //   console.log("Invalid username or password");
    // }
  };

  return (
    <div className="container-sm 540px">
      <div className="row">
        <div
          style={{
            padding: "30px",
            background: "#ececec",
            width: "500px",
          }}
        >
          <CustomCard
            title="Welcome to ScorEXEC"
            bordered={false}
            style={{ width: 500 }}
          >
            {formType === 0 && (
              <>
                <p>
                  Login to Stay Update: {"  "}
                  <CustomButton type="primary" onClick={() => handleClick(1)}>
                    Login
                  </CustomButton>{" "}
                  <CustomButton type="primary" onClick={() => handleClick(0)}>
                    Back
                  </CustomButton>{" "}
                </p>
                <p>
                  Not found?, Just signUp!{"  "}
                  <CustomButton type="primary" danger onClick={() => handleClick(2)}>
                    SignUp
                  </CustomButton>{" "}
                </p>
              </>
            )}
            {formType === 1 && <></>}
            {formType === 2 && <></>}
          </CustomCard>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
