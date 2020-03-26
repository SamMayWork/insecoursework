import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

const renderer = new ShallowRenderer();

import BoardsPage from '../index';

// import testData from './testData.js';

const testComponent = props => {
	return (
		<BoardsPage/>
	);
}

describe('<BoardsPage/>', () => {
	describe('Validation testing', () => {
		/*
			NOTE: This test ensures that the page is loading the data from the DB
						correctly as the snapshot will have the correct data loaded inside
		*/
		it('should render and match the snapshot', () => {
			renderer.render(React.createElement(testComponent));
			const renderedOutput = renderer.getRenderOutput();
		  expect(renderedOutput).toMatchSnapshot();
		});
	});
});
