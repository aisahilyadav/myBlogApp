import { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Button, Avatar, Box, TextField, InputAdornment } from '@mui/material';
import { PersonAdd, Search, PersonOutline } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import userService from '../services/userService';

export default function Explore() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingRequests, setPendingRequests] = useState(new Set());

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await userService.discoverUsers();
      setUsers(data);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFriend = async (userId) => {
    setPendingRequests(prev => new Set(prev).add(userId));
    try {
      await userService.sendFriendRequest(userId);
      toast.success('Friend request sent!');
    } catch (error) {
      toast.error('Failed to send friend request');
      setPendingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom>
          Discover Users
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Paper>

        <Grid container spacing={3}>
          {filteredUsers.map((user, index) => (
            <Grid item xs={12} sm={6} md={4} key={user._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                      {user.username[0].toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">
                        {user.username}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Joined {new Date(user.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2">
                    {user.bio || 'No bio available'}
                  </Typography>

                  <Box sx={{ mt: 'auto', pt: 2 }}>
                    <LoadingButton
                      fullWidth
                      variant="contained"
                      startIcon={pendingRequests.has(user._id) ? <PersonOutline /> : <PersonAdd />}
                      loading={pendingRequests.has(user._id)}
                      onClick={() => handleAddFriend(user._id)}
                      disabled={pendingRequests.has(user._id)}
                    >
                      {pendingRequests.has(user._id) ? 'Request Sent' : 'Add Friend'}
                    </LoadingButton>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
}