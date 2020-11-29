import React, {Component} from "react";
import classes from './News.module.scss'
import Button from "@material-ui/core/Button";
import {Loader} from "../../components/Loader/Loader";
import {getDate, getHostName} from "../../common/utils";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {clearNews, getNews} from "../../store/actions/newsActions";
import {Comments} from "../../components/Comments/Comments";

class News extends Component {
    constructor(props) {
        super(props);
        this.newsID = this.props.match.params.id;
    }

    componentDidMount() {
        this.props.getNews(this.newsID);
    }

    componentWillUnmount() {
        this.props.clearNews();
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
                        : <div className={classes.News}>
                            <div className={classes.Info}>
                                <div className={classes.mainInfo}>
                                    <div className={classes.title}>{this.props.news.title}</div>
                                    <div className={classes.otherInfo}>
                                        <div>{this.props.news.by}</div>
                                        <div>{getDate(this.props.news.time)}</div>
                                    </div>
                                </div>
                                <div onClick={this.goToPage} className={classes.site}>{getHostName(this.props.news.url)}</div>
                            </div>

                            <div className={classes.Comments}>
                                <div className={classes.header}>
                                    <div>{`Comments ${this.props.newsComments.numberOfComments}`}</div>
                                    <Button color="primary">Update</Button>
                                </div>
                            </div>


                        </div>

                }

            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        news: state.news.news,
        newsComments: state.news.newsComments,
        loading: state.news.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getNews: (newsId) => dispatch(getNews(newsId)),
        clearNews: () => dispatch(clearNews())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(News)
