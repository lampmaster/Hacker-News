import React from "react";
import Message from './Message';
import configureStore from 'redux-mock-store'
import {shallow} from "enzyme";
import {Snackbar} from "@material-ui/core";


const mockStore = configureStore({});
const setUp = (initState = {}, props={}) => {
    const store = mockStore(initState);
    const wrapper = shallow(<Message store={store}/>).childAt(0).dive();
    wrapper.setProps({...props});
    return wrapper;
};

describe('test Message component', () => {
    let state;
    let wrapper;

    beforeEach(() => {
        const initState = mockStore({
            error: null,
            message: null
        });

        wrapper = setUp(initState);
    });

    it('should return true for isOpen getter when message or error is not null', () => {
        state = {
            error: null,
            message: 'Some message'
        };
        wrapper = setUp(state);
        expect(wrapper.instance().isOpen).toBeTruthy();

        state = {
            error: 'Some error',
            message: null
        };
        wrapper = setUp(state);
        expect(wrapper.instance().isOpen).toBeTruthy();
    });

    it('should return error of another message when message or error props is not null', () => {
        state = {
            error: null,
            message: 'Some message'
        };
        wrapper = setUp(state);
        expect(wrapper.instance().message).toBe('Some message');

        state = {
            error: {
                message: 'Some error'
            },
            message: null
        };
        wrapper = setUp(state);
        expect(wrapper.instance().message).toBe('Some error');
    });

    it('Should call clearError and clearMessage actions on close event', () => {
        const clearErrorMockFn = jest.fn();
        const clearMessageMockFn = jest.fn();
        const props = {
            clearError: clearErrorMockFn,
            clearMessage: clearMessageMockFn
        };

        wrapper = setUp(undefined, props);
        const snackbarComponent = wrapper.find(Snackbar).at(0);
        snackbarComponent.props().onClose();
        expect(clearErrorMockFn.mock.calls.length).toBe(1);
        expect(clearMessageMockFn.mock.calls.length).toBe(1);
    })
});
