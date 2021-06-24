import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import {mount, configure} from 'enzyme';
import {Notification, INotificationCompProps} from './index';

configure({adapter: new Adapter()});
interface IData {
	error: INotificationCompProps,
	success: INotificationCompProps
}
describe('Notification test', () => {
	const data: IData = {
		error: {
			type: 'error',
			text: 'Error text'
		},
		success: {
			type: 'success',
			text: 'Success  text'
		}
	};
	const errorTemplate = <Notification {...data.error} />;
	const successTemplate = <Notification {...data.success} />;
	it('Snapshot error', () => {
		const tree = renderer.create(errorTemplate).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Snapshot success', () => {
		const tree = renderer.create(successTemplate).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('Props error', () => {
		const comp = mount(errorTemplate);

		expect(comp.text()).toMatch(data.error.text);
		expect(comp.props().type).toMatch(data.error.type);
		expect(comp.props().text).toMatch(data.error.text);
	});
	it('Props success', () => {
		const comp = mount(successTemplate);

		expect(comp.text()).toMatch(data.success.text);
		expect(comp.props().type).toMatch(data.success.type);
		expect(comp.props().text).toMatch(data.success.text);
	});
});
