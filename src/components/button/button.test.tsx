import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import renderer from 'react-test-renderer';
import {Button} from './index';

configure({adapter: new Adapter()});
describe('Button test', () => {
	it('Snapshot', () => {
		const tree = renderer.create(
			<Button onClick={() => ''}>I'm button, and you?</Button>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Click', () => {
		const mockCallBack = jest.fn();

		const button = shallow((<Button onClick={mockCallBack}>Click me</Button>));
		button.find('button').simulate('click');
		expect(mockCallBack.mock.calls.length).toEqual(1);
	});
});
