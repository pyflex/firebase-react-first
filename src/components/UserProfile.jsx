import React, { Component } from "react";

import { auth, firestore } from "../firebase";

class UserProfile extends Component {
  state = { displayName: "" };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  get uid() {
    return auth.currentUser.uid;
  }

  get userRef() {
    return firestore.doc(`users/${this.uid}`);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { displayName } = this.state;

    if (displayName) {
      this.userRef.update({ displayName });
    }
  };

  render() {
    const { displayName } = this.state;
    return (
      <section className="userProfile">
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Display Name"
          />
          <input type="file" ref={(ref) => (this.imageInput = ref)} />
          <input className="update" type="submit" />
        </form>
      </section>
    );
  }
}

export default UserProfile;
