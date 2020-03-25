import React, {useState} from 'react';
import {
} from '@material-ui/core';

import Navbar from '../../containers/Navbar';
import Sidebar from '../../components/Sidebar';

import PostSearch from '../../components/PostSearch';

import testData from '../../components/PostSearch/tests/testData.js';

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
				title = {testData.title}
				startDate = {testData.startData}
				startTime = {testData.startTime}
				keywords = {testData.keywords}
				author = {testData.author}
				boards = {testData.boards}
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
