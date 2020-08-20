import React from 'react';
import { cleanup } from '@testing-library/react';
import App from './App';
import { createShallow } from '@material-ui/core/test-utils';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';

describe('<App/>', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  })

  afterEach(cleanup);

  test('should render header', () => {
    const wrapper = shallow(<App />);
    const element = wrapper.find(Header);
    expect(element.length).toBe(1);
  });

  test('shloud render searchBar', () => {
    const wrapper = shallow(<App />);
    const element = wrapper.find(SearchBar);
    expect(element.length).toBe(1);
  })

})