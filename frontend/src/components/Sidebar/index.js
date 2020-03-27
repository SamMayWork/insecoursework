import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {
	Drawer,
	Button,
	ListItem
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';

import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ModuleIcon from '@material-ui/icons/ViewModule';

import {NavLink as RouterLink} from 'react-router-dom';

import {
	List
} from '@material-ui/core';

/*
*
* Styles for the SideBar Component (The sidebar is available on any page that has a navbar)
*
*/

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		// padding: theme.spacing(2)
	}
}));

const CustomRouterLink = forwardRef((props, ref) => (
	<div
		ref={ref}
		style = {{flexGrow: 1}}
	>
		<RouterLink {...props} />
	</div>
));

/**
 * 
 * @param {Object} props Accepts an object containing the elements state
 *  
 */


const Sidebar = props => {
	const { open, variant, onClose, className, ...rest } = props;
	const classes = useStyles();
	const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Boards',
      href: '/boards',
      icon: <ModuleIcon />
    },
    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />
    }
  ];
  //Sidebar structure
	return (
		<Drawer
			anchor="left"
			classes = {{ paper: classes.drawer}}
			onClose = {onClose}
			open = {open}
			variant = {variant}
		>
			<div
				{...rest}
			>
				<List>
					{pages.map(page => (
						<ListItem
							className = {classes.item}
							disableGutters
							key = {page.title}
						>
							<Button
				        activeClassName={classes.active}
				        className={classes.button}
				        to={page.href}
				        component={CustomRouterLink}
				      >
				        <div className={classes.icon}>{page.icon}</div>
				        {page.title}
				      </Button>
						</ListItem>
					))}
				</List>
			</div>
		</Drawer>
	);
}

// {/*component={CustomRouterLink}*/}

Sidebar.propTypes = {
	className: PropTypes.string,
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func,
	variant: PropTypes.string.isRequired
};

export default Sidebar;
