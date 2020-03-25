import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import testData from './tests/testData.js';

import moment from 'moment';

import {
	TextField,
	Chip,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Grid
} from '@material-ui/core';

import {
	KeyboardDatePicker,
	KeyboardTimePicker,
	DatePicker,
	MuiPickersUtilsProvider
} from '@material-ui/pickers';

// import DateFnsUtils from '@date-io/date-fns';
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
	const [keywords, setKeywords] = useState([]);
	const [board, setBoard] = useState("INTPROG");
	const [startDate, setStartDate] = useState(moment(new Date()));
	const [startTime, setStartTime] = useState(moment(new Date()));
	const boards = testData.boards;
	const handleKeyWordChange = (e) => {
    if (e.keyCode == 13 || e.keyCode == 32) {
      let val = e.target.value.trim();

      if((!keywords.includes(val)) && (val.length > 0 && val.length <= 30) && keywords.length < 5) {
        let joined = keywords.concat(val);
        setKeywords(joined);
      }
      e.target.value = ''; 
    }
  };
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
	return (
		<div className = {classes.root}>
			<FormControl className = {classes.formControl}>
				<TextField
		      placeholder="Title..."
		      classes={{
		        root: classes.title
		      }}
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
		      placeholder="Author..."
		      classes={{
		        root: classes.title
		      }}
		      inputProps={{ 'aria-label': 'author' }}
		    />
      </FormControl>
      <FormControl className = {classes.formControl}>
		    <InputLabel id="demo-simple-select-label">
		    	Board
		    </InputLabel>
		    <Select
		      labelId="demo-simple-select-label"
		      id="demo-simple-select"
		      value={board}
		      onChange={handleChangeBoard}
		    >
		    	{
		    		boards.map((board, i) =>
		    			<MenuItem key={i} value={board}>
		    				{board}
		    			</MenuItem>
		    		)
		    	}
		    </Select>
      </FormControl>
      <Button
      	variant="contained"
      	color="primary"
      >
      	Search
      </Button>
		</div>
	);
}

export default PostSearch;
