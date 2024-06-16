import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function CustomGridComponent({
  columns = [],
  data = [],
  isLoading = false,
  checkboxSelection = false,
  ...rest
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          checkboxSelection={checkboxSelection}
          disableRowSelectionOnClick
          paginationMode="off"
          {...rest}
        />
      </div>
    </Paper>
  );
}
