import React from 'react';
import { cleanup } from '@testing-library/react';
import { createShallow } from '@material-ui/core/test-utils';
import EmptyPage from '../EmptyPage';
import SearchIcon from '@material-ui/icons/Search';

describe('<EmptyPage/>', () => {
    let shallow;

    beforeAll(() => {
        shallow = createShallow();
    })

    afterEach(cleanup);

    test('should render search icon', () => {
        const wrapper = shallow(<EmptyPage/>);
        const element = wrapper.find(SearchIcon)
        expect(element.length).toBe(1)
    })

    test('should render description', () => {
        const wrapper = shallow(<EmptyPage/>);
        const element = wrapper.find('#empty-page-desc')
        expect(element.length).toBe(1)
    })

    

})