import { TextField, Button, Paper, Typography, Box, Container, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/auth/authSlice';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(register(formData));
    if (!result.error) {
      navigate('/dashboard');
    }
  };

  return (
    <Container maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mt: 8 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Create Account
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <TextField
                  fullWidth
                  label="Username"
                  margin="normal"
                  name="username"
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  variant="outlined"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="email"
                  type="email"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  variant="outlined"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <TextField
                  fullWidth
                  label="Password"
                  margin="normal"
                  name="password"
                  type="password"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  variant="outlined"
                />
              </motion.div>
              <Box sx={{ mt: 3 }}>
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled={status === 'loading'}
                  startIcon={status === 'loading' ? <CircularProgress size={20} color="inherit" /> : null}
                >
                  Register
                </Button>
              </Box>
              {error && (
                <Typography color="error" align="center" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </Box>
          </Paper>
        </Box>
      </motion.div>
    </Container>
  );
} 