import React from 'react';
import classes from './Comments.module.scss'
import {getDate} from "../../common/utils";

export const Comments = ({comments, openedReplies, onChange}) => {

    console.log(openedReplies);

    const openReplies = (commentId) => {
        if (openedReplies[commentId]) {
            delete openedReplies[commentId];
        } else {
            openedReplies[commentId] = {};
        }
        onChange(openedReplies)
    };

    const handleSubReplies = (optionId, subSelections) => {
        openedReplies[optionId] = subSelections;
        onChange(openedReplies);
    };

    return (
        <React.Fragment>
            {
                comments.map(comment => {
                    return (
                        <div key={comment.id} className={classes.Comments}>
                            <div className={classes.nick}>{comment.by}</div>
                            <div className={classes.text}>{comment.text}</div>
                            <div className={classes.bottom}>
                                <div className={classes.time}>{getDate(comment.time)}</div>
                                <div onClick={() => {openReplies(comment.id)}} className={classes.replies}>{comment.childComentsNumber ? `${comment.childComentsNumber} replies` : ''}</div>
                            </div>
                            <div className={classes.container}>
                                {
                                    comment.kids && openedReplies[comment.id] &&
                                    <Comments
                                        comments={comment.kids}
                                        openedReplies={openedReplies[comment.id]}
                                        onChange={(subSelection) => handleSubReplies(comment.id, subSelection)}
                                    />
                                }
                            </div>
                        </div>
                    )
                })
            }


        </React.Fragment>
    )
};
