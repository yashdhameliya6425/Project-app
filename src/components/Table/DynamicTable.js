import React, { useState, useEffect } from 'react';
import { Container } from "@material-ui/core";
import clsx from "clsx";
import { makeStyles, useTheme, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import { XGrid } from "@material-ui/x-grid";
import { LicenseInfo } from '@material-ui/x-grid';

LicenseInfo.setLicenseKey(
    '85ae46d2e32747d01f1ecccd54e7b9acT1JERVI6MTk5NTIsRVhQSVJZPTE2NDE1Mjc5MjAwMDAsS0VZVkVSU0lPTj0x',
);

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
    },
}));

const DynamicTable = (props) => {
    const classes = useStyles();
    const [rows, setRows] = useState([]);

    const FetchInfo = () => {
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);

        const get = async () => {
            try {
                let response = await fetch(`https://bxctdeshz4.execute-api.us-east-1.amazonaws.com/find`, {
                    method: "get",
                })
                let newActualData = await response.json()
                createRows(newActualData)
            } catch (e) {
                setError(e);
            } finally {
                if (rows.length > 0) {
                    setLoading(false);
                    console.log("Data retrieved successfully")
                }
            }
        }
        useEffect(() => {
                get()
        }, [rows])

        return [error, loading];
    }
    const [error, loading] = FetchInfo()

    const columns = [
        {
            field: "projectName",
            headerName: "Project Name",
            width: 150
        },
        {
            field: "serviceLine",
            headerName: "Service Line",
            width: 150
        },
        {
            field: "updatedAt",
            headerName: "Updated At",
            width: 150
        },
        {
            field: "updatedBy",
            headerName: "Updated By",
            width: 150
        },
    ];


    // Parses the data received from the database into a local array of objects, used as the rows for the table
    const createRows = (data) => {
        let newRows = [];
        if (data !== null) {
            for (let i = 0; i < data.length; i++) {
                console.log("Create rows ran")
                let obj = {
                    _id: data[i]._id,
                    // vendorDueDate: timeRemover(data[i].dates.organizationDueDate),    // vendorDate === organizationDue
                    // clientDueDate: timeRemover(data[i].dates.clientDueDate),
                    // windowStartDate:timeRemover(data[i].dates.earliestStartDate),     // windowStart = earliest start
                    projectName: data[i].projectName,
                    serviceLine: data[i].serviceLine,
                    updatedAt: data[i].updatedAt,
                    updatedBy: data[i].updatedBy,
                }
                newRows.push(obj)
            }
        }
        setRows(newRows);
        console.log("main", newRows);
    }
    // Used to remove the time element from the parsed date and time from the database
    const timeRemover = (str) => {
        let index = str.indexOf("T")
        let onlyDate = str.substr(0, index);
        return (onlyDate)
    }

    // Called when any table row is selected by the user
    const onRowClick = (event) => {
        props.onRowClick(event.row)
        console.log("A row was clicked")
    }

    return (

        <div className={classes.root}>
            <div className={classes.drawerHeader} />
            <Container maxWidth="xl">
                <div style={{ height: 630, width: "1050px" }}>
                    <XGrid
                        rows={rows}
                        columns={columns}
                        pageSize={50}
                        pagination={true}
                        checkboxSelection
                        stickyHeader={true}
                        onRowClick={onRowClick}
                        rowsPerPageOptions={[50, 100, 250, 500, 1000]}
                        disableSelectionOnClick={true}
                        rowHeight={25}
                        align={"left"}
                        resizable
                        loading={loading}
                    />
                </div>
            </Container>
        </div>
    )
}


export default DynamicTable
