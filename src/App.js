import React, { Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

const Matches = React.lazy(() => {
	return import('./components/Matches');
});

const app = (props) => {
	let routes = (
		<Switch>
			<Route path='/gameInformation' render={(props) => <Matches {...props} />} />
			<Redirect to='/gameInformation' />
		</Switch>
	);

	return (
		<div>
			<Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
		</div>
	);
};

export default withRouter(app);
