import React, {Component} from 'react';
import classes from './NewsList.module.scss'
import {NewsItem} from "../../components/NewsItem/NewsItem";
import {connect} from "react-redux";
import {getNewsList} from "../../store/actions/newsActions";
import {Loader} from "../../components/Loader/Loader";
import Button from "@material-ui/core/Button";

class NewsList extends Component {
    constructor(props) {
        super(props);
        this.autoupdateTimer = null;
    }

    componentDidMount() {
        this.props.getNewsList();
        this.autoUpdateNews();
    }

    componentWillUnmount() {
        clearTimeout(this.autoupdateTimer);
    }

    autoUpdateNews() {
        this.autoupdateTimer = setTimeout(() => {
            this.props.getNewsList()
        }, 60000)
    }

    renderNewsList() {
        const list = this.props.newsList.map(news => {
            return <NewsItem key={news.id} news={news}/>
        });

        return (
            <React.Fragment>
                <div className={classes.header}>
                    <div className={classes.headerTitle}>100 свежих новостей</div>
                    <Button onClick={this.props.getNewsList}>Update</Button>
                </div>
                {list}
            </React.Fragment>
        )

    }

    render() {
        return (
            <React.Fragment>
                {
                    this.props.loading
                        ? <Loader/>
                        : <div className={classes.NewsList}>{this.renderNewsList()}</div>
                }
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        newsList: state.news.newsList,
        loading: state.news.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getNewsList: () => dispatch(getNewsList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsList)
