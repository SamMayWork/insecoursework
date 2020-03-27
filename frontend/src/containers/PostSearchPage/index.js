import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BackBar from '../../components/BackBar';
import PostSearch from '../../components/PostSearch';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(0)
	}
}));

/**
 * 
 * @param {Object} props Accepts an object containing the elements state
 *  
 */

 
//Allows for post searching functionality
const PostSearchPage = props => {
	const classes = useStyles();
	//Structure of the page
  return (
    <div>
    	<BackBar
    		title = "Post Search"
    	/>
    	<div className={classes.root}>
    		<PostSearch/>
    	</div>
    </div>
  );
}

export default PostSearchPage;
