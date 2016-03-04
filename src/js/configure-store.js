'use strict';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from 'reducers';

if (process.env.NODE_ENV === 'development') {
	if (!window.devToolsExtension) {
		console.warn(
			'You are not using Redux DevTools. Y THO!? \n' +
			'https://github.com/zalmoxisus/redux-devtools-extension'
		);
	}
}

const loggerMiddleware = createLogger({
	/**
	 * Only log actions in dev mode.
	 */
	predicate: (getState, action) => process.env.NODE_ENV === 'development',
	collapsed: true,
	duration: true
});

const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware,
	loggerMiddleware,
	window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState) {
	const store = createStoreWithMiddleware(rootReducer, initialState);

	// Enable Webpack hot module replacement for reducers
	if (process.env.NODE_ENV === 'development') {
		if (module.hot) {
			module.hot.accept('reducers', () => {
				const nextRootReducer = require('reducers');
				store.replaceReducer(nextRootReducer);
			});
		}
	}

	return store;
}