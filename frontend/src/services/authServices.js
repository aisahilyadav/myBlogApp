import axiosInstance from '../utils/axiosConfig';

const login = async (email, password) => {
  const response = await axiosInstance.post('/auth/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const register = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export default { login, register };