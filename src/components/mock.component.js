import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const User = props => (
    <tr>
      <td>{props.user.name.first} {props.user.name.last}</td>
      <td>{props.user.gender}</td>
      <td>{props.user.dob.date}</td>
      <td>{props.user.location.city}</td>
      <td>{props.user.email}</td>
      <td>
          <img src={props.user.picture.large} width="70px" height="70px"></img>
      </td>
    </tr>
  )

export default class FetchUsers extends Component {

  constructor(props) {
    super(props);  
    this.onADD = this.onADD.bind(this);
    this.state = {users: [],count:0};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/size')
    .then(response => {this.setState({ count: response.data });
      console.log("counted :"+response.data);
    })
    .catch((error) => {
       console.log(error);
    })

    fetch(`https://randomuser.me/api/?results=100`)
    .then(results => { return results.json()})
    .then(data => { 
        this.setState({ users: data.results});
    })
    .catch(function (error) {
        console.log(error);
      })
  }
  userList() {
      return this.state.users.map(currentuser => {
        return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
      })
  }
  onADD(e) {
    e.preventDefault();
    for(let i=0; i<(100-this.state.count); i++){
      const user = {
        username: this.state.users[i].name.first +' '+this.state.users[i].name.last,
        gender: this.state.users[i].gender,
        dob: new Date(this.state.users[i].dob.date),
        news: 'false',
        email: this.state.users[i].email,
        photo: this.state.users[i].picture.large,
      };console.log(user);
        axios.post('http://localhost:5000/users/add', user)
        .then(res => console.log(res.data))
        .catch(function (error) {
          console.log(error);
        });
      }
      window.location = '/';
  }

  render() {
    return (
        <div>
          <center>
            <h3>Vous trouvez içi 100 aléatoires utilisateurs</h3><br></br>
          </center>
          
          <h4>Counted users : {this.state.count} You need to insert : {100-this.state.count}</h4><br></br>
          <form onSubmit={this.onADD}>
            <input type="submit" value="ADD Users" className="btn btn-primary" /><br></br>
          </form>
          <br></br>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Username</th>
                <th>Gender</th>
                <th>Dob</th>
                <th>Location</th>
                <th>Email</th>
                <th>Photo</th>
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