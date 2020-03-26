import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';

import moment from 'moment';

import {
	TextField,
	Chip,
	FormControl,
	Card,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Grid
} from '@material-ui/core';

import {
	KeyboardDatePicker,
	KeyboardTimePicker,
	MuiPickersUtilsProvider
} from '@material-ui/pickers';

import MomentUtils from '@date-io/moment';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(2),
		height: '100%',
	},
	title: {
		width: '100%'
	},
	formControl: {
		marginBottom: theme.spacing(2)
	}
}));

const PostSearch = props => {
	const classes = useStyles();
	const [title, setTitle] = useState("");
	const [keywords, setKeywords] = useState([]);
	const [board, setBoard] = useState(props.board);
	const [author, setAuthor] = useState("");
	const [startDate, setStartDate] = useState(props.startDate);
	const [startTime, setStartTime] = useState(props.startTime);
	const handleKeyWordChange = (e) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      let val = e.target.value.trim();

      if((!keywords.includes(val)) && (val.length > 0 && val.length <= 30) && keywords.length < 5) {
        let joined = keywords.concat(val);
        setKeywords(joined);
      }
      e.target.value = ''; 
    }
  };
  const performSearch = () => {
  	// 1. Gather non-null fields
  	// 2. Convert to HTTP GET request and query-rise fields
  	// 3. Re-direct
  	console.log(title, keywords, author, startDate, startTime, board);
  }
  const handleDeleteKeyword = keyword => {
    setKeywords(keywords.filter((chip) => chip !== keyword));
  }
  const handleChangeBoard = e => {
  	let board = e.target.value;
  	setBoard(board);
  }
  const handleDateChange = date => {
  	setStartDate(date);
  }
  const handleTimeChange = time => {
  	setStartTime(time);
  }
  const handleTitleChange = e => {
  	let title = e.target.value;
  	setTitle(title);
	}
	const handleAuthorChange = e => {
		let author = e.target.value;
  	setAuthor(author);
	}
	return (
		<Card className = {classes.root}>
			<FormControl className = {classes.formControl}>
				<TextField
					maxLength = {50}
					value = {title}
		      placeholder="Title..."
		      classes={{
		        root: classes.title
		      }}
		      onChange = {handleTitleChange}
		      inputProps={{ 'aria-label': 'title' }}
		    />
      </FormControl>
      <FormControl className = {classes.formControl}>
      	<MuiPickersUtilsProvider utils={MomentUtils}>
      		<Grid 
      			container
      			direction="row"	
      		>
      			<Grid container item xs={6}>
							<KeyboardDatePicker
								fullWidth
							  format="DD/MM/YYYY"
							  margin="none"
							  value={startDate}
							  onChange={handleDateChange}
							  id="start-date"
							  maxDate = {moment(new Date())}
							  label="Start Date"
							  KeyboardButtonProps={{
							    'aria-label': 'change date'
							  }}
							/>
					  </Grid>
					  <Grid container item xs={6}>
							<KeyboardTimePicker
								fullWidth
							  margin="none"
							  id="time-picker"
							  label="Start Time"
							  value={startTime}
							  onChange={handleTimeChange}
							  KeyboardButtonProps={{
							    'aria-label': 'change time',
							  }}
							 />
			      </Grid>
		      </Grid>
	      </MuiPickersUtilsProvider>
      </FormControl>
      <FormControl className = {classes.formControl}>
		    <TextField
		      autoFocus
		      margin="dense"
		      id="postTitle"
		      type="text"
		      label="Keywords"
		      onKeyDown={handleKeyWordChange}
		      inputProps={{ maxLength: 30 }}
		      fullWidth
		    />
      </FormControl>
      <FormControl className = {classes.formControl}>
		    <div>
		      {
		        keywords.map((keyword, i) => 
		          <Chip
		            key={keyword}
		            color="primary"
		            label={keyword}
		            onDelete={() => handleDeleteKeyword(keyword)}
		          />
		        )
		      }
		    </div>
      </FormControl>
      <FormControl className = {classes.formControl}>
		    <TextField
		    	maxLength = {100}
		    	value = {author}
		      placeholder="Author..."
		      onChange = {handleAuthorChange}
		      classes={{
		        root: classes.title
		      }}
		      inputProps={{ 'aria-label': 'author' }}
		    />
      </FormControl>
	    <Grid
	    	className = {classes.formControl}
  			container
  			direction="row"	
  		>
  			
  			<Grid container item xs={6}>
  				<InputLabel id="board-name-label">Board Name</InputLabel>
					<Select
						labelId = "board-name-label"
						id="board-name-select"
						value={board}
						fullWidth
						onChange={handleChangeBoard}
					>
						{
							props.boards.map((board, i) =>
								<MenuItem key={i} value={board}>
									{board}
								</MenuItem>
							)
						}
					</Select>
			  </Grid>
			  <Grid container item xs={6}>
			  	<InputLabel id="board-year-label">Board Year</InputLabel>
					<Select
						labelId = "board-year-label"
						id="board-year-select"
						value={board}
						fullWidth
						onChange={handleChangeBoard}
					>
						{
							props.boards.map((board, i) =>
								<MenuItem key={i} value={board}>
									{board}
								</MenuItem>
							)
						}
					</Select>
	      </Grid>
	      
      </Grid>
      <Button
      	variant="contained"
      	color="primary"
      	onClick = {performSearch}
      >
      	Search
      </Button>
		</Card>
	);
}

PostSearch.propTypes = {
	board: PropTypes.object.isRequired
}

export default PostSearch;
