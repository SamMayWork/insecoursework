import React from 'react';
import PropTypes from 'prop-types';

import {
	Card,
	CardHeader,
	CardContent,
	Typography,
	Chip
} from '@material-ui/core';
import ViewsIcon from '@material-ui/icons/Visibility';

const Board = props => {
	return (
		<Card style = {{ margin: '1rem' }}>
			<CardHeader
				title = {props.title}
				titleTypographyProps = {{variant: 'h7'}}
			/>
			<CardContent
				contentTypographyProps = {{variant: 'h8'}}
				style = {{ fontSize: '0.8rem' }}
			>
				<div style = {{ marginBottom: '1rem' }}>{props.year}</div>
				{/*<Chip icon={<ViewsIcon />} label={props.views}></Chip>*/}
			</CardContent>
		</Card>
	);
}

Board.propTypes = {
	title: PropTypes.string.isRequired,
	
};

export default Board;
