import React, {useState, useEffect} from 'react';
import {makeStyles, useTheme} from '@material-ui/styles';
import Navbar from '../Navbar';
import Sidebar from '../../components/Sidebar';

import TestModules from './data.js';

import Module from '../../components/Module';

const ModulesPage = props => {
	const [openSidebar, setOpenSidebar] = useState(false);
	const [modules, setModules] = useState([]);
	const updateModules = modules => {
		setModules(modules);
	}
	const handleSidebarOpen = () => {
		setOpenSidebar(true);
	};
	const handleSidebarClose = () => {
		setOpenSidebar(false);
	};
	useEffect(() => {updateModules(TestModules)}, [modules]);
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
			{modules.map((module, i) => (
				<Module
					title = {module}
					views = {(i+1) * 10}
				/>
			))}
		</div>
	);
};

export default ModulesPage;
