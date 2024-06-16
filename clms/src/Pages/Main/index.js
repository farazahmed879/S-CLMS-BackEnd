import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CustomDrawerComponent from "../../Components/custom-sidebar/sidebar";
import { Route, Routes } from "react-router-dom";
import ProductsComponent from "./products";
import ProductLicenseComponent from "./product-license";
import DashboardComponent from "./dashboard";
import CreateOrEditProductComponent from "./products/create-or-edit";

const drawerWidth = 240;
const MainComponent = () => {
  const data = [
    { label: "Dashboard", link: "*" },
    { label: "Products", link: "/products" }
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
           Simple Cloud Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <CustomDrawerComponent data={data} />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Routes>
          <Route path="*" element={<DashboardComponent />} />
          <Route path="products" element={<ProductsComponent />} />
          <Route path="products/create-product" element={<CreateOrEditProductComponent />} />
          <Route
            path="products-license"
            element={<ProductLicenseComponent />}
          />
        </Routes>
      </Box>
    </Box>
  );
};
export default MainComponent;
