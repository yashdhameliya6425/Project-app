import { Switch } from "@material-ui/core"

const ReactHookSwitch = ({
    name,
    ...props
}) => {
    return (
        <Switch
            name={name}
            {...props}
        />
    )
}
export default ReactHookSwitch