import React, {useState} from 'react';

import LikeButton from './components/LikeButton';
import DislikeButton from './components/DislikeButton';

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
