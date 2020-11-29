import axios from "axios";
import {
    GET_COMMENTS_ERROR,
    GET_COMMENTS_START, GET_COMMENTS_SUCCESS,
    GET_NEWS_LIST_ERROR,
    GET_NEWS_LIST_START,
    GET_NEWS_LIST_SUCCESS,
    GET_NEWS_START,
    GET_NEWS_SUCCESS, NEWS_CLEAR
} from "./actionTypes";

export function getNewsList(){
    return async dispatch => {
        dispatch(getNewsListStart());
        try {
            const response = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');
            const newsIDs = response.data.slice(0, 100).filter(news => news !== null);
            const newsArrayResponse = await Promise.all(newsIDs.map(async (newsID) => {
                const resp = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${String(newsID)}.json?print=pretty`);
                return resp.data;
            }));

            dispatch(getNewsListSuccess(newsArrayResponse));
            // dispatch(autoGetNewsList())
        } catch (e) {
            dispatch(getNewsListError(e))
        }
    };
}

export function getNews(newsId) {
    return async dispatch => {
        dispatch(getNewsStart());
        try {
            const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`);
            dispatch(getComments(newsId));
            dispatch(getNewsSuccess(response.data));
        } catch (e) {
            dispatch(getNewsError(e))
        }
    }
}

export function getComments(newsId) {
    return async dispatch => {
        dispatch(getCommentsStart());
        try {
            const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`);
            if (typeof response.data.kids !== 'undefined') {
                dispatch(getCommentsStart());
                const comments = await parseComments(response.data.kids);
                dispatch(getCommentsSuccess(comments));
            }
        } catch (e) {
            dispatch(getCommentsError(e))
        }
    }
}

async function parseComments(commentsIDs) {
    const {comments, childCommentsNumber} = await wrapper(commentsIDs);

    async function wrapper(ids) {
        let numberOfComments = ids.length;
        const result = await Promise.all(ids.map(async commentID => {
            const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentID}.json?print=pretty`);
            const comment = response.data;
            if (typeof comment.kids !== "undefined") {
                const {comments, childCommentsNumber} = await wrapper(comment.kids);
                comment.kids = comments;
                comment.childComentsNumber = childCommentsNumber;
                numberOfComments += childCommentsNumber;
            }
            return comment
        }));

        return {comments: result, childCommentsNumber: numberOfComments};
    }


    return {comments, numberOfComments: childCommentsNumber};
}

export function getNewsListStart() {
    return {
        type: GET_NEWS_LIST_START
    }
}

export function getNewsListSuccess(newsList) {
    return {
        type: GET_NEWS_LIST_SUCCESS,
        newsList
    }
}

export function getNewsListError(error) {
    return {
        type: GET_NEWS_LIST_ERROR,
        error
    }
}

export function getNewsStart() {
    return {
        type: GET_NEWS_START,
    }
}

export function getNewsSuccess(news) {
    return {
        type: GET_NEWS_SUCCESS,
        news
    }
}

export function getNewsError(error) {
    return {
        type: GET_NEWS_SUCCESS,
        error
    }
}

export function getCommentsStart() {
    return {
        type: GET_COMMENTS_START,
    }
}

export function getCommentsSuccess(newsComments) {
    return {
        type: GET_COMMENTS_SUCCESS,
        newsComments
    }
}

export function getCommentsError(error) {
    return {
        type: GET_COMMENTS_ERROR,
        error
    }
}

export function clearNews() {
    return {
        type: NEWS_CLEAR
    }
}



