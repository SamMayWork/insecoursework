/**
 * 
 * AccountPage
 * 
 * This page allows users to change privacy settings and delete their account
 */

import React, {useState} from 'react';
import {Card, CardHeader, CardContent, Divider, Grid, Button, TextField} from '@material-ui/core';

import './accountPage.css';

const AccountDetails = props => {
  const {className, ...rest} = props;
  const {values, setValues} = useState({
    displayName: 'John Doe',
  });
  return (
    <Card>
      <CardHeader
        title="Account Page"
      />
      <Divider/>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Display name"
              values={values.firstName}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
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