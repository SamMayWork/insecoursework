/**
 * 
 * AccountPage
 * 
 * This page allows users to change privacy settings and delete their account
 */

import React, {Component, useState} from 'react';
import {
  Checkbox,
  CardHeader,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

import BackBar from '../../components/BackBar';

import styled from 'styled-components';

import './accountPage.css';

/*
*
* General structure of Account Management page, contains functions for the set options given to the user
*
*/

/**
 * 
 * @param {Object} props Accepts an object containing the elements state
 *  
 */


 //Zone for the privacy handling and structure
const PrivacyZone = props => {
	const [realname, setRealname] = useState(false);
	const [displayName, setDisplayName] = useState('');
	const handleRealnameChange = e => {
		let realname = e.target.checked;
		setRealname(realname);
		if (realname) {
			setDisplayName(localStorage.getItem('real_name'));
		} else {
			setDisplayName(localStorage.getItem('email'));
		}
	}
  return (
    <div className="accountPageZone">
      <CardHeader
        title="Privacy"
      />
      <div>
        <List>
        	<ListItem>
        		<ListItemText>
        			{displayName}
        		</ListItemText>
        	</ListItem>
          <ListItem>
            <ListItemIcon>
              <Checkbox
              	checked={realname}
              	onChange={handleRealnameChange}
              />
            </ListItemIcon>
            <ListItemText
              primary="Real Name"
              secondary="Use your real name on your posts, if not will only use your UP number"
            />
          </ListItem>
        </List>
      </div>
    </div>
  );
};

//Zone for the notification handling and structure
const NotificationZone = props => {
  return (
    <div className="accountPageZone">
      <CardHeader
        title="Notifications"
      />
      <div>
        <List>
        	<ListItem justifyContent="center">
        		
        	</ListItem>
          <ListItem>
            <ListItemIcon>
              <Checkbox
								
              />
            </ListItemIcon>
            <ListItemText
              primary="Active"
              secondary="We will send notification emails to the listed address when someone responds to your post"
            />
          </ListItem>
        </List>
      </div>
    </div>
  )
}

//Styling of button
const StyledButton = styled(Button)`
  & {
    font-weight: 600;
  }
  &:hover {
    background: red;
    color: white;
  }
`;

//Delete your account Handling and Structure 
const DangerZone = props => {
  return (
    <div className="accountPageZone">
      <CardHeader
        title="Danger Zone"
      />
      <div className="accountPageDanger">
        <List>
          <ListItem>
            <ListItemText
              primary="Delete this account"
              secondary="Once you delete an account, there is no going back. Please be certain."
            />
            <DeleteDialog/>
          </ListItem>
        </List>
      </div>
    </div>
  );
};

// NOTE: NEED TO GET EMAIL ADDRESS
class DeleteDialog extends Component {
  state = {
    open: false,
    confirmButtonDisabled: true
  }
  setOpen(value) {
    this.setState({
      open: value
    })
  }
  setConfirmDisabled(value) {
    this.setState({
      confirmButtonDisabled: value
    })
  }
  handleClickOpen = () => {
    this.setOpen(true);
    this.setConfirmDisabled(true);
  }

  handleClose = () => {
    this.setOpen(false);
  }
  
  handleEmailChange = (e) => {
    this.setState({
      textFieldValue: e.target.value
    }, () => {
      console.log(this.state.textFieldValue);
      if (this.state.textFieldValue.trim() === "up904749@myport.ac.uk") {
        this.setConfirmDisabled(false);
      } else {
        this.setConfirmDisabled(true);
      }
    });
  }
  render() {
    return (
      <div>
        <StyledButton
          color="secondary"
          variant="outlined"
          onClick={this.handleClickOpen}
        >
          Delete Account
        </StyledButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>
            {"Delete account?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please type your email address to confirm.
            </DialogContentText>
            <FormControl fullWidth>
              <InputLabel shrink htmlFor="age-native-label-placeholder">
                Keep Info
              </InputLabel>
              <Select
                fullWidth
                inputProps={{
                  name: 'age',
                  id: 'age-native-label-placeholder',
                  defaultValue: 'Keep Info'
                }}
              >
                <MenuItem value="Keep Info">Keep Info</MenuItem>
                <MenuItem value="Delete Info">Delete Info</MenuItem>
              </Select>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                type="email"
                label="Email Address"
                onChange={this.handleEmailChange}
                fullWidth
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button disabled={this.state.confirmButtonDisabled} onClick={this.handleClose} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
};

export function AccountPage() {
  return (
    <div className = "accountPage">
    	<BackBar
    		title = "Account"
    	/>
      <NotificationZone/>
      <PrivacyZone/>
      <DangerZone/>
    </div>
  );
}

export default AccountPage;
