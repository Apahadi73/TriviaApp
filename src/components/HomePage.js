import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import Quizcard from './UIElements/Quizcard';
import GameStatus from './UIElements/GameStatus';
import axios from 'axios';

const HomePage = () => {
	const baseUrl = 'https://opentdb.com/api.php?type=multiple&';
	const [ quiz, setQuiz ] = useState([]);
	const [ question, setQuestion ] = useState({});
	const [ num, setNum ] = useState(0);
	const [ correct, setCorrect ] = useState(0);
	const [ incorrect, setIncorrect ] = useState(0);
	const [ totalScore, setTotalScore ] = useState(0);
	const [ newGame, setnewGame ] = useState(false);
	const [ gameOver, showgameOver ] = useState(false);

	useEffect(
		() => {
			const fetchQuestions = async (num = 10) => {
				const { data } = await axios.get(`${baseUrl}amount=${num}`);
				setQuiz(data.results);
				setQuestion(data.results[0]);
			};
			fetchQuestions();
			if (newGame) {
				fetchQuestions();
			}
		},
		[ newGame ]
	);

	// handles when user submits his/her answer
	const answerHandler = (val) => {
		if (num <= 9) {
			console.log(num);
			switch (val) {
				// when answer is correct
				case 1:
					setCorrect(correct + 1);
					setTotalScore(totalScore + 10);
					break;
				// when answer is incorrect
				case -1:
					setIncorrect(incorrect + 1);
					setTotalScore(totalScore - 5);
					break;
				default:
			}
			setNum(num + 1);
			if (num < 9) {
				setQuestion(quiz[num + 1]);
			}
		} else {
			showgameOver(true);
		}
	};

	// gets called when user want to start new game
	const newGameRequested = () => {
		// starts new game
		setnewGame(true);
		// closes modal
		setnewGame(false);
		setNum(0);
		setCorrect(0);
		setIncorrect(0);
		setTotalScore(0);
		showgameOver(false);
	};

	return (
		<div className="homepage">
			<Container>
				{newGame && (
					<Modal.Dialog>
						<Modal.Header closeButton>
							<Modal.Title>Start new Game</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<p>Are you sure want to play new game?</p>
						</Modal.Body>

						<Modal.Footer>
							<Button variant="secondary" onClick={() => setnewGame(false)}>
								CLOSE
							</Button>
							<Button variant="danger" onClick={newGameRequested}>
								YES
							</Button>
						</Modal.Footer>
					</Modal.Dialog>
				)}
				{quiz &&
				!newGame &&
				!gameOver && (
					<Row>
						<Col key="quiz-card" sm={12} md={8}>
							<Quizcard question={question} num={num + 1} answerHandler={answerHandler} />
						</Col>
						<Col key="game-status-card" sm={12} md={4}>
							<GameStatus
								correct={correct}
								incorrect={incorrect}
								totalScore={totalScore}
								startNewGame={setnewGame}
							/>
						</Col>
					</Row>
				)}
				{gameOver && (
					<Modal.Dialog>
						<Modal.Header closeButton>
							<Modal.Title>
								<h2 style={{ color: 'red' }}>GAME OVER</h2>
							</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<h4 style={{ color: 'brown' }}>Your total score is {totalScore}.</h4>
							<p>Do you want to play new Game?</p>
						</Modal.Body>

						<Modal.Footer>
							<Button variant="secondary" onClick={() => showgameOver(false)}>
								CLOSE
							</Button>
							<Button variant="danger" onClick={newGameRequested}>
								YES
							</Button>
						</Modal.Footer>
					</Modal.Dialog>
				)}
			</Container>
		</div>
	);
};

export default HomePage;
