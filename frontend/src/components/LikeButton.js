import React, {Component} from "react";
import likeImg from "./like.svg";
import noLikeImg from "./nolike.svg";

class LikeButton extends Component {
  state = {
    like: false
  };
  constructor(props) {
    super(props);
    this.toggleLike = this.toggleLike.bind(this);
  }
  toggleLike() {
    this.setState(state => ({
      like: !state.like
    }));
  }
  render() {
    if (this.state.like) {
      return (
        <div className="post_like" onClick={this.toggleLike}>
          <img className="post_like_image" src={likeImg}/>
        </div>
      );
    } else {
      return (
        <div className="post_like" onClick={this.toggleLike}>
          <img className="post_nolike_image" src={noLikeImg}/>
        </div>
      );
    }
  }
}

export default LikeButton;