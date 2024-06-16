import { Card, CircularProgress } from "@mui/material";

const CustomCard = ({ children , isLoading = false }) => {
  return isLoading ?  <CircularProgress /> : <Card>{children}</Card>;
};
export default CustomCard;
