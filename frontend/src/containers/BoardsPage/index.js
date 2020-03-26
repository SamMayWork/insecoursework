import React, {useState, useEffect} from 'react';
import {makeStyles, useTheme} from '@material-ui/styles';
import Navbar from '../Navbar';
import Sidebar from '../../components/Sidebar';

import Board from '../../components/Board';
import PostSearch from '../../components/PostSearch';

import {
	List
} from '@material-ui/core';

const BoardsPage = props => {
	const [openSidebar, setOpenSidebar] = useState(false);
	const [boards, setBoards] = useState([]);
	
	// NOTE: Load boards from DB, here
	const updateBoards = boards => {
		 fetch("/get?all=1")
      .then(res => res.json())
      .then(
        (result) => {
        	let boards = result;
          setBoards(boards);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
        	/*
          this.setState({
            isLoaded: true,
            error
          });
          */
        }
      )
	}
	
	const handleSidebarOpen = () => {
		setOpenSidebar(true);
	};
	const handleSidebarClose = () => {
		setOpenSidebar(false);
	};
	useEffect(() => {updateBoards(boards)}, []);
	return (
		<div>
			<Navbar
				title = "Boards"
				onSidebarOpen = {handleSidebarOpen}
			/>
			<Sidebar
				onClose = {handleSidebarClose}
				open = {openSidebar}
				variant = {'temporary'}
			/>
			<div>
				{boards.slice(0, 20).map((board, i) => (
					<Board
						key = {i}
						href = {`/board?id=${board.board_id}`}
						title = {board.board_module}
						year = {board.board_year}
						views = {(i+1) * 10}
					/>
				))}
			</div>
		</div>
	);
};

export default BoardsPage;
