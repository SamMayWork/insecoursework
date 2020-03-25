import React, {useState} from 'react';
import {
} from '@material-ui/core';

import Navbar from '../../containers/Navbar';
import Sidebar from '../../components/Sidebar';

import PostSearch from '../../components/PostSearch';

const PostPage = props => {
	const [openSidebar, setOpenSidebar] = useState(false);
	const handleSidebarOpen = () => {
		setOpenSidebar(true);
	};
	const handleSidebarClose = () => {
		setOpenSidebar(false);
	};
	const boards = ['Board #1', 'Board #2'];
	return (
		<div style = {{'height': '100%'}}>
			<Navbar
				title = "Post Title Goes Here"
				onSidebarOpen = {handleSidebarOpen}
			/>
			<PostSearch
				title = {""}
				startDateTime = {new Date()}
				keywords = {[]}
				author = {""}
				boards = {boards}
			/>
			<Sidebar
				onClose = {handleSidebarClose}
				open = {openSidebar}
				variant = {'temporary'}
			/>
		</div>
	);
};

export default PostPage;
