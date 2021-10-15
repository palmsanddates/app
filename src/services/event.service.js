import API from '../utils/API';
import authHeader from './auth-header';

class EventService {
  getEvents() {
    return API.get('/events');
  }

  getEvent(eventId) {
    return API.get(`/events/${eventId}`);
  }

  createEvent(newEvent) {
    return API.post('/events', newEvent, { headers: authHeader() });
  }

  deleteEvent(eventId) {
    return API.delete(`/events/${eventId}`, { headers: authHeader() });
  }
}

export default new EventService();
