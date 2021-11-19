import { loadEvents, createEvent, deleteEvent } from "../utils";

export const GET_EVENTS = "GET_EVENTS";
export const CREATE_EVENT = "CREATE_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";
export const SET_GET_EVENTS_LOADING = "SET_GET_EVENTS_LOADING";

export const setGetEventsLoading = () => ({
    type: SET_GET_EVENTS_LOADING,
    payload: {},
});

export const getEventsAction = () => async dispatch => {
    loadEvents().then((response) => {
        dispatch({
            type: GET_EVENTS,
            payload: { response }
        });
    }
    );
}

export const createEventAction = (form) => async dispatch => {
    createEvent(form).then((response) => {
        dispatch({
            type: CREATE_EVENT,
            payload: { response }
        });
    }
    );
}

export const deleteEventAction = (id) => async dispatch => {
    deleteEvent(id).then((response) => {
        dispatch({
            type: DELETE_EVENT,
            payload: { response }
        });
    }
    );
}