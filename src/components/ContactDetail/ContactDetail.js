import React, { Component } from "react";
import "./ContactDetail.css";

export default class ContactDetail extends Component {
  constructor(props) {
    super(props);
    this.state = props.selectedContact;
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedContact.id !== prevProps.selectedContact.id) {
      this.setState({
        ...this.props.selectedContact,
      });
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  updateContact = () => {
    this.props.updateContact(this.state);
  };

  render() {
    console.log(this.state);

    const { name, username, id } = this.state;
    return (
      <div className="detail">
        <div className="header">
          <div className="body">Contact Details</div>
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
            <button className="btn btn-update" onClick={this.updateContact}>
              Update
            </button>
            <button
              className="btn btn-delete"
              onClick={this.props.deleteContact.bind(null, id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}
