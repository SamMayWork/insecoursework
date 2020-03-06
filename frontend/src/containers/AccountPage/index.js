/**
 * 
 * AccountPage
 * 
 * This page allows users to change privacy settings and delete their account
 */

import React, {useState} from 'react';
import {Card, Checkbox, CardActions, CardHeader, CardContent, Divider, Grid, Button, TextField} from '@material-ui/core';

import './accountPage.css';

const AccountDetails = props => {
  const {className, ...rest} = props;
  const {values, setValues} = useState({
    displayName: 'John Doe',
  });
  return (
    <div>
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

export function AccountPage() {
  return (
    <div className = "accountPage">
      <AccountDetails/>
    </div>
  );
}

export default AccountPage;