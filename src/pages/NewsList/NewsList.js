import React, {Component} from 'react';
import classes from './NewsList.module.scss'
import {NewsItem} from "../../components/NewsItem/NewsItem";
import {connect} from "react-redux";
import {getNewsList, setMessage} from "../../store/actions/newsActions";
import {Loader} from "../../components/Loader/Loader";
import Button from "@material-ui/core/Button";
import {debounce} from "../../common/utils";

class NewsList extends Component {
    constructor(props) {
        super(props);
        this.autoupdateTimer = null;
    }

    componentDidMount() {
        this.updateNewsList = debounce(this.updateNewsList, 300);
        this.props.getNewsList();
        this.autoUpdateNewsList();
    }

    componentWillUnmount() {
        clearTimeout(this.autoupdateTimer);
    }

    autoUpdateNewsList() {
        this.autoupdateTimer = setInterval(() => {
            this.props.getNewsList();
            this.props.setMessage('Auto update news list')
        }, 60000);
    }

    updateNewsList() {
        this.props.getNewsList();
        clearTimeout(this.autoupdateTimer);
        this.autoUpdateNewsList();
    }

    renderNewsList() {
        const list = this.props.newsList.map(news => {
            return <NewsItem key={news.id} news={news}/>
        });

        return (
            <React.Fragment>
                <div className={classes.header}>
                    <div className={classes.headerTitle}>Last 100 News</div>
                    <Button onClick={() => this.updateNewsList()}>Update</Button>
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
        newsList: state.newsList,
        loading: state.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getNewsList: () => dispatch(getNewsList()),
        setMessage: (msg) => dispatch(setMessage(msg))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsList)
