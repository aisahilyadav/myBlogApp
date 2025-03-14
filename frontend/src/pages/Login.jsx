import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { TextField, Button, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(formData));
    if (!result.error) {
      navigate('/dashboard');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: 400,
            gap: 2
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Welcome Back
          </Typography>
          
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleSubmit}
            disabled={status === 'loading'}
            startIcon={status === 'loading' ? <CircularProgress size={20} color="inherit" /> : null}
          >
            Login
          </Button>

          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
        </Paper>
      </Box>
    </motion.div>
  );
}
