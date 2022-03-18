import API from '../utils/API';
import authHeader from './auth-header';

class ClubService {
  getClubs(institutionId) {
    return API.get(`/clubs/${institutionId}`, { headers: authHeader() });
  }
}

export default new ClubService();
