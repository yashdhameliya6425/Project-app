import { FormControl, FormControlLabel, InputLabel, ListItemAvatar, Radio, RadioGroup } from "@material-ui/core";
import { Controller } from "react-hook-form";

const ReactHookFormRadio = ({
    name,
    label,
    rules,
    control,
    defaultValue,
    children,
    item,
    value,
    ...props
}) => {
    return (
        <FormControl {...props}>
            <Controller
                rules={{ required: true }}
                control={control}
                name={name}
                as={
                    item.map((item, i) => {
                        console.log("iemeieiok" ,item);
                        <RadioGroup >
                            <FormControlLabel
                                value={item.value}
                                control={<Radio />}
                                label={item.label}
                            />
                        </RadioGroup>
                    })
                }
            />
        </FormControl>
    )
}

export default ReactHookFormRadio