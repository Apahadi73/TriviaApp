import React from 'react';

import Footer from './components/navigation/Footer';
import Header from './components/navigation/Header';
import HomePage from './components/HomePage';

const App = () => {
	return (
		<React.Fragment>
			<Header />
			<main>
				<HomePage />
			</main>
			<Footer />
		</React.Fragment>
	);
};

export default App;
