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
		// Visual validation tests
		it('should render and match the snapshot', () => {
			renderer.render(React.createElement(testComponent));
			const renderedOutput = renderer.getRenderOutput();
		  expect(renderedOutput).toMatchSnapshot();
		});
		
		// Single query validation tests
		it('should allow searching for a post by title', () => {
			
		});
		it('should allow searching for a post from a starting date and time until the current date and time', () => {
			
		});
		it('should allow searching for a post by keywords stored as metadata', () => {
			
		});
		it('should allow searching for a post by author', () => {
			
		});
		it('should allow searching for a post by its board', () => {
			
		});
		
		// Multiple query validation tests
		it('should allow searching for a post by title, starting date and time, keywords, author and board', () => {
			
		});
	});
	describe('Defect testing', () => {
		// Single query defect testing
		it('should not allow searching for posts past the current date and time', () => {
			
		});
	});
});
