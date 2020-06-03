import React, { Component } from "react";
import ContactItem from "../ContactItem/ContactItem";
import "./Contacts.css";
import ContactDetail from "../ContactDetail/ContactDetail";
import NewContact from "../NewContact/NewContact";

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

  deleteContact = (contactId) => {
    try {
      fetch(`https://jsonplaceholder.typicode.com/users/${contactId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
    this.getContacts();
    this.setState({
      selectedContact: {
        id: "",
        name: "",
        username: "",
      },
    });

    //this.setState({
    //  contacts: this.state.contacts.filter(({ id }) => id !== contactId),
    //  selectedContact: {
    //    id: "",
    //    name: "",
    //    username: "",
    //  },
    //});
  };

  newContact = () => {
    this.setState({
      selectedContact: {
        id: "",
        name: "",
        username: "",
      },
    });
  };

  addContact = (newContact) => {
    newContact.id = Date.now();
    try {
      fetch("https://jsonplaceholder.typicode.com/users", {
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

    //this.setState({
    //  contacts: [...this.state.contacts, newContact],
    //});
  };

  updateContact = (updatedContact) => {
    try {
      fetch(`https://jsonplaceholder.typicode.com/users/${updatedContact.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(updatedContact),
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    } catch (error) {
      console.log(error);
    }

    this.setState({
      selectedContact: {
        id: "",
        name: "",
        username: "",
      },
    });

    this.getContacts();

    //const arr = [
    //  ...this.state.contacts.filter(
    //    (contact) => contact.id !== updatedContact.id
    //  ),
    //  updatedContact,
    //].sort((a, b) => a.id - b.id);
    //
    //this.setState({
    //  contacts: arr,
    //  selectedContact: {
    //    id: "",
    //    name: "",
    //    username: "",
    //  },
    //});
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
            {this.state.selectedContact.id ? (
              <ContactDetail
                selectedContact={this.state.selectedContact}
                updateContact={this.updateContact}
                deleteContact={this.deleteContact}
              />
            ) : (
              <NewContact addContact={this.addContact} />
            )}
          </main>
        </div>
      </div>
    );
  }
}
