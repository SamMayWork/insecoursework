import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import AccountPage from '../index';

const renderer = new ShallowRenderer();

import testData from './data.js';

describe('<AccountPage />', () => {
	describe('Validation tests', () => {
		it('should render and match the snapshot', () => {
		  renderer.render(<AccountPage />);
		  const renderedOutput = renderer.getRenderOutput();
		  expect(renderedOutput).toMatchSnapshot();
		});
	});
});
