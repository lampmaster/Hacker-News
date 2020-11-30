import React from "react";
import classes from './Topbar.module.scss'

export const TopBar = () => (
    <div className={classes.TopBar}>
        <div className={classes.Container}>
            <img className={classes.avatar}
                 src={'https://avatars.dicebear.com/api/bottts/.svg?colors[]=blue'} alt=""/>
            HackerNews
        </div>
    </div>
);

