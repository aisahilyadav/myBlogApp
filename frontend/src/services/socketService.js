import socket from '../utils/socket';
import { toast } from 'react-toastify';

const initializeSocket = (userId) => {
  socket.auth = { userId };
  socket.connect();

  socket.on('connect', () => {
    console.log('Connected to WebSocket server');
  });

  socket.on('notification', (data) => {
    toast.info(data.message);
  });

  socket.on('blogUpdate', (data) => {
    // Handle real-time blog updates
    console.log('Blog updated:', data);
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
    toast.error('Connection error. Trying to reconnect...');
  });
};

export default { initializeSocket }; 