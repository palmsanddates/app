import API from '../utils/API'
class AuthService {
  async login(email, password) {
    const res = await API.post(`/auth/login`, {
      email,
      password,
    });

    if (res.data.token) {
      localStorage.setItem('user', JSON.stringify(res.data));
    }

    return res.data;
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
