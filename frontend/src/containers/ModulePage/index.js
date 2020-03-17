import React, {useState} from 'react';

import Navbar from '../Navbar';
import Sidebar from '../../components/Sidebar';

const ModulePage = props => {
	const [openSidebar, setOpenSidebar] = useState(false);
	
	const handleSidebarOpen = () => {
		setOpenSidebar(true);
	};

	const handleSidebarClose = () => {
		setOpenSidebar(false);
	};
	return (
		<div>
			<Navbar
				title = "Modules"
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

export default ModulePage;
