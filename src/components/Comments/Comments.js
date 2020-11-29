import React from 'react';
import classes from './Comments.module.scss'
import {getDate} from "../../common/utils";

export const Comments = ({comments}) => {
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
                                <div className={classes.replies}>{comment.childComentsNumber ? `${comment.childComentsNumber} replies` : ''}</div>
                            </div>
                            <div className={classes.container}>
                                {
                                    comment.kids && <Comments comments={comment.kids}/>
                                }
                            </div>
                        </div>
                    )
                })
            }


        </React.Fragment>
    )
};
