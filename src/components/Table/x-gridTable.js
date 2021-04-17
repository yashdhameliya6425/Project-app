import * as React from 'react';
import { XGrid } from '@material-ui/x-grid';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
const useStyles = makeStyles((theme) => ({
    root: {
        '& .custom-xgid-header': {
            backgroundColor: '#cec9c9de'
        },
        '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        },
        '& .MuiDataGrid-row:hover': {
            backgroundColor: '#2196F3'
        },
        '& .MuiInput-underline:before': {
            content: "none",
        }
    },
}));
export default function XGridDemo() {
    const classes = useStyles();
    const [row, setRow] = React.useState([])
    const get = async () => {
        try {
            let response = await fetch(`https://bxctdeshz4.execute-api.us-east-1.amazonaws.com/find`, {
                method: "get",
            })
            let newActualData = await response.json()
            setRow(newActualData)
        } catch (err) {
            console.log(err);
        }
    }
    React.useEffect(() => {
        get()
    }, [])

    const id = row.map((item) => item._id)
    const projectName = row.map((item) => item.projectName)
    const updatedAt = row.map((item) => item.updatedAt)
    console.log("id",id);
    const data = {
        columns: [
            {
                field: "id",
                hide: true
            },
            {
                field: "projectName",
                headerName: "Project Name",
                headerClassName: "custom-xgid-header",
                width: 200
            },
            {
                field: "serviceLine",
                headerName: "Service Line",
                headerClassName: "custom-xgid-header",
                width: 200
            },
            {
                field: "updatedBy",
                headerName: "Updated By",
                headerClassName: "custom-xgid-header",
                width: 200
            },
            {
                field: "updatedAt",
                headerName: "Updated At",
                headerClassName: "custom-xgid-header",
                width: 300
            },
            {
                field: "action",
                headerName: "",
                headerClassName: "custom-xgid-header",
                width: 120,
                renderCell: (params) => (
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
                ),
            }
        ],
        rows: [
            {
                id: id,
                projectName: projectName,
                serviceLine: "Inspection",
                updatedBy: projectName,
                updatedAt: updatedAt,
            },
        ]
    }
    console.log("data",data);
    return (
        <div className={classes.root} style={{ height: "calc(100vh - 30px)", width: '100%' }}>
            <XGrid
                {...data}
                loading={data.rows.length === 0}
                rowHeight={38}
                pageSize={50}
                pagination={true}
                stickyHeader={true}
                rowsPerPageOptions={[50, 100, 250, 500, 1000]}
                disableSelectionOnClick={true}
                align={"left"}
                resizable
                autoPageSize
                disableColumnMenu
                disableColumnResize
            />
        </div>
    );
}