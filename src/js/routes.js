'use strict';

import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import Root from 'containers/root';
import Login from 'pages/login';

/**
 * Get token middleware.
 * If a token is present as query in the route, save it on localStorage.
 */
function checkForNewToken({ location }, replaceState, next) {
	const token = location.query.token;

	if (token) {
		localStorage.setItem('token', token);
		replaceState({ nextPathname: location.pathname }, location.pathname);
	}

	next();
}

function invalidateToken(nextState, replaceState, next) {
	const shouldInvalidate = nextState.location.query.invalidateToken;

	if (shouldInvalidate) {
		localStorage.removeItem('token');
	}

	requireAuth(nextState, replaceState, next);
}

/**
 * Require auth middleware.
 * If a token is not present on localStorage user will be redirected to /login.
 */
function requireAuth({ location }, replaceState, next) {
	const token = localStorage.getItem('token');

	if (!token) {
		replaceState({ nextPathname: location.pathname }, '/login');
	}

	next();
}

export default (
	<Router history={createBrowserHistory()}>
		<Route onEnter={checkForNewToken}>
			<Route path='/login' component={Login} onEnter={invalidateToken} />
			<Route path='/' component={Root} onEnter={requireAuth}>
				{
					/**
					 * All routes requiring auth.
					 */
				}
			</Route>
		</Route>
	</Router>
);