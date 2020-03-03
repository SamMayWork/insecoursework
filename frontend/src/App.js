import React, {Component} from 'react';
import './App.css';
import Post from "./components/Post";
import Posts from "./components/Posts";
import Navbar from "./components/Navbar";
import NavbarLink from "./components/NavbarLink";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }
  }
  render() {
    const {error, isLoaded, posts } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      console.log(posts);
      return (
        <div className = "App">
          <Navbar>
            <NavbarLink active>Newest</NavbarLink>
            <NavbarLink>Featured</NavbarLink>
            <NavbarLink>Frequent</NavbarLink>
            <NavbarLink>Recent</NavbarLink>
          </Navbar>
          <Posts>
            {posts.map((post, i) => (
              <Post
                key = {i}
                title = {post.title}
                author = {post.author}
                replies = {post.replies}
                date = {post.date}
              />
            ))}
          </Posts>
        </div>
      );
    }
  }
  componentDidMount() {
    fetch("https://www.reddit.com/r/popular.json")
      .then(res => res.json())
      .then(
        (result) => {
          let posts = [];
          result.data.children.forEach((post) => {
            let postData = post.data;
            let postObj = {
              title: postData.title,
              author: postData.author,
              replies: postData.num_comments,
              date: postData.created * 1000
            };
            posts.push(postObj);
          })
          this.setState({
            isLoaded: true,
            posts: posts
          });
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
}

export default App;