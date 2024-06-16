import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import CustomButton from "../../../Components/custom-button";
import CustomCard from "../../../Components/custom-card";
import CustomGridComponent from "../../../Components/custom-grid";
import { Link } from "react-router-dom";
import { apiCall } from "../../../service/common-service";
import { EndPoints } from "../../../Configs/end-points";

const ProductsComponent = () => {
  const [isLoading, setIsloading] = useState(false);
  const [rowData, setRowData] = useState([]);
  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "version", label: "Version", minWidth: 100 },
    {
      id: "description",
      label: "Description",
      minWidth: 170,
      align: "right",
    },
  ];

  function createData(name, version, description) {
    return { name, version, description };
  }

  // const rows = [
  //   createData("India", "IN", 1324171354),
  //   createData("China", "CN", 1403500365),
  //   createData("Italy", "IT", 60483973),
  //   createData("United States", "US", 327167434),
  //   createData("Canada", "CA", 37602103),
  //   createData("Australia", "AU", 25475400),
  //   createData("Germany", "DE", 83019200),
  //   createData("Ireland", "IE", 4857000),
  //   createData("Mexico", "MX", 126577691),
  //   createData("Japan", "JP", 126317000),
  //   createData("France", "FR", 67022000),
  //   createData("United Kingdom", "GB", 67545757),
  //   createData("Russia", "RU", 146793744),
  //   createData("Nigeria", "NG", 200962417),
  //   createData("Brazil", "BR", 210147125),
  // ];

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
    getProducts();
  }, []);

  return (
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
  );
};
export default ProductsComponent;
