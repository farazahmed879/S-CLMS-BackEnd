import { useEffect, useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import CustomButton from "../../../Components/custom-button";
import CustomCard from "../../../Components/custom-card";
import CustomGridComponent from "../../../Components/custom-grid";
import { Link } from "react-router-dom";
import { apiCall } from "../../../service/common-service";
import { EndPoints } from "../../../Configs/end-points";
import { Key } from "@mui/icons-material";
import { S_Alert, UserRole } from "../../../utils/helper";
import CustomModal from "../../../Components/modal";
import UserSelector from "./users-selector";

const ProductsComponent = () => {
  const { isAdmin, userId } = UserRole();
  const [isLoading, setIsloading] = useState(false);
  const [product, setProduct] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [openSelector, setOpenSelector] = useState(false);
  const columns = [
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
  ];

  function createData(id, name, version, description) {
    return { id, name, version, description };
  }

  const handleGenerateKey = (data) => {
    setProduct(data);
    setOpenSelector(true);
  };

  const handleActivate = async (id) => {
    const result = await S_Alert({
      title: "Please Provide Activation Key",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Activate",
      // showLoaderOnConfirm: true,
      // preConfirm: async (login) => {
      //   try {
      //     const githubUrl = `
      //   https://api.github.com/users/${login}
      // `;
      //     const response = await fetch(githubUrl);
      //     if (!response.ok) {
      //       return Swal.showValidationMessage(`
      //     ${JSON.stringify(await response.json())}
      //   `);
      //     }
      //     return response.json();
      //   } catch (error) {
      //     Swal.showValidationMessage(`
      //   Request failed: ${error}
      // `);
      //   }
      // },
    });
    if (result.isConfirmed) {
      let payload = { key: result?.value, userId, productId: id };
      // api verify
    }
  };

  const rows = [
    createData(1, "India", "IN", 1324171354),
    createData(2, "China", "CN", 1403500365),
    createData(3, "Italy", "IT", 60483973),
    createData(4, "United States", "US", 327167434),
    createData(5, "Canada", "CA", 37602103),
    createData(6, "Australia", "AU", 25475400),
    createData(7, "Germany", "DE", 83019200),
    createData(8, "Ireland", "IE", 4857000),
    createData(9, "Mexico", "MX", 126577691),
    createData(10, "Japan", "JP", 126317000),
    createData(11, "France", "FR", 67022000),
    createData(12, "United Kingdom", "GB", 67545757),
    createData(13, "Russia", "RU", 146793744),
    createData(14, "Nigeria", "NG", 200962417),
    createData(15, "Brazil", "BR", 210147125),
  ];

  const getProducts = async () => {
    try {
      setIsloading(true);
      const url = EndPoints.products;
      const result = await apiCall("get", url);
      if (result) setRowData(result?.data);
      setIsloading(false);
    } catch (errors) {
      setIsloading(false);
      console.log(errors);
    }
  };

  useEffect(() => {
    // getProducts();
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
          // data={rowData}
          data={rows}
        />
      </CustomCard>

      <UserSelector open={openSelector} setOpen={setOpenSelector} />
    </>
  );
};
export default ProductsComponent;
