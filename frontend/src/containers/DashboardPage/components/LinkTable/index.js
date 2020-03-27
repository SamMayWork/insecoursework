import React, { useState } from 'react';

import {
	Card,
	CardHeader,
	CardContent,
	Divider,
	Button,
	Table,
	TableBody,
	TableRow,
	TableCell,
	IconButton,
	Link,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField
} from '@material-ui/core';
import {
	Edit as EditIcon,
	Delete as DeleteIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles(theme => ({
	tight: {
		padding: 0
	},
	align: {
		display: 'flex',
		alignItems: 'center'
	}
}));

const LinkDialog = props => {
	const [open, setOpen] = useState(false);
	const [label, setLabel] = useState('');
	const [link, setLink] = useState('');
	const handleClickOpen = () => {
		setOpen(true);
	}
	const handleClose = () => {
		setOpen(false);
	}
	const handleAdd = () => {
		props.addLink(label, link);
		setOpen(false);
	}
	const handleLabelChange = e => {
		console.log(e.target.value);
		setLabel(e.target.value);
	}
	const handleLinkChange = e => {
		console.log(e.target.value);
		setLink(e.target.value);
	}
	return (
		<div>
			<Button
				color = "primary"
				size = "small"
				variant = "outlined"
				onClick = {handleClickOpen}
			>
				Add Link
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle id='form-dialog-title'>Add New Link</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="label"
						type="text"
						label="Label"
						fullWidth
						onChange = {handleLabelChange}
					/>
					<TextField
						margin="dense"
						id="link"
						type="text"
						label="Link"
						fullWidth
						onChange = {handleLinkChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleAdd} color="primary">
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

const LinkTable = props => {
	const [links, setLinks] = useState([
		{
			label: 'Boards',
			link: '/boards'
		}
	]);
	const classes = useStyles();
	const handleAddLink = (label, link) => {
		let linksCopy = [...links];
		linksCopy.push({
			label: label,
			link: link
		});
		setLinks(linksCopy);
	}
	const handleDeleteLink = (label) => {
		let linksCopy = [...links];
		linksCopy.forEach((link, i) => {
			if (link.label === label) {
				linksCopy.splice(i);
			}
		});
		setLinks(linksCopy);
	}
	return (
		<Card>
			<CardHeader
				titleTypographyProps = {{ variant: 'h7' }}
				action = {
					<LinkDialog addLink={handleAddLink}/>
				}
				title="Links"/>
			<Divider/>
			<CardContent
				className = {classes.tight}
			>
				<Table>
					<TableBody>
						{links.map((link, i) => (
							<TableRow key={i}>
								<TableCell>
									<Link href={link.link}>
										{link.label}
									</Link>
								</TableCell>
								<TableCell style={{width: '16px'}}>
									<IconButton aria-label="delete a link" color="secondary"
										onClick = {() => handleDeleteLink(link.label)}
									>
										<DeleteIcon/>
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}

export default LinkTable;
