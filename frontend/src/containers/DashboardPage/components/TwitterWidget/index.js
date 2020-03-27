import React, { useState } from 'react';

import {
	Card,
	CardHeader,
	CardContent,
	Divider,
	Button
} from '@material-ui/core';
import Weather from 'simple-react-weather';
import { makeStyles } from '@material-ui/core/styles';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
const useStyles = makeStyles(theme => ({
	tight: {
		padding: theme.spacing(0),
		marginBottom: theme.spacing(-4)
	},
	space: {
		marginBottom: theme.spacing(2)
	}
}));

const SocialDialog = props => {
	return (
		<Button
			color = "primary"
			size = "small"
			variant = "outlined"
		>
			Change Feed
		</Button>
	);
}

const TwitterWidget = props => {
	const classes = useStyles();
	const [screenname, setScreenname] = useState('portsmouthuni');
	return (
		<Card className={classes.space}>
			<CardHeader
				action = {
					<SocialDialog/>
				}
				titleTypographyProps = {{ variant: 'h7' }}
				title="Social Media"
			/>
			<Divider/>
			<CardContent className = {classes.tight}>
				<TwitterTimelineEmbed
					fullWidth
					sourceType = "profile"
					screenName = {screenname}
					options = {{height: 300}}
				/>
			</CardContent>
		</Card>
	);
}

export default TwitterWidget;
