'use strict';

import React from 'react';
import { render } from 'react-dom';
import Router from 'routes';

// CSS
import 'normalize.css';
import 'styles.scss';

/**
 * Set dev token on local storage for convenience.
 */
if (process.env.NODE_ENV === 'development') {
	if (localStorage.getItem('token') !== DEV_TOKEN) {
		localStorage.setItem('token', DEV_TOKEN);
	}
}

/**
 * Render UI
 */
render(Router, document.getElementById('ui'));