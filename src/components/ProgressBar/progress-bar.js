import { LinearProgress } from '@material-ui/core'
import React from 'react'
const LinearProgressBar = (props) => {

    let progressBarStyle = {
        backgroundColor: "#409EFF"
    }
    return (
        <LinearProgress variant={props.variant ? props.variant : "determinate"}
            value={props.value ? props.value : " "}
            style={props.style ? props.style : progressBarStyle} />
    )
}

export default LinearProgressBar