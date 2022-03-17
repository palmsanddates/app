import API from '../utils/API';

class InstitutionService {
  getInstitutions() {
    return API.get('/institutions');
  }
}

export default new InstitutionService();
