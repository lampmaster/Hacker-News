import React from 'react';
import classes from './Comments.module.scss'
import {getDate} from "../../common/utils";

export const Comments = ({comments, openedReplies, onChange, handler, path = []}) => {
    const openReplies = (commentId, kids) => {
        if (openedReplies[commentId]) {
            delete openedReplies[commentId];
        } else {
            openedReplies[commentId] = {};
            if (isNeedToLoadKids(kids)) {
                handler([...path, commentId]);
            }
        }
        onChange(openedReplies)
    };

    const handleSubReplies = (commentId, subSelections) => {
        openedReplies[commentId] = subSelections;
        onChange(openedReplies);
    };

    const isNeedToLoadKids = (kids) => {
        return  kids[0].type !== 'comment';
    };

    const isShowComments = (kids, commentId) => {
        return typeof kids !== 'undefined' && openedReplies.hasOwnProperty(commentId);

    };

    const repliesText = (kids) => {
        return kids ? `${kids.length} replies` : ''
    };

    const generateChildComment = (comment) => {
        if (isShowComments(comment.kids, comment.id)) {
            if (isNeedToLoadKids(comment.kids)) {
                return <div className={classes.commentsLoader}/>
            } else {
                return (
                    <Comments
                        comments={comment.kids}
                        openedReplies={openedReplies[comment.id]}
                        onChange={(subSelection) => handleSubReplies(comment.id, subSelection, comment.kids)}
                        handler={(path) => handler(path)}
                        path={[...path, comment.id]}
                    />
                )
            }
        } else {
            return null
        }
    };


    return (
        <React.Fragment>
            {
                comments.map(comment => {
                    return (
                        <div key={comment.id} className={classes.wrapper}>
                            <img className={classes.avatar}
                                 src={`https://avatars.dicebear.com/api/bottts/${comment.by}.svg?options[width][]=30`} alt=""/>
                            <div className={classes.comment}>
                                <div className={classes.nick}>{comment.by}</div>
                                <div className={classes.text}>{comment.text}</div>
                                <div className={classes.bottom}>
                                    <div className={classes.time}>{getDate(comment.time)}</div>
                                    <div onClick={() => {
                                        openReplies(comment.id, comment.kids)
                                    }}
                                         className={classes.replies}>{repliesText(comment.kids)}</div>
                                </div>
                                <React.Fragment>
                                    {
                                        generateChildComment(comment)
                                    }
                                </React.Fragment>
                            </div>
                        </div>
                    )
                })
            }
        </React.Fragment>
    )
};
