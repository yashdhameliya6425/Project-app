import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
export default function (props) {
  const { name,icon } = props;
  const classes = useStyles();
 
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={icon ? <AddIcon /> :null}
    
      >
        {name}
      </Button>
    </div>
  );
}
