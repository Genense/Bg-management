import React from 'react';
import { shallow } from 'enzyme';
import School from '../pages/school/schoolList'; // 引入对应的 React 组件

it('renders with Result', () => {
  const wrapper = shallow(<School />); // 进行渲染
  expect(wrapper.find('Result').length).toBe(1); // 有 Result 组件
  expect(wrapper.find('Result').prop('type')).toBe('success'); // Result 组件的类型是成功
});
