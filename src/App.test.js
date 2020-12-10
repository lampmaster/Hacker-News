import React from "react";
import {shallow} from "enzyme";
import App from "./App";
import {TopBar} from "./components/Topbar/Topbar";
import Message from "./components/Message/Message";

describe('App component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<App/>);
    });

    it('Should be render a Topbar component', () => {
        expect(wrapper.find(TopBar).length).toBe(1);
    });

    it('Should be render a Message component', () => {
        expect(wrapper.find(Message).length).toBe(1);
    });
});
