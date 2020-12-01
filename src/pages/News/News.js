import React, {Component} from "react";
import classes from './News.module.scss'
import Button from "@material-ui/core/Button";
import {Loader} from "../../components/Loader/Loader";
import {getDate, getHostName, objIsEmpty} from "../../common/utils";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {
    clearNews,
    getComments,
    getCommentsInCurrentNode,
    getNews
} from "../../store/actions/newsActions";
import {Comments} from "../../components/Comments/Comments";

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openedReplies: {}
        };
        this.newsId = this.props.match.params.id;
        this.autoupdateTimer = null;
    }

    componentDidMount() {
        this.props.getNews(this.newsId);
        this.autoUpdateComments();
    }

    componentWillUnmount() {
        this.props.clearNews();
        clearTimeout(this.autoupdateTimer)
    }

    autoUpdateComments() {
        this.autoupdateTimer = setInterval(() => {
            this.props.getComments(this.newsId, this.state.openedReplies);
        }, 60000)
    }

    updateComments() {
        clearTimeout(this.autoupdateTimer);
        this.autoUpdateComments();
        this.props.getComments(this.newsId, this.state.openedReplies);
    }

    goToPage() {
        window.open(this.props.news.url)
    };

    commentHandler(path) {
        const parentId = path[path.length - 1];
        this.props.getCommentsInCurrentNode(parentId, path);
    }

    render() {
        return (
            <React.Fragment>
                <div className={classes.navigation}>
                    <Link to="/"><Button>Back to main</Button></Link>
                </div>
                {
                    this.props.loading
                        ? <Loader/>
                        :
                        <React.Fragment>
                            {
                                !objIsEmpty(this.props.news) &&
                                <div className={classes.Container}>
                                    <div className={classes.Info}>
                                        <div className={classes.mainInfo}>
                                            <div className={classes.title}>{this.props.news.title}</div>
                                            <div className={classes.otherInfo}>
                                                <div>{this.props.news.by}</div>
                                                <div>{getDate(this.props.news.time)}</div>
                                            </div>
                                        </div>
                                        <div onClick={() => this.goToPage()} className={classes.site}>{getHostName(this.props.news.url)}</div>
                                    </div>
                                </div>
                            }

                            <div className={classes.Container}>
                                <div className={classes.Comments}>
                                    <div>{`Comments ${this.props.newsComments.numberOfComments}`}</div>
                                    <Button
                                        color="primary"
                                        onClick={() => this.updateComments()}
                                    >Update</Button>
                                </div>
                                <Comments
                                    comments={this.props.newsComments.comments}
                                    openedReplies={this.state.openedReplies}
                                    onChange={(openedReplies) => this.setState({openedReplies})}
                                    handler={(path) => this.commentHandler(path)}
                                />
                            </div>
                        </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        news: state.news,
        newsComments: state.newsComments,
        loading: state.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getNews: (newsId) => dispatch(getNews(newsId)),
        clearNews: () => dispatch(clearNews()),
        getCommentsInCurrentNode: (commentIDs, path, newsId) => dispatch(getCommentsInCurrentNode(commentIDs, path, newsId)),
        getComments: (newsId, map) => dispatch(getComments(newsId, map))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(News)
