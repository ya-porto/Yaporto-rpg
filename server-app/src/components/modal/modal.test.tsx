import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {mount, configure} from 'enzyme';
import renderer from 'react-test-renderer';
import {Modal} from './index';

configure({adapter: new Adapter()});
describe('Modal test', () => {
	const content = 'Modal content';
	const template = <Modal show>{content}</Modal>;
	it('Snapshot', () => {
		const tree = renderer.create(template).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Content', () => {
		const comp = mount(template);

		expect(comp.text()).toMatch(content);
	});
});
