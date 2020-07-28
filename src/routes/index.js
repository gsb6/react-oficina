import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UserList from '../pages/UserList';
import UserDetails from '../pages/UserDetails';

function Routes() {
  return(
    <Switch>
      <Route path="/" exact component={UserList}/>
      <Route path="/user/:id" component={UserDetails}/>
    </Switch> 
  )
}

export default Routes;