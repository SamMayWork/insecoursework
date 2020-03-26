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

const CustomRouterLink = forwardRef((props, ref) => (
	<Card
		ref={ref}
		style = {{flexGrow: 1}}
		style = {{ margin: '1rem' }}
	>
		<RouterLink {...props} />
	</Card>
));

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
