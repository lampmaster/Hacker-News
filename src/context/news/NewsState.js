import React, {useReducer} from "react";
import {NewsContext} from "./newsContext";
import {newsReducer} from "./newsReducer";
import {CLEAR_NEWS, CLEAR_NEWS_LIST, GET_NEWS, GET_NEWS_LIST, SET_LOADING} from "../types";
import axios from "axios";

export const NewsState = ({children}) => {
    const initialState = {
        newsList: [],
        news: {},
        loading: false,
    };

    const [state, dispatch] = useReducer(newsReducer, initialState);

    const getNewsList = async () => {
        setLoading();

        const response = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');
        const newsIDs = response.data.slice(0, 100);
        const newsArrayResponse = await Promise.all(newsIDs.map(async (newsID) => {
            const resp = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${String(newsID)}.json?print=pretty`);
            return resp.data;
        }));
        console.log(newsArrayResponse);
        dispatch({
            type: GET_NEWS_LIST,
            payload: newsArrayResponse
        })
    };

    const getNews = async (id) => {
        setLoading();
        const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);

        dispatch({
            type: GET_NEWS,
            payload: response.data
        })
    };

    const setLoading = () => dispatch({type: SET_LOADING});
    const clearNews = () => dispatch({type: CLEAR_NEWS});
    const clearNewsList = () => dispatch({type: CLEAR_NEWS_LIST});

    const {newsList, news, loading} = state;

    return (
        <NewsContext.Provider value={{
            getNews, getNewsList, setLoading, clearNews, clearNewsList, news, newsList, loading
        }}>
            {children}
        </NewsContext.Provider>
    )
};
