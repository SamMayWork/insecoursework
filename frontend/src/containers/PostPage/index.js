import React, {useState} from 'react';

import Navbar from '../../containers/Navbar';
import Sidebar from '../../components/Sidebar';

const PostPage = props => {
	const [openSidebar, setOpenSidebar] = useState(false);
	const handleSidebarOpen = () => {
		setOpenSidebar(true);
	};
	const handleSidebarClose = () => {
		setOpenSidebar(false);
	};
	return (
		<div style = {{'height': '100%'}}>
			<Navbar
				title = "Post Title Goes Here"
				onSidebarOpen = {handleSidebarOpen}
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
