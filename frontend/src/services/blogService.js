import axiosInstance from '../utils/axiosConfig';

const blogService = {
  createBlog: async (blogData) => {
    const response = await axiosInstance.post('/blogs', blogData);
    return response.data;
  },

  getBlogs: async () => {
    const response = await axiosInstance.get('/blogs');
    return response.data;
  },

  getBlogById: async (id) => {
    const response = await axiosInstance.get(`/blogs/${id}`);
    return response.data;
  },

  updateBlog: async (id, blogData) => {
    const response = await axiosInstance.put(`/blogs/${id}`, blogData);
    return response.data;
  },

  deleteBlog: async (id) => {
    const response = await axiosInstance.delete(`/blogs/${id}`);
    return response.data;
  },

  likeBlog: async (id) => {
    const response = await axiosInstance.post(`/blogs/${id}/like`);
    return response.data;
  },

  commentOnBlog: async (id, comment) => {
    const response = await axiosInstance.post(`/blogs/${id}/comments`, { content: comment });
    return response.data;
  }
};

export default blogService; 