import axiosInstance from '../utils/axiosConfig';

const discoverUsers = () => {
  return axiosInstance.get('/explore');
};

const getProfile = (userId) => {
  return axiosInstance.get(`/profile/${userId}`);
};

const updateProfile = (data) => {
  return axiosInstance.put('/profile', data);
};

const sendFriendRequest = (userId) => {
  return axiosInstance.post(`/friends/request/${userId}`);
};

const acceptFriendRequest = (userId) => {
  return axiosInstance.put(`/friends/accept/${userId}`);
};

export default {
  discoverUsers,
  getProfile,
  updateProfile,
  sendFriendRequest,
  acceptFriendRequest
}; 