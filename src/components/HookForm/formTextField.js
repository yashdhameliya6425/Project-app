import { TextField } from "@material-ui/core"

const ReactHookTextField = ({
    name,
    label,
    control,
    id,
    error,
    ...props
}) => {
    return (
        <TextField
            variant="outlined"
            margin="dense"
            color="primary"
            label={label}
            name={name}
            error={error}
            {...props} />
    )
}

export default ReactHookTextField;