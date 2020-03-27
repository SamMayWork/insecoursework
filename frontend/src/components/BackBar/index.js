import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {
	Typography,
	AppBar,
	Toolbar,
	IconButton
} from '@material-ui/core';

import BackButton from '../BackButton';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'sticky',
    top: 0,
    left: 0
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

/**
 * 
 * @param {Object} props Accepts an object containing the elements state
 *  
 */

export default function BackBar(props) {
  const classes = useStyles();
  return (
  	<div className={classes.grow, classes.root}>
  		<AppBar position="static">
  			<Toolbar>
  				<BackButton/>
					<Typography variant="h6" noWrap>
          	{props.title}
        	</Typography>
  			</Toolbar>
  		</AppBar>
  	</div>
  );
}
