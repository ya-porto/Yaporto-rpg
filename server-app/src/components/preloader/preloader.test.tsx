import React from 'react';
import renderer from 'react-test-renderer';
import {Preloader} from './index';

describe('Preloader test', () => {
	it('Snapshot', () => {
		const tree = renderer.create(
			<Preloader />
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
