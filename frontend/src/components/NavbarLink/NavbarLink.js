import React, {Component} from "react";

class NavbarLink extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.state);
    if (this.props.active) {
      return (
        <div className="navbar_link">
          <a href="#" className="navbar_link_anchor navbar_link_active" target="_blank">
            {this.props.children}
          </a>
          <div className="navbar_link_line"></div>
        </div>
      );   
    } else {
      return (
        <div className="navbar_link">
          <a href="#" className="navbar_link_anchor" target="_blank">
            {this.props.children}
          </a>
        </div>
      );
    }
  }
}

export default NavbarLink;