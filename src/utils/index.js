import API from '../utils/API';
import EventService from '../services/event.service'

export const defaultState = () => ({
    events:[],
	loadEventsError: null,
	createEventError: null,
	deleteEventError: null,
	loadEventsLoading: false,
});

function sortEvents(events) {
	return events.sort(
		(a, b) => new Date(b.start_time) - new Date(a.start_time))
}

export async function loadEvents() {
	const response = {
		events: [],
		errorMessage: null,
	}
	try {
		const res = await API.get('/events');
		const events = sortEvents(res.data);
		response.events = events;
		return response;
	  } catch(err) {
		response.errorMessage = err.message;
		return response;
	  }
}

export async function createEvent(form) {
	const response = {
		events: [],
		errorMessage: null,
	}
	try {
        const res = await EventService.createEvent(form)
		response.events = sortEvents(res.data.events);
		return response;
      } catch (err) {
		response.errorMessage = err.message;
		return response;
      }
}

export async function deleteEvent(id) {
	const response = {
		events: [],
		errorMessage: null,
	}
	try {
        const res = await EventService.deleteEvent(id)
		response.events = sortEvents(res.data.events);
		return response;
      } catch (err) {
		const resMessage =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
		response.errorMessage = resMessage;
		return response;
      }
}
