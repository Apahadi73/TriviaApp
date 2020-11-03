import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';

const GameStatus = ({ correct = 0, incorrect = 0, totalScore = 0, startNewGame }) => {
	return (
		<ListGroup>
			<ListGroupItem>Correct: {correct}</ListGroupItem>
			<ListGroupItem>Incorrect: {incorrect}</ListGroupItem>
			<ListGroupItem>Total Score: {totalScore}</ListGroupItem>
			<ListGroupItem>
				<Button className="btn btn-danger" onClick={() => startNewGame(true)}>
					PLAY NEW GAME
				</Button>
			</ListGroupItem>
		</ListGroup>
	);
};

export default GameStatus;
