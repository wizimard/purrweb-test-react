import $api from "./config";

class UserService {
  async login(email: string, password: string) {
    return $api.post('/auth/login', {
      email,
      password
    });
  }
  async register(email: string, name: string, surname: string, phone: string, password: string) {
    return $api.post("/auth/register", {
      email,
      name,
      surname,
      phone,
      password
    });
  }
  async logout() {
    return $api.post('/auth/log-out');
  }
  async refresh() {
    return $api.get('/auth/refresh');
  }
  async getUsers() {
    return $api.get('/users');
  }
  async getUser(id: string) {
    return $api.get(`/users/${id}`);
  }
}

export default new UserService();