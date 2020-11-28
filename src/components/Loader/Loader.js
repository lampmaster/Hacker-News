import React, {useContext} from "react";
import classes from './Loader.module.scss'
import CircularProgress from "@material-ui/core/CircularProgress";
import {NewsContext} from "../../context/news/newsContext";

export const Loader = () => {
    const {loading} = useContext(NewsContext);

    if (loading) {
        return (
            <div className={classes.Loader}>
                <CircularProgress/>
            </div>
        )
    }

    return null
};
