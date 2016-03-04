'use strict';

import { REQUEST_USER_PROFILE } from 'actions/user';

function user(state={}, action) {
    switch (action.type) {
        case REQUEST_USER_PROFILE:
            return {
                ...state,
                ...action.user
            };
        default:
            return state;
    }
}

export default user;