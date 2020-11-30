import React from "react";
import classes from './Loader.module.scss'
import CircularProgress from "@material-ui/core/CircularProgress";

export const Loader = () => {
    return (
        <div className={classes.Loader}>
            <CircularProgress/>
        </div>
    )
};
