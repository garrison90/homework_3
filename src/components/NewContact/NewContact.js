import React, { Component } from "react";
import "./NewContact.css";

export default class NewContact extends Component {
  state = {
    contact: {
      name: "",
      username: "",
    },
  };

  cancelClick = () => {
    this.setState({
      contact: {
        name: "",
        username: "",
      },
    });
  };

  addContact = () => {
    this.props.addContact({ ...this.state.contact });

    this.setState({
      contact: {
        name: "",
        username: "",
      },
    });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      contact: {
        ...this.state.contact,
        [name]: value,
      },
    });
  };

  render() {
    const { name, username } = this.state.contact;
    return (
      <div className="detail">
        <div className="header">
          <div className="body">New Contact</div>
        </div>
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="btn-block">
            <button className="btn btn-add" onClick={this.addContact}>
              Add
            </button>
            <button className="btn btn-cancel" onClick={this.cancelClick}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}
