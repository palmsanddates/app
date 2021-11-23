import { defaultState } from '../utils';
import {
	GET_EVENTS,
	CREATE_EVENT,
	DELETE_EVENT,
	SET_GET_EVENTS_LOADING,
} from '../actions';

const stateDataReducer = (state = defaultState(), action) => {
	// eslint-disable-next-line
	const { events, loadEventsError, createEventError, deleteEventError, loadEventsLoading} = state;
	switch (action.type) {
		case SET_GET_EVENTS_LOADING:{
			return {
				...state,
				loadEventsLoading: true,
			};
		}
		case GET_EVENTS:{
			if (action.payload.response.errorMessage) {
				return {
					...state,
					loadEventsError: action.payload.response.errorMessage,
					loadEventsLoading: false,
				};
			}
			return { ...state, events: action.payload.response.events, loadEventsLoading: false, };
		}		
		case CREATE_EVENT:{
			if (action.payload.response.errorMessage) {
				return {
					...state,
					createEventError: action.payload.response.errorMessage
				};
			}
			return { ...state, events: action.payload.response.events, loadEventsLoading: false };
		}
		case DELETE_EVENT:{
			if (action.payload.response.errorMessage) {
				return {
					...state,
					deleteEventError: action.payload.response.errorMessage
				};
			}
			return { ...state, events: action.payload.response.events, loadEventsLoading: false, };
		}
			
		default:
			return state;
	}
};

export default stateDataReducer;
