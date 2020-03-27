import React, {useState, useEffect, forwardRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Navbar from '../Navbar';
import Sidebar from '../../components/Sidebar';
import moment from 'moment';

import {
	useLocation,
	NavLink as RouterLink
} from 'react-router-dom';
import {
	Fab
} from '@material-ui/core';
import {
	Add as AddIcon
} from '@material-ui/icons';

import Post from '../../components/Post';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(2)
	},
	fab: {
		position: 'fixed',
		right: theme.spacing(2),
		bottom: theme.spacing(2)
	}
}));

const CustomRouterLink = forwardRef((props, ref) => (
	<div
		ref={ref}
		style = {{flexGrow: 1}}
		style = {{ margin: '1rem' }}
	>
		<RouterLink {...props} />
	</div>
));

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};
	
/**
 * 
 * @param {Object} props Accepts an object containing the elements state
 *  
 */


const BoardPage = props => {
	const [posts, setPosts] = useState([]);
	const [openSidebar, setOpenSidebar] = useState(false);
	const classes = useStyles();
	let query = useQuery();
	
	const updatePosts = () => {
		if (query.get('id')) {
			let board_id = query.get('id');
			fetch(`/get?boardid=${board_id}`)
			.then(res => res.json())
			.then(
				(result) => {
					let posts = result;
					posts.reverse();
					console.log(posts);
					setPosts(posts);
				},
				(error) => {
					console.log('[ERROR: CANT LOAD POSTS INTO BOARD]', error);
				}
			)
		} else if (query.get('searchterm') || query.get('searchtags')) {
			let searchterm = query.get('searchterm');
			let searchtags = query.get('searchtags');
			console.log(searchterm, searchtags);
			fetch(`/get/search?type=post&searchtags=${searchtags}`)
			.then(res => res.json())
			.then(
				(result) => {
					let posts = result;
					console.log(posts);
					setPosts(posts);
				},
				(error) => {
					console.log('[ERROR: CANT LOAD POSTS INTO BOARD]', error);
				}
			)
		}
	};
	useEffect(() => {
		updatePosts();
	}, []);
	const handleSidebarOpen = () => {
		setOpenSidebar(true);
	};
	const handleSidebarClose = () => {
		setOpenSidebar(false);
	};
	return (
		<div>
			<Navbar
				title = "Board"
				onSidebarOpen = {handleSidebarOpen}
				showSearch = {true}
				boardid = {query.get('id')}
			/>
			<Sidebar
				onClose = {handleSidebarClose}
				open = {openSidebar}
				variant = {'temporary'}
			/>
			<div className = {classes.root}>
				{posts.slice(0, 20).map((post, i) => (
					<Post
						post_id = {post.post_id}
						component = {CustomRouterLink}
						to = {`/post?id=${post.post_id}`}
						key = {i}
						title = {post.post_title}
						content = {post.post_content}
						author = {post.user_id}
						likes = {post.post_likes}
						creationDate = {moment(post.created_date)}
						reported = {post.reported}
					/>
				))}
			</div>
			<Fab href={`/forum/create?type=post&board_id=${query.get('id')}`} className={classes.fab} color="primary" aria-label="add">
				<AddIcon/>
			</Fab>
		</div>
	);
};

export default BoardPage;
