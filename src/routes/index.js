import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import UserList from '../pages/UserList';
import UserEdit from '../pages/UserEdit'; 
// import Layout from '../components/Header';

function Routes() {
  return(
    <Router>
      {/* <Layout> */}
        <Switch>
          <Route path="/" exact component={UserList}/>
          <Route path="/user/:id" component={UserEdit}/>
        </Switch>
      {/* </Layout>  */}
    </Router>
  );
}

export default Routes;