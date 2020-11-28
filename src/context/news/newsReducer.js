import {CLEAR_NEWS, CLEAR_NEWS_LIST, GET_NEWS, GET_NEWS_LIST, SET_LOADING} from "../types";

const handlers = {
    [GET_NEWS]: (state, {payload}) => ({...state, news: payload, loading: false}),
    [GET_NEWS_LIST]: (state, {payload}) => ({...state, newsList: payload, loading: false}),
    [SET_LOADING]: (state) => ({...state, loading: true}),
    [CLEAR_NEWS]: (state) => ({...state, news: {}}),
    [CLEAR_NEWS_LIST]: (state) => ({...state, newsList: []}),
    DEFAULT: state => state
};

export const newsReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
};

