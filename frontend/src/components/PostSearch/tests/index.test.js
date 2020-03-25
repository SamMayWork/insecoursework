import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

const renderer = new ShallowRenderer();

import PostSearch from '../index';

import testData from './testData.js';

const testComponent = props => {
	return (
		<PostSearch
			title = {testData.title}
			startDate = {testData.startData}
			startTime = {testData.startTime}
			keywords = {testData.keywords}
			author = {testData.author}
			boards = {testData.boards}
		/>
	);
}

describe('<PostSearch/>', () => {
	describe('Validation testing', () => {
		it('should render and match the snapshot', () => {
			renderer.render(React.createElement(testComponent));
			const renderedOutput = renderer.getRenderOutput();
		  expect(renderedOutput).toMatchSnapshot();
		});
	});
});
