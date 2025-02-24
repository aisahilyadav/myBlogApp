import axios from 'axios';

const API_URL = 'http://localhost:8000/api/blogs';

const createBlog = (blogData, token) => {
  return axios.post(API_URL, blogData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const getBlogs = () => {
  return axios.get(API_URL);
};

export default { createBlog, getBlogs };