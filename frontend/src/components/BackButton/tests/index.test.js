/**
 * Testing our Button component
 */

import React from 'react';
import {
	Router,
	MemoryRouter
} from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import BackButton from '../index';
import { useLocation } from 'react-router-dom';

const renderer = new ShallowRenderer();

describe('<BackButton />', () => {
	describe('Validation testing', () => {
		/*
		it('should render and match the snapshot', () => {
			renderer.render(
				<Router>
					<BackButton id="button"/>
				</Router>
			);
			const renderedOutput = renderer.getRenderOutput();
			expect(renderedOutput).toMatchSnapshot();
		});
		*/
		it('should navigate back one page on click if their is a previous page in the history', () => {
			const history = createMemoryHistory();
			const { container } = render(
				<MemoryRouter initialEntries={['/', '/account']}>
					<BackButton/>
				</MemoryRouter>
			);
			console.log(container.innerHTML);
			let item = container.querySelector('button');
			fireEvent.click(item);
			console.log(container.innerHTML);
			// expect(onClickSpy).toHaveBeenCalled();
		});
  });
  describe('Defect testing', () => {
  	
  });
});
