import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import App from '../index';

const renderer = new ShallowRenderer();

describe('<AccountPage />', () => {
	describe('Validation tests', () => {
		it('should render and match the snapshot', () => {
		  renderer.render(<App />);
		  const renderedOutput = renderer.getRenderOutput();
		  expect(renderedOutput).toMatchSnapshot();
		});
	});
});
