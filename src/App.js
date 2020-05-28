import React, { Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Home from './components/Home';

const Matches = React.lazy(() => {
	return import('./components/Matches');
});

const app = (props) => {
	let routes = (
		<Switch>
			<Route path='/gameInformation' render={() => <Matches />} />
			<Route path='/home' render={() => <Home />} />
			<Route path='/' render={() => <Home />} />
			<Redirect to='/home' />
		</Switch>
	);

	return (
		<div>
			<Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
		</div>
	);
};

export default withRouter(app);
