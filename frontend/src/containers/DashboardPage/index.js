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
						title = "Modules"
						onSidebarOpen = {handleSidebarOpen}
					/>
        <div className = "dashboardPage">
					<Sidebar
						onClose = {handleSidebarClose}
						open = {this.state.openSidebar}
						variant = {'temporary'}
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
    fetch("https://www.reddit.com/r/popular.json")
      .then(res => res.json())
      .then(
        (result) => {
          let comments = [];
          result.data.children.forEach((comment) => {
            let commentData = comment.data;
            let commentObj = {
              title: commentData.title,
              author: commentData.author,
              replies: commentData.num_comments,
              date: commentData.created * 1000
            };
            comments.push(commentObj);
          })
          this.setState({
            isLoaded: true,
            comments: comments
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
