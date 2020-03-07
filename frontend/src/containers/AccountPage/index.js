/**
 * 
 * AccountPage
 * 
 * This page allows users to change privacy settings and delete their account
 */

import React, {useState} from 'react';
import {
  Card,
  Checkbox,
  CardActions,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import styled from 'styled-components';

import './accountPage.css';

/*
const AccountDetails = props => {
  const {className, ...rest} = props;
  const {values, setValues} = useState({
    displayName: 'John Doe',
  });
  return (
    <div style={styling}>
      <Card>
        <CardHeader
          title="Account Page"
        />
      </Card>
      <Divider/>
      <Card>
      <CardHeader
          subheader="Privacy"
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              Display Real Name <Checkbox/>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Divider/>
      <Card>
        <CardHeader
          subheader="Notifications"
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              Receive Notifications <Checkbox/>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Divider/>
      <Card>
        <CardHeader
          subheader="Danger Zone"
        />
        <CardActions>
          <Button
            color="red"
            variant="contained"
          >
            Delete account
          </Button>
        </CardActions>
      </Card>
    </div>
  )
};
*/

const NotificationZone = props => {
  return (
    <div className="accountPageZone">
      <CardHeader
        title="Notifications"
      />
      <div>
        <List>
          <ListItem>
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
            <StyledButton
              color="secondary"
              variant="outlined"
            >
              Delete account
            </StyledButton>
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export function AccountPage() {
  return (
    <div className = "accountPage">
      <NotificationZone/>
      <DangerZone/>
    </div>
  );
}

export default AccountPage;