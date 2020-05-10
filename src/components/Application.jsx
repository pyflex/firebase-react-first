import React, { Component } from "react";
import { firestore } from "../firebase";

import Posts from "./Posts";
import { collectIdsAndDocs } from "./../utilities";

class Application extends Component {
  state = {
    posts: [],
  };

  unsubscribe = null;

  componentDidMount = async () => {
    const snapshot = await firestore.collection("posts").get();

    const posts = snapshot.docs.map(collectIdsAndDocs);

    this.setState({ posts });
  };

  handleCreate = async (post) => {
    // without subscribing:
    const { posts } = this.state;

    // returns a reference to document created
    const docRef = await firestore.collection("posts").add(post);

    // get single doc
    const doc = await docRef.get();
    console.log(doc);

    const newPost = collectIdsAndDocs(doc);

    this.setState({ posts: [newPost, ...posts] });
  };

  handleRemove = async (id) => {
    const allPosts = this.state.posts;
    const posts = allPosts.filter((post) => post.id !== id);
    await firestore.doc(`posts/${id}`).delete();
    this.setState({ posts });
  };

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts
          posts={posts}
          onCreate={this.handleCreate}
          onDelete={this.handleRemove}
        />
      </main>
    );
  }
}

export default Application;
