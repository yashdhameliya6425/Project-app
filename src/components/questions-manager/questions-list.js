/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ApiService from "../../ApiService";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CustomTable from "../Table/custom-table";

const useStyles = makeStyles({
    root: {
      width: "100%",
    },
  });
  
  export default function QuestionList() {
    const classes = useStyles();
    const apiService = new ApiService();
    const [questions, setQuestionsData] = useState([]);
  
    useEffect(() => {
      getQuestions();
    }, []);
  
    const getQuestions = async () => {
      const data = await apiService.getQuestions();
      setQuestionsData(data);
    };
  
    const data = [
      {
        columnName: "Questions Group Name",
        accessKey: "questionGroupName",
        type: "text",
      },
      { columnName: "Version", accessKey: "version", type: "text" },
      {
        columnName: "Photo Label Listing",
        accessKey: "photoLabelListing",
        type: "text",
      },
      { columnName: "Updated By", accessKey: "updatedBy", type: "text" },
      { columnName: "Updated", accessKey: "updated", type: "text" },
      { columnName: "", accessKey: "", type: "dropdown_button" },
    
    ];
  
    return (
      <Paper className={classes.root}>
        <CustomTable data={data} rowsData={questions} />
      </Paper>
    );
  }
  