import React, { Component } from "react";
import ContactItem from "../ContactItem/ContactItem";
import "./Contacts.css";
import ContactDetail from "../ContactDetail/ContactDetail";

export default class Contacts extends Component {
  state = {
    contacts: [],
    selectedContact: {
      id: "",
      name: "",
      username: "",
    },
  };

  componentDidMount() {
    this.getContacts();
  }

  resetSelectedContact = () => {
    this.setState({
      selectedContact: {
        id: "",
        name: "",
        username: "",
      },
    });
  };

  getContacts = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => this.setState({ contacts: data }));
  };

  selectContact = (id) => {
    this.setState({
      selectedContact: this.state.contacts.find((contact) => contact.id === id),
    });
  };

  deleteContact = async (contactId) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${contactId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
    this.getContacts();
    this.resetSelectedContact();
  };

  newContact = () => {
    this.resetSelectedContact();
  };

  addContact = async (newContact) => {
    newContact.id = Date.now();
    try {
      await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(newContact),
      });
    } catch (error) {
      console.log(error);
    }
    this.getContacts();
    this.resetSelectedContact();
  };

  updateContact = async (updatedContact) => {
    try {
      await fetch(
        `https://jsonplaceholder.typicode.com/users/${updatedContact.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(updatedContact),
        }
      );
    } catch (error) {
      console.log(error);
    }
    this.resetSelectedContact();
    this.getContacts();
  };

  render() {
    return (
      <div>
        <header>
          <div className="body">Contacts</div>
        </header>
        <div className="container">
          <main>
            <div className="list">
              <ul>
                {this.state.contacts.map((contact) => (
                  <ContactItem
                    key={contact.id}
                    contact={contact}
                    selectContact={this.selectContact}
                  />
                ))}
              </ul>
              <button className="btn btn-new" onClick={this.newContact}>
                New Contact
              </button>
            </div>
            <ContactDetail
              selectedContact={this.state.selectedContact}
              updateContact={this.updateContact}
              deleteContact={this.deleteContact}
              addContact={this.addContact}
            />
          </main>
        </div>
      </div>
    );
  }
}
