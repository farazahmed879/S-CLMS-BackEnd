import { useEffect, useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import CustomButton from "../../../Components/custom-button";
import CustomCard from "../../../Components/custom-card";
import CustomGridComponent from "../../../Components/custom-grid";
import { Link } from "react-router-dom";
import { apiCall } from "../../../service/common-service";
import { EndPoints } from "../../../Configs/end-points";
import { Key } from "@mui/icons-material";
import { S_Alert, UserRole, showSwalPopUp } from "../../../utils/helper";
import CustomModal from "../../../Components/modal";
import UserSelector from "./users-selector";

const ProductsComponent = () => {
  const { isAdmin, userId } = UserRole();
  const [isLoading, setIsloading] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [product, setProduct] = useState([]);
  const [users, setUsers] = useState([]);
  const [openSelector, setOpenSelector] = useState(false);
  const [columns, setColumns] = useState([
    { field: "name", headerName: "Name", width: 150 },
    { field: "version", headerName: "Version", width: 150 },
    {
      field: "description",
      headerName: "Description",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        console.log(params);
        const { row } = params;
        return isAdmin ? (
          <IconButton onClick={() => handleGenerateKey(row)}>
            <Key />
          </IconButton>
        ) : (
          <Button
            size="small"
            variant="contained"
            onClick={() => handleActivate(row?.id)}
          >
            Activate
          </Button>
        );
      },
    },
  ]);

  const handleGenerateKey = (data) => {
    setProduct(data);
    setOpenSelector(true);
    getUsers();
  };

  const handleSelectUsers = (e) => {
    setOpenSelector(e);
  };

  const handleActivate = async (id) => {
    try {
      const result = await S_Alert({
        title: "Please Provide Activation Key",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Activate",
      });
      if (result.isConfirmed) {
        let payload = { key: result?.value, userId, productId: id };
        const url = EndPoints.activateProduct;
        setIsloading(true);
        const response = await apiCall("put", url, payload);
        console.log("Response", response);
        setIsloading(true);
        if (response?.data?.success) {
          showSwalPopUp("Success", "Successfull Submitted", "success");
          getProducts()
        }
      }
    } catch (errors) {
      setIsloading(false);
    }

    // api verify
  };

  const getUsers = async () => {
    try {
      setIsloading(true);
      let url = EndPoints.users;
      const result = await apiCall("get", url);
      setIsloading(false);
      if (result) {
        console.log("results", result);
        setUsers(result?.data);
      }
    } catch (errors) {
      setIsloading(false);
      console.log(errors);
    }
  };

  const getProducts = async () => {
    try {
      setIsloading(true);
      let url = EndPoints.products;
      if (!isAdmin) url += `?userId=${userId}`;
      const result = await apiCall("get", url);
      if (result) setRowData(result?.data);
      setIsloading(false);
    } catch (errors) {
      setIsloading(false);
      console.log(errors);
    }
  };

  const handleSubmitUser = async (checked = []) => {
    try {
      console.log("checked", checked);
      let payload = {
        users: users.filter((d) => checked.includes(d.id)),
        productId: product?.id,
      };
      const url = EndPoints.generateKey;
      setIsloading(true);
      const response = await apiCall("put", url, payload);
      setIsloading(false);
      if (response) {
        showSwalPopUp("Success", "Submitted Successfully", "success");
        setOpenSelector(false);
      }
    } catch (errors) {
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      let cols = [...columns];
      cols.splice(3, 0, {
        field: "isActivated",
        headerName: "Activated",
        width: 150,
        renderCell: (params) =>
          params?.row?.isActivated ? "Activated" : "--",
      });
      setColumns(cols)
    }
    getProducts();
  }, []);

  return (
    <>
      <CustomCard>
        <Box sx={{ textAlign: "right" }}>
          <Link to={"create-product"}>
            <CustomButton sx={{ margin: 2 }} variant="contained">
              Add
            </CustomButton>
          </Link>
        </Box>

        <CustomGridComponent
          isLoading={isLoading}
          columns={columns}
          data={rowData}
        />
      </CustomCard>

      <UserSelector
        open={openSelector}
        setOpen={(e) => handleSelectUsers(e)}
        data={users}
        handleSubmit={handleSubmitUser}
      />
    </>
  );
};
export default ProductsComponent;
