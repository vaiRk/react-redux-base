'use strict';

import { initService } from 'superagent-service';

export const URLs = {
	/**
	 * URL map here.
	 */
    'user-profile': 'users/me'
};

export default initService(URLs, API_HOST);