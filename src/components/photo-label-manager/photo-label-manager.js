import {
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Input,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Field, Form } from "formik";
import React, { useState } from "react";
import { date } from "yup/lib/locale";
import ApiService from "../../ApiService";
import ButtonHandler from "../Button/button";
import CustomForm from "../Dynamic-Form/customForm";
import Home from "../Home/Home";
import ReactHookTextField from "../HookForm/formTextField";
import ProjectTable from "../project-manager/project-list";
import SearchTextField from "../SearchField/search-field";
import DeleteIcon from "@material-ui/icons/Delete";
import "../form-manager/style.css";
import { Controller, useFieldArray, useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    flexGrow: 1,
    border: "none",
    boxShadow: "none",
  },
  projectTitle: {
    textAlign: "center",
    fontWeight: "500",
  },
  alertBox: {
    width: "700px",
  },
}));

const PhotoLabelManager = (props) => {
  const classes = useStyles();
  const apiService = new ApiService();
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const { control, register, handleSubmit, getValues } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  const handleClickPopUp = () => {
    setOpen(true);
    // setPopUpOpen(true)
  };
  const handleClose = () => {
    setOpen(false);
    // setPopUpOpen(false)
  };

  const createInputField = () => {
    debugger;
    setShowInput(true);
  };

  return (
    <div>
      <Home />
      <Card className={classes.root} variant="outlined">
        <Typography variant="h6" noWrap className={classes.projectTitle}>
          Photo Label manager
        </Typography>

        <Grid container style={{ display: "flex", justifyContent: "center" }}>
          <Grid item xs={11} md={10} container>
            <Grid container style={{ marginBottom: "1rem" }}>
              <Grid
                item
                xs={11}
                md={8}
                container
                style={{ justifyContent: "flex-start" }}
              >
                <SearchTextField />
              </Grid>
              <Grid
                item
                xs={11}
                md={4}
                container
                style={{
                  justifyContent: "flex-end",
                  marginTop: "7px",
                  marginLeft: "-40px",
                }}
              >
                <ButtonHandler
                  onClick={(id) => handleClickPopUp(id)}
                  name="+ Add Photo Label List"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* {popUpOpen &&
                    <CustomForm openPopUp={open}
                        closePopup={handleClose}
                        data={data}
                    />} */}
        <Dialog
          fullWidth={true}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="form-dialog-title">Photo Label Manager</DialogTitle>

          <form>
            <DialogContent style={{ paddingTop: "0px" }}>
              <div style={{ flexGrow: 1, overflow: "hidden" }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <ReactHookTextField
                      style={{ width: "100%" }}
                      label="Photo Label Name"
                      // onChange={(event) => { handleInput(event) }}
                    />
                  </Grid>
                </Grid>

                <Grid container direction="row">
                  <Grid item xs={3} direction="row">
                    <div className={classes.title}>Common</div>
                  </Grid>
                  <Grid item xs={3} direction="row">
                    <div className={classes.title}>Photo Label</div>
                  </Grid>
                </Grid>

                {fields.map((task,index) => {
                  return (
                    <>
                      <Grid container direction="row">
                        <Grid item xs={3} direction="row">
                          <Checkbox />
                        </Grid>
                        <Grid item xs={6} direction="row">
                          <input
                            type="hidden"
                            name={`tasks[${index}].id`}
                            ref={register()}
                            defaultValue={task.id}
                          />
                          <Controller
                            render={({ value, onChange }) => (
                              <input
                                type="text"
                                onIonChange={onChange}
                                name={`tasks[${index}].subTask`}
                                ref={register}
                                value={value}
                              />
                            )}
                            control={control}
                            defaultValue={task.subTask} // make sure to set up defaultValue
                            name={`tasks[${index}].subTask`}
                          />
                        </Grid>
                        <Grid item xs={3} direction="row">
                          <DeleteIcon
                             onClick={() => remove(index)}
                            color="error"
                          />
                        </Grid>
                      </Grid>
                    </>
                  );
                })}

                {showInput && (
                  <Grid container direction="row">
                    <Grid item xs={8}>
                      <ReactHookTextField
                        style={{ width: "100%" }}
                       
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          marginLeft: "50px",
                          width: "50%",
                          height: "50px",
                        }}
                        onClick={() =>
                          append({
                            id: Date.now(),
                            subTask: getValues("task-input"),
                          }),
                          setShowInput(false)
                        }
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                )}

                <Button
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    width: "25%",
                    height: "50px",
                    marginTop: "50px",
                  }}
                  onClick={() => {
                    createInputField();
                  }}
                >
                  Add Field
                </Button>
              </div>
            </DialogContent>

            <DialogActions style={{ justifyContent: "center" }}>
              <div>
                <ButtonHandler type="submit" color="primary" name="Submit" />
              </div>
              <div>
                <ButtonHandler
                  name="Cancel"
                  style={{ color: "primary", backgroundColor: "#80808063" }}
                  onClick={handleClose}
                />
              </div>
            </DialogActions>
          </form>
        </Dialog>
      </Card>
    </div>
  );
};

export default PhotoLabelManager;
