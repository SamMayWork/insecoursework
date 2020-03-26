import React, {useState, useEffect, forwardRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Navbar from '../Navbar';
import Sidebar from '../../components/Sidebar';
import {
	useLocation,
	NavLink as RouterLink
} from 'react-router-dom';

import Post from '../../components/Post';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(2)
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
	
const BoardPage = props => {
	const [posts, setPosts] = useState([]);
	const [openSidebar, setOpenSidebar] = useState(false);
	const classes = useStyles();
	let query = useQuery();
	
	const updatePosts = board_id => {
		fetch(`/get?boardid=${board_id}`)
			.then(res => res.json())
			.then(
				(result) => {
					let posts = result;
					console.log(posts);
					setPosts(posts);
				},
				(error) => {
					console.log('[ERROR: CANT LOAD POSTS INTO BOAD]', error);
				}
			)
	};
	useEffect(() => {
		updatePosts(query.get('id'));
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
			/>
			<Sidebar
				onClose = {handleSidebarClose}
				open = {openSidebar}
				variant = {'temporary'}
			/>
			<div className = {classes.root}>
				{posts.slice(0, 20).map((post, i) => (
					<Post
						component = {CustomRouterLink}
						to = {`/post?id=${post.post_id}`}
						key = {i}
						title = {post.post_title}
						content = {post.post_content}
					/>
				))}
			</div>
		</div>
	);
};

export default BoardPage;
