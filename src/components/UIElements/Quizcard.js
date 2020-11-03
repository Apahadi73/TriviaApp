import React, { useState } from 'react';
import { Card, Col, Form, Row, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

const Quizcard = ({ question, num, answerHandler }) => {
	const [ error, showError ] = useState(false);
	// Fisher-Yates (aka Knuth) Shuffle to shuffle array
	let answers = [];
	if (question.incorrect_answers != null) {
		// console.log(question);
		answers = [ question.correct_answer, ...question.incorrect_answers ].sort();
	}

	const [ ans, setAns ] = useState(null);
	const submitHandler = (e) => {
		e.preventDefault();
		if (ans) {
			if (ans === question.correct_answer) {
				answerHandler(1);
			} else {
				answerHandler(-1);
			}
			showError(false);
		} else {
			showError(true);
		}
	};

	return (
		<React.Fragment>
			<Card className="bg-secondary">
				<Card.Header>Question {num}</Card.Header>
				<Card.Body>
					<Card.Title>{question.question}</Card.Title>
					<Row>
						<Col key="quiz-card" sm={12} md={6}>
							<Card.Subtitle className="text-muted">Difficulty: {question.difficulty}</Card.Subtitle>
						</Col>
						<Col key="type" sm={12} md={6}>
							<Card.Subtitle className="text-muted">Category: {question.category}</Card.Subtitle>
						</Col>
					</Row>
					<Form onSubmit={submitHandler}>
						<ListGroup>
							<ListGroupItem>
								<Form.Check
									type="radio"
									label={answers[0]}
									id={answers[0]}
									name="answers"
									value={answers[0]}
									onChange={(e) => setAns(e.target.value)}
								/>
							</ListGroupItem>
							<Form.Group>
								<ListGroupItem>
									<Form.Check
										type="radio"
										label={answers[1]}
										id={answers[1]}
										name="answers"
										value={answers[1]}
										onChange={(e) => setAns(e.target.value)}
									/>
								</ListGroupItem>
								<ListGroupItem>
									<Form.Check
										type="radio"
										label={answers[2]}
										id={answers[2]}
										name="answers"
										value={answers[2]}
										onChange={(e) => setAns(e.target.value)}
									/>
								</ListGroupItem>
								<ListGroupItem>
									<Form.Check
										type="radio"
										label={answers[3]}
										id={answers[3]}
										name="answers"
										value={answers[3]}
										onChange={(e) => setAns(e.target.value)}
									/>
								</ListGroupItem>
							</Form.Group>
						</ListGroup>
						{error && (
							<Card.Text style={{ color: 'red' }}>Please select one of the above answer!!</Card.Text>
						)}
						<Button className="btn btn-success" onClick={submitHandler}>
							SUBMIT
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</React.Fragment>
	);
};

export default Quizcard;
