import React, {Component} from "react";
import Snackbar from "@material-ui/core/Snackbar";
import {clearError, clearMessage} from "../../store/actions/newsActions";
import {connect} from "react-redux";

class Message extends Component {
    clearMessageText() {
        this.props.clearError();
        this.props.clearMessage();
    }

    isOpen() {
        return this.props.error !== null || this.props.message !== null;
    }

    getMessage() {
        return this.props.error?.message || this.props.message
    }

    render() {
        return (
            <Snackbar  open={this.isOpen()} autoHideDuration={6000} onClose={() => this.clearMessageText()} message={this.getMessage()}>
            </Snackbar>
        )
    }
}

function mapStateToProps(state) {
    return {
        error: state.error,
        message: state.message,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearError: () => dispatch(clearError()),
        clearMessage: () => dispatch(clearMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message)
