import axios from "axios";
import {
    CLEAR_ERROR, CLEAR_MESSAGE,
    GET_COMMENTS_ERROR,
    GET_COMMENTS_START, GET_COMMENTS_SUCCESS, GET_NEWS_ERROR,
    GET_NEWS_LIST_ERROR,
    GET_NEWS_LIST_START,
    GET_NEWS_LIST_SUCCESS,
    GET_NEWS_START,
    GET_NEWS_SUCCESS, NEWS_CLEAR, NEWS_HAS_NO_COMMENTS, SET_MESSAGE
} from "./actionTypes";
import {copy, objIsEmpty} from "../../common/utils";

export function getNewsList(){
    return async dispatch => {
        dispatch(getNewsListStart());
        try {
            const response = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');
            const newsIDs = response.data.slice(0, 100);
            let newsList = await Promise.all(newsIDs.map(async (newsID) => {
                const resp = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${newsID}.json?print=pretty`);
                return resp.data;
            }));

            newsList = newsList.filter(news => news !== null);

            dispatch(getNewsListSuccess(newsList));
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
            const news = response.data;
            dispatch(getComments(newsId));
            dispatch(getNewsSuccess(news));
        } catch (e) {
            dispatch(getNewsError(e))
        }
    }
}

export function getCommentsInCurrentNode(parentId, path) {
    return async (dispatch, getState) => {
        dispatch(getCommentsStart());
        try {
            const commentResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${parentId}.json?print=pretty`);
            if (commentResponse.data.kids) {
                let comments = await parseComments(commentResponse.data.kids);
                if (path) {
                    comments = findParentAndUpdateComments(comments, path, getState().newsComments.comments);
                }

                const newCommentsState = {
                    comments: comments,
                    numberOfComments: getState().newsComments.numberOfComments
                };

                dispatch(getCommentsSuccess(newCommentsState))
            } else {
                dispatch(setMessage('The news has no comments yet :('));
            }
        } catch (e) {
            dispatch(getCommentsError(e))
        }
    }
}

export function getComments(newsId, map = {}) {
    return async dispatch => {
        dispatch(getCommentsStart());
        try {
            const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`);
            dispatch(setMessage('Comments loading...'));
            if (response.data.kids) {
                let comments = await parseComments(response.data.kids);

                if (!objIsEmpty(map)) {
                    comments = await loadCommentWithMap(comments, map)
                }

                const newCommentsState = {
                    comments: comments,
                    numberOfComments: response.data.descendants
                };

                dispatch(getCommentsSuccess(newCommentsState));
                dispatch(setMessage('Comments have been updated'));
            } else {
                dispatch(newsHasNoComments());
            }
        } catch (e) {
            dispatch(getCommentsError(e))
        }
    }
}

async function parseComments(commentsIDs) {
    return await Promise.all(commentsIDs.map(async commentID => {
        const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentID}.json?print=pretty`);
        const comment = response.data;
        if (comment.deleted) {
            comment.by = 'Deleted comment'
        }
        return comment
    }));
}

function findParentAndUpdateComments(commentsToAdd, path, commentsState) {
    function wrap(commentsToAdd, path, commentsState) {
        for (let i = 0; i < commentsState.length; i++) {
            if (commentsState[i].id === path[0]) {
                if (path.length === 1) {
                    commentsState[i].kids = commentsToAdd;
                    break
                } else {
                    wrap(commentsToAdd, path.slice(1), commentsState[i].kids);
                    break
                }
            }
        }
    }

    const commentsStateCopy = copy(commentsState);
    wrap(commentsToAdd, path, commentsStateCopy);

    return commentsStateCopy;
}

async function loadCommentWithMap(comments, map) {
    const commentsCopy = copy(comments);

    async function wrap(comments, map) {
        return await Promise.all(comments.map(async comment => {
            if (typeof map[comment.id] !== 'undefined') {
                let kidsComments = await parseComments(comment.kids);
                if (!objIsEmpty(map[comment.id])) {
                    kidsComments = await wrap(kidsComments, map[comment.id]);
                }
                comment.kids = kidsComments
            }
            return comment
        }))
    }

    return await wrap(commentsCopy, map);
}

export function clearError() {
    return {
        type: CLEAR_ERROR
    }
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
        type: GET_NEWS_ERROR,
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

export function newsHasNoComments(newsComments) {
    return {
        type: NEWS_HAS_NO_COMMENTS,
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

export function setMessage(message) {
    return {
        type: SET_MESSAGE,
        message
    }
}

export function clearMessage() {
    return {
        type: CLEAR_MESSAGE
    }
}



