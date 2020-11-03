import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';

// fetches  and displays joke
const Joke = () => {
	const [ joke, setJoke ] = useState('');
	useEffect(() => {
		const fetchJoke = async () => {
			const { data } = await axios.get('https://sv443.net/jokeapi/v2/joke/Pun?type=single');
			setJoke(data.joke);
		};
		fetchJoke();
	}, []);
	return (
		<Card style={{ marginTop: '1rem' }}>
			<Card.Header>Joke of the Day</Card.Header>
			<Card.Body>
				<Card.Text>{joke}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Joke;
