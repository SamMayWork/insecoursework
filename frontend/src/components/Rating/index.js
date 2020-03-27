import React, {useState} from 'react';

import LikeButton from './components/LikeButton';
import DislikeButton from './components/DislikeButton';



/*
*
* Styles for the Rating Setup using passed through data from the like and dislike button
*
*/

/**
 * 
 * @param {Object} props Accepts an object containing the elements state
 *  
 */


const Rating = props => {
	const [rating, setRating] = useState('');
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'row'
		}}>
			<LikeButton/>
			<DislikeButton/>
		</div>
	);
}

export default Rating;
