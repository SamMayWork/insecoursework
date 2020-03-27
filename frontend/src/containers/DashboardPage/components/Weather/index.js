import React from 'react';

import {
	Card,
	CardHeader,
	CardContent,
	Divider,
} from '@material-ui/core';
import Weather from 'simple-react-weather';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	tight: {
		padding: theme.spacing(2)
	},
	space: {
		marginBottom: theme.spacing(2)
	}
}));

const WeatherComponent = props => {
	const classes = useStyles();
	const divStyle = {
    color: 'black'
  };
	return (
		<Card className={classes.space}>
			<CardHeader
				titleTypographyProps = {{ variant: 'h7' }}
				title="Weather"
			/>
			<Divider/>
			<CardContent className = {classes.tight}>
				<Weather style={divStyle} unit="C" city="Portsmouth" appid="45a03a49afb30df0fdfba49509ef8c1a" />
			</CardContent>
		</Card>
	);
}

export default WeatherComponent;
