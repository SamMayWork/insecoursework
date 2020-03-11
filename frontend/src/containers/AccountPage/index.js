/**
 * 
 * AccountPage
 * 
 * This page allows users to change privacy settings and delete their account
 */

import React, {Component} from 'react';
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
import styled from 'styled-components';

import './accountPage.css';

const PrivacyZone = props => {
  return (
    <div className="accountPageZone">
      <CardHeader
        title="Privacy"
      />
      <div>
        <List>
          <ListItem>
            <ListItemIcon>
              <Checkbox/>
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

const NotificationZone = props => {
  return (
    <div className="accountPageZone">
      <CardHeader
        title="Notifications"
      />
      <div>
        <List>
          <ListItem>
            <ListItemIcon>
              <Checkbox/>
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

const StyledButton = styled(Button)`
  & {
    font-weight: 600;
  }
  &:hover {
    background: red;
    color: white;
  }
`;

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
      <NotificationZone/>
      <PrivacyZone/>
      <DangerZone/>
    </div>
  );
}

export default AccountPage;