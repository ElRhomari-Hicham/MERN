import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditUser extends Component {
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
      news: 'false',
      email:'',
      photo:''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          gender: response.data.gender,
          dob: new Date(response.data.dob),
          news: response.data.news,
          email: response.data.email,
          photo: response.data.photo
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    });
  }

  onChangeDob(date) {
    this.setState({
      dob: date
    });
  }

  onChangeNews(e) {
    this.setState({
      news: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePhoto(e) {
    this.setState({
      photo: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
  
    const user = {
      username: this.state.username,
      gender: this.state.gender,
      dob: this.state.dob,
      news: this.state.news,
      email: this.state.email,
      photo: this.state.photo,
    };
  
    console.log(user);

    axios.post('http://localhost:5000/users/update/'+this.props.match.params.id, user)
      .then(res => console.log(res.data));
    
    window.location = '/';
  }

  render() {
    return (
      <div>
        <center>
          <h3>Edit User Log</h3>
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
            <label>Dob: </label>
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
            <input type="submit" value="Edit User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}