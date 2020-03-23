import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import LoginPage from '../index';

const renderer = new ShallowRenderer();

describe('<LoginPage />', () => {
	describe('Validation tests', () => {
		it('should render and match the snapshot', () => {
		  renderer.render(<LoginPage />);
		  const renderedOutput = renderer.getRenderOutput();
		  expect(renderedOutput).toMatchSnapshot();
		});
	});
});
