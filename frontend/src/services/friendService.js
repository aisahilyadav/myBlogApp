import axios from 'axios';

const sendFriendRequest = (userId, token) => {
  return axios.post(`/api/friends/request/${userId}`, null, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export default { sendFriendRequest };