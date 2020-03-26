/**
 * 
 * Dashboard
 * 
 * First screen user's see after logging in, provides them useful info at a glance
 */

import React, {Component, useState} from 'react';
import List from '../../components/List';
import DataCard from '../../components/DataCard';

import Navbar from '../../containers/Navbar';
import Sidebar from '../../components/Sidebar';

import Weather from 'simple-react-weather'
import links from "./data.js";
import './dashboard.css';

import { TwitterTimelineEmbed } from 'react-twitter-embed';

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      openSidebar: false,
    }
  }
  render() {
    const {error, isLoaded, comments } = this.state;
    const divStyle = {
      color: 'black'
    };
    const handleSidebarOpen = () => {
			this.setState({
				openSidebar: true
			})
		};
		const handleSidebarClose = () => {
			this.setState({
				openSidebar: false
			})
		};
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      console.log(comments);
      return (
        <div>
        <Navbar
					title = "Dashboard"
					onSidebarOpen = {handleSidebarOpen}
				/>
        <div className = "dashboardPage">
					<Sidebar
						onClose = {handleSidebarClose}
						open = {this.state.openSidebar}
						variant = {'temporary'}
					/>
          <TwitterTimelineEmbed
          	sourceType = "profile"
          	screenName = "portsmouthuni"
          	options = {{height: 300}}
          />
          <Weather style={divStyle} unit="C" city="Portsmouth" appid="45a03a49afb30df0fdfba49509ef8c1a" />
          <DataCard
            links = {links}
          /> 
        </div>
        </div>
      );
    }
  }
  componentDidMount() {
  	this.setState({
      isLoaded: true
      // comments: comments
    });
	}
}
