import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import { SidebarNav } from './components';

import {
	List
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		padding: theme.spacing(2)
	}
}));

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
      title: 'Modules',
      href: '/module',
      icon: <PeopleIcon />
    },
    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />
    }
  ];
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
					{pages.map(page => {
						<ListItem
							className = {classes.item}
							disableGutters
							key = {page.title}
						>
							<Button
				        activeClassName={classes.active}
				        className={classes.button}
				        component={CustomRouterLink}
				        to={page.href}
				      >
				        <div className={classes.icon}>{page.icon}</div>
				        {page.title}
				      </Button>
						</ListItem>
					})}
				</List>
			</div>
		</Drawer>
	);
}

Sidebar.propTypes = {
	className: PropTypes.string,
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func,
	variant: PropTypes.string.isRequired
};

export default Sidebar;
