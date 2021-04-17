/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ApiService from "../../ApiService";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CustomTable from "../Table/custom-table";
import DynamicTable from "../Table/DynamicTable";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
}));
    
export default function ProjectTable(props) {
  const classes = useStyles();        
  const apiService = new ApiService();        
  const [project, setProjectData] = useState([]);

  const { onEditHandler } = props

  useEffect(() => {           
    getProjects();
  }, []);

  const getProjects = async () => {
    const data = await apiService.getProject();
    setProjectData(data);
  };

  const data = [
    { columnName: "Project Name", accessKey: "projectName", type: "text" },
    { columnName: "Service Line", accessKey: "serviceLine", type: "text" },
    { columnName: "Updated By", accessKey: "updatedBy", type: "text" },
    { columnName: "Updated", accessKey: "updatedAt", type: "text" },
    { columnName: "", accessKey: "", type: "dropdown_button" },
  ];
  return (
    <Paper className={classes.root}>
      <CustomTable data={data} rowsData={project} onEditHandler={(val) => { onEditHandler(val) }} />
    </Paper>
  );
}
