import React, { Component } from "react";
import "./ContactItem.css";

export default class ContactItem extends Component {
  render() {
    const { name, username, id } = this.props.contact;
    return (
      <li>
        <a href="#" onClick={() => this.props.selectContact(id)}>
          <span>{name}</span>
          <span>{username}</span>
        </a>
      </li>
    );
  }
}
