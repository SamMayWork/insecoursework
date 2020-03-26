import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Navbar from '../../containers/Navbar';
import Sidebar from '../../components/Sidebar';
import Post from '../../components/Post';
import Comment from '../../components/Comment';
import {
	useLocation
} from 'react-router-dom';
import {
	Fab
} from '@material-ui/core';
import {
	Add as AddIcon
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(2)
	},
	comments: {
		paddingLeft: theme.spacing(2),
		borderLeft: '1px solid lightgray'
	},
	fab: {
		position: 'absolute',
		right: theme.spacing(2),
		bottom: theme.spacing(2)
	}
}));

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const PostPage = props => {
	const [openSidebar, setOpenSidebar] = useState(false);
	const [post, setPost] = useState("");
	const [comments, setComments] = useState([]);
	const classes = useStyles();
	let query = useQuery();
	
	const handleSidebarOpen = () => {
		setOpenSidebar(true);
	};
	const handleSidebarClose = () => {
		setOpenSidebar(false);
	};
	
	// NOTE: Load boards from DB, here
	const updatePost = post_id => {
		console.log('post_id:', post_id);
		fetch(`/get?postid=${post_id}`)
			.then(res => res.json())
			.then(
				(result) => {
					let post = result.post_information;
					let comments = result.comments_information;
					setPost(post);
					setComments(comments);
				},
				(error) => {
					console.log('[ERROR: CANT LOAD POSTS INTO BOAD]', error);
				}
			)
	};
	useEffect(() => {
		updatePost(query.get('id'));
	}, []);
	
	return (
		<div style = {{'height': '100%'}}>
			<Navbar
				title = "Post"
				onSidebarOpen = {handleSidebarOpen}
			/>
			<Sidebar
				onClose = {handleSidebarClose}
				open = {openSidebar}
				variant = {'temporary'}
			/>
			<div className = {classes.root}>
			<Post
				title = {post.title}
				content = {post.content}
				likes = {post.likes}
			/>
				<div className = {classes.comments}>
				{
					comments.slice(0, 20).map((comment, i) => 
						<Comment
							key = {i}
							title = {comment.title}
							content = {comment.content}
							likes = {comment.likes}
							author = {comment.author}
						/>
					)
				}
				</div>
			</div>
			<Fab href='/forum/create' className={classes.fab} color="primary" aria-label="add">
				<AddIcon/>
			</Fab>
		</div>
	);
};

export default PostPage;
