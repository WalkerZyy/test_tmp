import React from 'react';
import { shallow } from 'enzyme';
import P from '../P';

it('hellow world in P', () => {
    const wrapper = shallow(<P />);
    expect(wrapper.contains('hello world')).toBe(true);
});