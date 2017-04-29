'use strict';

import * as TYPES from '../common/actionTypes';

const initialState = {
	isLoggedIn: false,
	status: null,
};

export default function authReducer(state=initialState, action){

	switch(action.type){
		case TYPES.LOGGED_DOING:
			return {
				...state,
				status: 'doing'
			};

		case TYPES.LOGGED_IN:
			return {
				...state,
				isLoggedIn: true,
				status: 'done'
			};

		case TYPES.LOGGED_OUT:
			return {
				...state,
				isLoggedIn: false,
				status: null
			};
		case TYPES.LOGGED_ERROR:
			return {
				...state,
				isLoggedIn: false,
				status: null
			}

		default:
			return state;
	}

}
