import React from 'react';
import SideNav from './SideNav';
import '../../setupTests';
import renderer from 'react-test-renderer';
import store from '../../redux/store';
import { shallow, mount } from 'enzyme';


describe('SideNav renders',() => {
  it('renders', () => {
    const wrapper = shallow(<SideNav store={store} />);
    expect(wrapper.exists()).toBe(true);
  })

  it('SideNav component created', () => {
    const rendered = renderer.create(
      <SideNav store={store} />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  })

  it('find text:Categories', () => {
    const wrapper = mount(<SideNav store={store} />);
    const text = wrapper.find('h2').text();
    expect(text).toEqual('Categories');
  });

  it('side nav bar ul count', () => {
    const wrapper = mount(<SideNav store={store} />);
    const navBarLink = wrapper.find('ul');
    expect(navBarLink.length).toEqual(1);
  });
})