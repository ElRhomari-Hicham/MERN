import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

const User = props => (
  <tr>
    <td>{props.user.username}</td>
    <td>{props.user.gender}</td>
    <td>{props.user.dob.substring(0,10)}</td>
    <td>{props.user.news}</td>
    <td>{props.user.email}</td>
    <td>
      <img src={props.user.photo} width="70px" height="70px"></img>
    </td>
    <td>
       <Link to={"/edit/"+props.user._id}>Edit</Link> | <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>Delete</a> 
    </td>
  </tr>
)

export default class UsersList extends Component {

  constructor(props) {
    super(props);  
    this.deleteUser = this.deleteUser.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);  
    this.state = {users: [],activePage:1};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/'+1)
     .then(response => {
       this.setState({ users: response.data });
       console.log(response.data);
     })
     .catch((error) => {
        console.log(error);
     })
  }

  deleteUser(id) {
    axios.delete('http://localhost:5000/users/'+id)
      .then(res => console.log(res.data));  
      this.setState({
      users: this.state.users.filter(el => el._id !== id)
    })
  }

  userList() {
    return this.state.users.map(currentuser => {
      return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
    })
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
    axios.get('http://localhost:5000/users/'+pageNumber)
     .then(response => {
       this.setState({ users: response.data });
       console.log(response.data);
       this.userList();
     })
     .catch((error) => {
        console.log(error);
     })
  }

  render() {
    return (
      <div>
        <h3>Logged Users</h3>
        <div class="pagination justify-content-center">
            <Pagination 
              prevPageText='prev'
              nextPageText='next'
              firstPageText='first'
              lastPageText='last'
              activePage={this.state.activePage}
              itemsCountPerPage={10}
              totalItemsCount={100}
              onChange={this.handlePageChange}
            />
        </div>
        
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Gender</th>
              <th>Dob</th>
              <th>News</th>
              <th>Email</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.userList() }
          </tbody>
        </table>
      </div>
    )
  }
}