import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
const useStyles = makeStyles((theme) => ({
    searchInput: {
        textAlign: "center",
    },
}));
export default function SearchTextField(props) {
    // const { name, icon, onClick } = props;
    const classes = useStyles();

    return (
        <div>
            <TextField
                id="filled-required"
                label="Search"
                style={{ width: "400px", marginLeft: "40px" }}
                variant="outlined"
                margin="dense"
                name="projectName"
                InputProps={{
                    className: classes.searchInput, startAdornment: (
                        <InputAdornment position="start" variant="standard">
                            <SearchIcon style={{color:"#808080a6"}} />
                        </InputAdornment>
                    ),
                    placeholder: "Search..."
                }}
            />
        </div>
    );
}
