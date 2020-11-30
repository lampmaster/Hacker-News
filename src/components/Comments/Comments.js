import React from 'react';
import classes from './Comments.module.scss'
import {getDate} from "../../common/utils";

export const Comments = ({comments, openedReplies, onChange}) => {
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
                        <div key={comment.id} className={classes.wrapper}>
                            <img className={classes.avatar}
                                 src={`https://avatars.dicebear.com/api/bottts/${comment.by}.svg?options[width][]=30`} alt=""/>
                            <div className={classes.comment}>
                                <div className={classes.nick}>{comment.by}</div>
                                <div className={classes.text}>{comment.text}</div>
                                <div className={classes.bottom}>
                                    <div className={classes.time}>{getDate(comment.time)}</div>
                                    <div onClick={() => {
                                        openReplies(comment.id)
                                    }}
                                         className={classes.replies}>{comment.childComentsNumber ? `${comment.childComentsNumber} replies` : ''}</div>
                                </div>
                                <React.Fragment>
                                    {
                                        comment.kids && openedReplies[comment.id] &&
                                        <Comments
                                            comments={comment.kids}
                                            openedReplies={openedReplies[comment.id]}
                                            onChange={(subSelection) => handleSubReplies(comment.id, subSelection)}
                                        />
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
