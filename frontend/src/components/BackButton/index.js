import React from 'react';
import { makeStyles } from '@material-ui/styles/';
import {
	IconButton
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withRouter } from 'react-router-dom';



/*
*
* Styles for the Back Button Component (Adds a backwards functionality to the application)
*
*/

const useStyles = makeStyles(theme => ({
  backButton: {
    
  },
}));

/**
 * 
 * @param {Object} props Accepts an object containing the elements state
 *  
 */


function BackButton(props) {
	const classes = useStyles();
	const handleBack = () => {
		props.history.goBack();
	}
	return (
		<IconButton
			onClick = { handleBack }
	    edge="start"
	    className={classes.backButton}
	    color="inherit"
	    aria-label="go back"
	  >
	    <ArrowBackIcon />
	  </IconButton>
	);
}

export default withRouter(BackButton);
