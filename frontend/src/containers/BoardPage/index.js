import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Navbar from '../Navbar';
import Sidebar from '../../components/Sidebar';

import Post from '../../components/Post';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(2)
	}
}));

const BoardPage = props => {
	const [posts, setPosts] = useState([]);
	const [openSidebar, setOpenSidebar] = useState(false);
	
	const classes = useStyles();
	
	const updatePosts = posts => {
		fetch('/get?boardid=cfd5636c')
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
	useEffect(() => {updatePosts(posts)}, []);
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
