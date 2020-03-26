import React, {useState, useEffect} from 'react';

import Navbar from '../../containers/Navbar';
import Sidebar from '../../components/Sidebar';
import Post from '../../components/Post';
import Comment from '../../components/Comment';

const PostPage = props => {
	const [openSidebar, setOpenSidebar] = useState(false);
	const [post, setPost] = useState("");
	const [comments, setComments] = useState([]);
	const handleSidebarOpen = () => {
		setOpenSidebar(true);
	};
	const handleSidebarClose = () => {
		setOpenSidebar(false);
	};
	
	// NOTE: Load boards from DB, here
	const updatePost = post => {
		 fetch(`/get?postid=ad7e89d1`)
      .then(res => res.json())
      .then(
        (result) => {
          setPost(result.post_information);
          setComments(result.comments_information);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
        	/*
          this.setState({
            isLoaded: true,
            error
          });
          */
        }
      )
	}
	useEffect(() => {updatePost(post)}, []);
	
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
