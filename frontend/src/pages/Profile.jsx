import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Paper, Typography, TextField, Button, Grid, Avatar, Box, Divider } from '@mui/material';
import { Edit, Save, Cancel } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [profileData, setProfileData] = useState({
    bio: user?.bio || '',
    email: user?.email || '',
    username: user?.username || ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      // Implement your update profile logic here
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Container>
        <Typography>Please login to view profile</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Avatar
                sx={{ width: 100, height: 100, mb: 2 }}
                src={user.avatar}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom textAlign="center">
                {user.username}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button
                  startIcon={isEditing ? <Cancel /> : <Edit />}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </Box>
              <TextField
                fullWidth
                label="Bio"
                multiline
                rows={4}
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                disabled={!isEditing}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                value={profileData.email}
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Username"
                value={profileData.username}
                disabled
                sx={{ mb: 2 }}
              />
              {isEditing && (
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleUpdateProfile}
                  disabled={loading}
                >
                  Save Changes
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      </motion.div>
    </Container>
  );
} 