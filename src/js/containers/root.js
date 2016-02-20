'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import BaseComponent from 'components/base';
import configureStore from 'configure-store';

const store = configureStore();

export default class Root extends BaseComponent {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<Provider store={store}>
				{
					/**
					 * App component goes here.
					 * All props must be passed.
					 */
				}
			</Provider>
		);
	}
}