import React from 'react';
import { Navbar } from 'react-bootstrap';
const Header = () => {
	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<Navbar.Brand style={{ fontSize: '1.5rem' }}>TriviaQuiz</Navbar.Brand>
			</Navbar>
		</header>
	);
};

export default Header;
