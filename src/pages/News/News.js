import React, {Component} from "react";
import classes from './News.module.scss'
import Button from "@material-ui/core/Button";
import {Loader} from "../../components/Loader/Loader";
import {getDate, getHostName, objIsEmpty} from "../../common/utils";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {clearNews, getComments, getNews} from "../../store/actions/newsActions";
import {Comments} from "../../components/Comments/Comments";

class News extends Component {
    constructor(props) {
        super(props);
        this.newsId = this.props.match.params.id;
        this.state = {
            openedReplies: {}
        };
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
            this.props.getComments(this.newsId);
        }, 60000)
    }

    getComments() {
        clearTimeout(this.autoupdateTimer);
        this.autoUpdateComments();
        this.props.getComments(this.newsId);
    }

    goToPage() {
        window.open(this.props.news.url)
    };

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
                                    <div>{`Comments ${this.props.news.descendants}`}</div>
                                    <Button
                                        color="primary"
                                        onClick={() => this.getComments()}
                                    >Update</Button>
                                </div>
                                <Comments
                                    comments={this.props.newsComments.comments}
                                    openedReplies={this.state.openedReplies}
                                    onChange={(openedReplies) => this.setState({openedReplies})}
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
        getComments: (newsId) => dispatch(getComments(newsId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(News)
