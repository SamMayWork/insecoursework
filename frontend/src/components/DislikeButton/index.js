import React, {Component} from "react";
import dislikeImg from "../../images/dislike.svg";
import noDislikeImg from "../../images/nodislike.svg";

class DislikeButton extends Component {
  state = {
    dislike: false
  };
  constructor(props) {
    super(props);
    this.toggleDislike = this.toggleDislike.bind(this);
  }
  toggleDislike() {
    this.setState(state => ({
      dislike: !state.dislike
    }));
  }
  render() {
  	let imgSrc = noDislikeImg;
    if (this.state.dislike) {
    	imgSrc = dislikeImg;
   	};
    return (
      <div className="post_like" onClick={this.toggleDislike}>
        <img alt="dislike buton" className="post_like_image" src={imgSrc}/>
      </div>
    );
  }
}

export default DislikeButton;
