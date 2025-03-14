import { useState } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, Box, Paper } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import blogService from '../services/blogService';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await blogService.createBlog({ title, content }, user.token);
      setTitle('');
      setContent('');
      toast.success('Blog post created successfully!');
    } catch (error) {
      toast.error('Failed to create blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          variant="outlined"
          required
        />
      </motion.div>
      
      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <TextField
          fullWidth
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          required
        />
      </motion.div>

      <Box sx={{ mt: 2 }}>
        <LoadingButton
          type="submit"
          variant="contained"
          fullWidth
          loading={loading}
          size="large"
        >
          Create Post
        </LoadingButton>
      </Box>
    </Box>
  );
}