import React, {useContext, useEffect} from 'react';
import classes from './NewsList.module.scss'
import {NewsItem} from "../../components/NewsItem/NewsItem";
import {NewsContext} from "../../context/news/newsContext";
import {Loader} from "../../components/Loader/Loader";

export const NewsList = () => {
    const {getNewsList, newsList, loading} = useContext(NewsContext);

    useEffect(() => {
        getNewsList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const newsListTemplate = newsList.map(news => {
        return <NewsItem key={news.id} news={news}/>
    });

    return (
        <div className={classes.NewsList}>{newsListTemplate}</div>
    )
};
