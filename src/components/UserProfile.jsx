import React, { Component } from "react";

import { auth, firestore, storage } from "../firebase";

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

  get file() {
    return this.imageInput && this.imageInput.files[0];
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { displayName } = this.state;

    if (displayName) {
      this.userRef.update({ displayName });
    }

    if (this.file) {
      // could also have dont the normal .doc(`something/${id}`)
      storage
        .ref()
        .child("user-profiles")
        .child(this.uid)
        .child(this.file.name)
        .put(this.file)
        .then((response) => response.ref.getDownloadURL())
        .then((photoURL) => this.userRef.update({ photoURL }));
    }

    this.setState({ displayName: "" });
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
