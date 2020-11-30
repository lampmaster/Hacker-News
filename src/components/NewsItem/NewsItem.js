import React from "react";
import {Link} from "react-router-dom";
import classes from './NewsItem.module.scss'
import {getDate} from "../../common/utils";

export const NewsItem = ({news}) => {
    const scoreStyle = [classes.ItemPoints];
    const postfix = news.score > 1 ? 's' : '';

    if (news.score <= 1) {
        scoreStyle.push(classes.low)
    } else if (news.score < 50) {
        scoreStyle.push(classes.mid)
    } else {
        scoreStyle.push(classes.high)
    }

    return (
        <div className={classes.Item}>
            <Link to={`/news/${news.id}`} className={classes.ItemTitle}>{news.title}</Link>
            <div className={classes.ItemInfo}>
                <div className={classes.MainInfo}>
                    <div>{news.by}</div>
                    <div>{getDate(news.time)}</div>
                </div>

                <div className={scoreStyle.join(' ')}>{`${news.score} point${postfix}`}</div>
            </div>
        </div>
    )
};
