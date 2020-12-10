// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
   adapter: new EnzymeAdapter()
});
