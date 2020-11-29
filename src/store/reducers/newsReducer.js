import {
    GET_COMMENTS_ERROR, GET_COMMENTS_START, GET_COMMENTS_SUCCESS,
    GET_NEWS_ERROR,
    GET_NEWS_LIST_ERROR,
    GET_NEWS_LIST_START,
    GET_NEWS_LIST_SUCCESS,
    GET_NEWS_START,
    GET_NEWS_SUCCESS, NEWS_CLEAR,
} from "../actions/actionTypes";

const initialNewsCommentsState = {
    comments: [],
    numberOfComments: 0
};

const initialState = {
    newsList: [],
    news: {},
    newsComments: initialNewsCommentsState,
    loading: false,
    error: null
};

const handlers = {
    [GET_NEWS_LIST_START]: (state) => ({...state, loading: true}),
    [GET_NEWS_LIST_SUCCESS]: (state, action) => ({...state, newsList: action.newsList, loading: false}),
    [GET_NEWS_LIST_ERROR]: (state, action) => ({...state, error: action.error, loading: false}),
    [GET_NEWS_START]: (state) => ({...state, loading: true}),
    [GET_NEWS_SUCCESS]: (state, action) => ({...state, news: action.news, loading: false}),
    [GET_NEWS_ERROR]: (state, action) => ({...state, error: action.error, loading: false}),
    [NEWS_CLEAR]: (state) => ({...state, news: {}, newsComments: initialNewsCommentsState}),
    [GET_COMMENTS_START]: (state) => ({...state}),
    [GET_COMMENTS_SUCCESS]: (state, action) => ({...state, newsComments: action.newsComments}),
    [GET_COMMENTS_ERROR]: (state, action) => ({...state, error: action.error, loading: false}),
    DEFAULT: state => state
};

export const newsReducer = (state = initialState, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
};
