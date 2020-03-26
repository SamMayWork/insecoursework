import React, {useState, useEffect} from 'react';

import Navbar from '../../containers/Navbar';
import Sidebar from '../../components/Sidebar';
import Post from '../../components/Post';
import Comment from '../../components/Comment';
import {
	useLocation
} from 'react-router-dom';

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const PostPage = props => {
	const [openSidebar, setOpenSidebar] = useState(false);
	const [post, setPost] = useState("");
	const [comments, setComments] = useState([]);
	let query = useQuery();
	
	const handleSidebarOpen = () => {
		setOpenSidebar(true);
	};
	const handleSidebarClose = () => {
		setOpenSidebar(false);
	};
	
	// NOTE: Load boards from DB, here
	const updatePost = post_id => {
		fetch(`/get?postid=${post_id}`)
			.then(res => res.json())
			.then(
				(result) => {
					let posts = result;
					console.log(posts);
					setPost(posts);
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
			<Post
				title = {post.title}
				content = {post.content}
				likes = {post.likes}
			/>
			{
				comments.map((comment, i) => 
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
	);
};

export default PostPage;
