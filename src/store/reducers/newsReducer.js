import {
    CLEAR_ERROR, CLEAR_MESSAGE,
    GET_COMMENTS_ERROR, GET_COMMENTS_START, GET_COMMENTS_SUCCESS,
    GET_NEWS_ERROR,
    GET_NEWS_LIST_ERROR,
    GET_NEWS_LIST_START,
    GET_NEWS_LIST_SUCCESS,
    GET_NEWS_START,
    GET_NEWS_SUCCESS, NEWS_CLEAR, NEWS_HAS_NO_COMMENTS, SET_MESSAGE,
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
    error: null,
    message: null,
};

const handlers = {
    [GET_NEWS_LIST_START]: (state) => ({...state, loading: true}),
    [GET_NEWS_LIST_SUCCESS]: (state, action) => ({...state, newsList: action.newsList, loading: false}),
    [GET_NEWS_LIST_ERROR]: (state, action) => ({...state, error: action.error, loading: false}),
    [GET_NEWS_START]: (state) => ({...state, loading: true}),
    [GET_NEWS_SUCCESS]: (state, action) => ({...state, news: action.news}),
    [GET_NEWS_ERROR]: (state, action) => ({...state, error: action.error, loading: false}),
    [NEWS_CLEAR]: (state) => ({...state, news: {}, newsComments: initialNewsCommentsState}),
    [GET_COMMENTS_START]: (state) => ({...state}),
    [GET_COMMENTS_SUCCESS]: (state, action) => ({...state, newsComments: action.newsComments, loading: false}),
    [GET_COMMENTS_ERROR]: (state, action) => ({...state, error: action.error, loading: false}),
    [CLEAR_ERROR]: (state) => ({...state, error: null}),
    [SET_MESSAGE]: (state, action) => ({...state, message: action.message}),
    [CLEAR_MESSAGE]: (state) => ({...state, message: null}),
    [NEWS_HAS_NO_COMMENTS]: state => ({...state, loading: false}),
    DEFAULT: state => state
};

export const newsReducer = (state = initialState, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
};
