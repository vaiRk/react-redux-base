'use strict';

import service from 'service';

/**
 * Action types.
 */
export const REQUEST_USER_PROFILE = 'REQUEST_USER_PROFILE';

/**
 * Action Creators.
 */
function getUserProfile(profile) {
    const { _id, name, email, facebook_id } = profile;
    const user = { _id, name, email, facebook_id };
    return { type: REQUEST_USER_PROFILE, user };
}

export function fetchUserProfile() {
    return function(dispatch) {
        return service.doGet({ url: 'user-profile' })
            .then(({ user }) => dispatch(getUserProfile(user)));
    }
}