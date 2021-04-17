/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {
  FormControl,
  MenuItem,
  Select,
  TablePagination,
} from "@material-ui/core";
import "./file.css";

const useStyles = makeStyles((palette) => ({
  container: {
    maxHeight: 440,
  },
  tableBody: {
    borderBottom: "1px solid #00000070",
  },
  editIcon: {
    padding: "2px",
    backgroundColor: "green",
    color: "white",
    borderRadius: "5px",
    fontSize: "18px",
  },
  fileIcon: {
    padding: "2px",
    backgroundColor: "#e4e1e1",
    color: "black",
    borderRadius: "5px",
    fontSize: "18px",
  },
  deletIcon: {
    padding: "2px",
    backgroundColor: "red",
    color: "#fff",
    borderRadius: "5px",
    fontSize: "18px",
  },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: "rgb(0 0 0 / 0.12)",
      borderBottom: "1px solid black",
    },
  },
}))(TableRow);

export default function CustomTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [datas, setDatas] = React.useState([]);
  const [row, setRow] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const { data, rowsData, onEditHandler } = props;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (data) {
      setDatas(data)
    }
    if (rowsData) {
      setRow(rowsData)
    }
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  const onActionHandler = (e, val) => {
   console.log("val",val);
 
    onEditHandler(val)
   
  }
  return (
    <>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {datas && datas.length && datas.map((obj, index) => {
              
                
                return (
                  <TableCell key={index} style={{ fontWeight: "bold" }}>
                    {obj.columnName}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {row && row.length > 0 &&
              row.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                return (
                  <StyledTableRow
                    key={row._id ? row._id : index}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    {data.length > 0 &&
                      data.map((obj, index) => {
                    console.log("data",data)
                       
                        return obj.type === "text" ? (
                          <TableCell
                            style={{ borderBottom: "1px solid #8080808f" }}
                            onClick={(e) => { onActionHandler(e,row) }}
                          >
                     
                            {row[obj.accessKey] ? row[obj.accessKey] : ""}
                          </TableCell>
                        ) : obj.type === "dropdown_button" ? (
                          <TableCell
                            style={{
                              alignItems: "center",
                              borderBottom: "1px solid #8080808f",
                            }}
                          >
                            <FormControl>
                              <Select
                                IconComponent={MoreHorizIcon}
                                inputProps={{
                                  className: classes.selectBox,
                                }}
                              >
                                <MenuItem value={10}>Clone</MenuItem>
                                <MenuItem value={20}>Delete</MenuItem>
                              </Select>
                            </FormControl>
                          </TableCell>
                        ) : ""
                    
                      })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[50, 100, 250, 500, 1000]}
        component="div"
        count={row.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
