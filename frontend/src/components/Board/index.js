import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {NavLink as RouterLink} from 'react-router-dom';

import {
	Card,
	CardHeader,
	CardContent,
	Typography,
	Chip
} from '@material-ui/core';


/*
*
* Routerlink for forwarding the user to the selected link when interacting with a board card
*
*/

const CustomRouterLink = forwardRef((props, ref) => (
	<Card
		ref={ref}
		style = {{flexGrow: 1}}
		style = {{ margin: '1rem' }}
	>
		<RouterLink {...props} />
	</Card>
));

/**
 * 
 * @param {Object} props Accepts an object containing the elements state
 *  
 */


const Board = props => {
	return (
		<Card
			component={CustomRouterLink}
			to={props.href}	
		>
			<CardHeader
				title = {props.title}
				titleTypographyProps = {{variant: 'h7'}}
			/>
			<CardContent
				contentTypographyProps = {{variant: 'h8'}}
				style = {{ fontSize: '0.8rem' }}
			>
				<div style = {{ marginBottom: '1rem' }}>{props.year}</div>
			</CardContent>
		</Card>
	);
}

Board.propTypes = {
	title: PropTypes.string.isRequired,
	
};

export default Board;
