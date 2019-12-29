import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/navbar.component';
import UsersList from './components/users-list.component';
import EditUser from './components/edit-user.component';
import CreateUser from './components/create-user.component';
import FetchUsers from './components/mock.component';


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={UsersList} />
        <Route path="/edit/:id" component={EditUser} />
        {/* <Route path="/create" component={CreateExercise} /> */}
        <Route path="/user" component={CreateUser} />
        <Route path="/listUsers" component={FetchUsers} />
      </div>
    </Router>
    
  );
}

export default App;
