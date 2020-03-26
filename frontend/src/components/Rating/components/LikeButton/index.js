import React, {Component} from "react";
import likeImg from "../../../../images/like.svg";
import noLikeImg from "../../../../images/nolike.svg";

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
  	let imgSrc = noLikeImg;
    if (this.state.like) {
    	imgSrc = likeImg;
   	};
    return (
      <div className="post_like" onClick={this.toggleLike}>
        <img alt="like button" className="post_like_image" src={imgSrc}/>
      </div>
    );
  }
}

export default LikeButton;
