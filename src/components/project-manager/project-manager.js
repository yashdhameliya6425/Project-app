import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import ButtonHandler from "../Button/button"
import SearchTextField from "../SearchField/search-field"
import {
  Grid,
  makeStyles,
  Slide,
  Typography,
} from "@material-ui/core";
import Home from "../Home/Home";
import CustomForm from "../Dynamic-Form/customForm";
import XGridDemo from "../Table/x-gridTable";
import ApiService from "../../ApiService";
import ProjectTable from "./project-list";

const    useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    flexGrow: 1,
    border: "none",
    boxShadow: "none"
  },
  projectTitle: {
    textAlign: "center",
    fontWeight: "500",
  },
  alertBox: {
    width: "700px",
  },
}));


export default function ProjectManager(props) {
  const classes = useStyles();
  const apiService = new ApiService();
  const [popUpOpen, setPopUpOpen] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [projectValue, setProjectValue] = React.useState();

  const onEditHandlerList = async (value) => {
    setOpen(true)
    setProjectValue(value)
    setPopUpOpen(true)
  };

  const handleClickPopUp = () => {
    setProjectValue("")
    setOpen(true)
    setPopUpOpen(true)
  }
  const handleClose = () => {
    setOpen(false);
    setPopUpOpen(false)
  };

  const photoSize = [
    { key: "680 X 480", value: "680 X 480" },
    { key: "1280 X 1440", value: "1280 X 1440" },
    { key: "1920 X 1440", value: "1920 X 1440" },
    { key: "2560 X 1920", value: "2560 X 1920" },
  ]

  const compressionQualitys = [
    { key: "0.95", value: "0.95" },
    { key: "0.90", value: "0.90" },
    { key: "0.85", value: "0.85" },
    { key: "0.80", value: "0.80" },
    { key: "0.75", value: "0.75" },
    { key: "0.70", value: "0.70" },
    { key: "0.65", value: "0.65" },
    { key: "0.60", value: "0.60" },
  ]
  const radioValue = [
    { value: "portrait", label: "Portrait" },
    { value: "landscape", label: "Landscape" }
  ]
  const data = [
    { formTitle: "Project Name", titleKey: "title", },
    { id: "" },
    { name: "projectName", label: "Project Name", type: "text" },
    { name: "form", label: "Form", type: "boolean" },
    { label: "Photo Setting", type: "photoLable" },
    { name: "gender1", type: "radio", label: "Orientation(Mobile)", value: radioValue, },
    { name: "photoSize", label: "Photo Size", type: "select", value: photoSize },
    { name: "compressionQualitys", label: "Compression Quality", type: "select", value: compressionQualitys }
  ]

  const onProjectCreate = async (data) => {
    console.log("data", data);
    const payload = data
    await apiService.createProject(payload);
  }

  const onSubmit = (data) => {
    onProjectCreate(data)
  }


  return (
    <div>
      <Home />
      <Card className={classes.root} variant="outlined">
        <Typography variant="h6" noWrap className={classes.projectTitle}>
          Project Manager
        </Typography>

        <Grid container style={{ display: "flex", justifyContent: "center" }}>
          <Grid item xs={11} md={10} container>
            <Grid container style={{ marginBottom: "1rem", }}>
              <Grid item xs={11} md={8} container style={{ justifyContent: "flex-start", }}>
                <SearchTextField />
              </Grid>
              <Grid item xs={11} md={4} container style={{ justifyContent: "flex-end", marginTop: "7px", marginLeft: "-40px" }}>
                <ButtonHandler onClick={() => handleClickPopUp()} name="+ CREATE PROJECT" />
              </Grid>
            </Grid>
            <ProjectTable onEditHandler={(value) => onEditHandlerList(value)} />
          </Grid>
        </Grid>
        {popUpOpen && <CustomForm openPopUp={open}
          projectValue={projectValue && projectValue}
          editForm="projectEditForm"
          closePopup={handleClose}
          projectOnSubmit={data => onSubmit(data)}
          data={data} />}
      </Card>
    </div>
  );
}
