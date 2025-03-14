import axiosInstance from '../utils/axiosConfig';

const login = async (userData) => {
  const response = await axiosInstance.post('/auth/login', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data.user;
};

const register = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data.user;
};

const authService = { login, register };
export default authService;