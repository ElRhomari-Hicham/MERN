import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateUser extends Component {

  constructor(props) {
    super(props);  
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this);
    this.onChangeNews = this.onChangeNews.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhoto = this.onChangePhoto.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      gender: '',
      dob: new Date(),
      news: '',
      email:'',
      photo:'https://previews.123rf.com/images/tuktukdesign/tuktukdesign1606/tuktukdesign160600105/59070189-user-icon-man-profile-businessman-avatar-person-icon-in-vector-illustration.jpg'
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeGender(e) {
    this.setState({gender: e.target.value});
  }
  onChangeDob(date) {
    this.setState({dob: date});
  }
  onChangeNews(e) {
    this.setState({news: e.target.value});
  }
  onChangeEmail(e) {
    this.setState({email: e.target.value});
  }
  onChangePhoto(e) {
    this.setState({photo: e.target.value});
  }
  onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
      gender: this.state.gender,
      dob: new Date(this.state.dob),
      news: this.state.news,
      email: this.state.email,
      photo: this.state.photo,
    };
    console.log(user);
    axios.post('http://localhost:5000/users/add', user)
    .then(res => console.log(res.data))
    .catch(function (error) {
      console.log(error);
    });window.location = '/';
  }

  render() {
    return (
      <div>
        <center>
          <h3>Create New User</h3>
        </center>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group"> 
            <label>Gender: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.gender}
                onChange={this.onChangeGender}
                />
          </div>
          <div className="form-group"> 
            <label>Dob: </label><br></br>
              <DatePicker
                selected={this.state.dob}
                onChange={this.onChangeDob}
              />
          </div>
          <div className="form-group"> 
            <label>News: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.news}
                onChange={this.onChangeNews}
                />
          </div>

          <div className="form-group"> 
            <label>Email: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
          </div>

          <div className="form-group"> 
            <label>Photo: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.photo}
                onChange={this.onChangePhoto}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}