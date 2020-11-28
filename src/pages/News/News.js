import React, {useContext, useEffect} from "react";
import classes from './News.module.scss'
import Button from "@material-ui/core/Button";
import {NewsContext} from "../../context/news/newsContext";
import {Loader} from "../../components/Loader/Loader";
import {getDate, getHostName} from "../../common/utils";
import {Link} from "react-router-dom";

export const News = ({match}) => {
    const {loading, clearNews, getNews, news} = useContext(NewsContext);
    const newsID = match.params.id;

    useEffect(() => {
        clearNews();
        getNews(newsID);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {by, time, title, url} = news;

    const goToPage = () => {
        window.open(url)
    };

    return (
        <React.Fragment>
            <Link to="/">Main page</Link>
            <div className={classes.News}>
                <div className={classes.Info}>
                    <div className={classes.mainInfo}>
                        <div className={classes.title}>{title}</div>
                        <div className={classes.otherInfo}>
                            <div>{by}</div>
                            <div>{getDate(time)}</div>
                        </div>
                    </div>
                    <div onClick={goToPage} className={classes.site}>{getHostName(url)}</div>
                </div>

                <div className={classes.Comments}>
                    <div className={classes.header}>
                        <div>Comments 100</div>
                        <Button color="primary">Update</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};
