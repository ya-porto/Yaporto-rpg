import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import {mount, shallow, configure} from 'enzyme';
import {Input, IInputCompProps} from './index';

configure({adapter: new Adapter()});
describe('Input test', () => {
	const data: IInputCompProps = {
		value: 'invalid value',
		type: 'password',
		placeholder: 'Пароль',
		name: 'password',
		validation: {
			required: true,
			password: true
		},
		onChange: () => null
	};
	const template = <Input {...data} />;

	it('Snapshot', () => {
		const tree = renderer.create(template).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('Props', () => {
		const comp = mount(template);

		// @ts-ignore
		expect(comp.props().value).toMatch(data.value);
		expect(comp.props().type).toMatch(data.type);
		// @ts-ignore
		expect(comp.props().placeholder).toMatch(data.placeholder);
		// @ts-ignore
		expect(comp.props().name).toMatch(data.name);
		// @ts-ignore
		expect(comp.props().validation).toMatchObject(data.validation);
	});

	it('Validation', () => {
		const input = shallow(template);

		input.find('input').simulate('focus');
		// eslint-disable-next-line no-unused-expressions
		expect(input.state().error.isShow).toBeFalsy;

		input.find('input').simulate('blur');
		// eslint-disable-next-line no-unused-expressions
		expect(input.state().error.isShow).toBeTruthy;
	});
});
