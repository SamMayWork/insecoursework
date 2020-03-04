import React, {Component} from "react";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        {this.props.children}
      </div>
    );
  }
}

export default Navbar;