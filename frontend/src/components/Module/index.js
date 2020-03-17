import React from 'react';

import {
	Card,
	CardHeader,
	CardContent,
	Typography,
	Chip
} from '@material-ui/core';
import ViewsIcon from '@material-ui/icons/Visibility';

const Module = props => {
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
				<div style = {{ marginBottom: '1rem' }}>Module Summary</div>
				<Chip icon={<ViewsIcon />} label={props.views}></Chip>
			</CardContent>
		</Card>
	);
}

export default Module;
