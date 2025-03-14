import { AppBar, Toolbar, Button, Box, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { Dashboard, Explore, Person } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export default function Navigation() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate('/');
  };

  // Animation variants
  const itemVariants = {
    hover: { scale: 1.05, transition: { type: 'spring', stiffness: 300 } },
    tap: { scale: 0.95 }
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        background: 'rgba(18, 18, 18, 0.7)',
        backdropFilter: 'blur(12px) saturate(180%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)'
      }}
    >
      <Toolbar sx={{ 
        justifyContent: 'space-between',
        py: 1,
        maxWidth: '1280px',
        mx: 'auto',
        width: '100%'
      }}>
        <motion.div
          whileHover="hover"
          whileTap="tap"
          variants={itemVariants}
        >
          <Button
            onClick={() => navigate('/')}
            sx={{ 
              fontSize: '1.25rem',
              fontStyle: 'bold',
              fontWeight: 700,
              color: '#ffd54f',
              // WebkitBackgroundClip: 'text',
              // WebkitTextFillColor: 'transparent',
              letterSpacing: '0.05em',
              '&:hover': {
                background: '',
              }
            }}
          >
          myBlog
          </Button>
        </motion.div>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <motion.div whileHover="hover" whileTap="tap" variants={itemVariants}>
            <Button 
              color="inherit" 
              onClick={() => navigate('/explore')}
              startIcon={<Explore />}
              sx={{ 
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.9)',
                '&:hover': { 
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#fff'
                }
              }}
            >
              Explore
            </Button>
          </motion.div>

          {user ? (
            <>
              <motion.div whileHover="hover" whileTap="tap" variants={itemVariants}>
                <Button 
                  color="inherit" 
                  startIcon={<Dashboard />}
                  onClick={() => navigate('/dashboard')}
                  sx={{ 
                    fontWeight: 500,
                    color: 'rgba(255, 255, 255, 0.9)',
                    '&:hover': { 
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff'
                    }
                  }}
                >
                  Dashboard
                </Button>
              </motion.div>

              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={itemVariants}
              >
                <IconButton
                  onClick={handleMenu}
                  sx={{ 
                    ml: 1,
                    border: '1.5px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(4px)',
                    '&:hover': { 
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                >
                  <Avatar sx={{ 
                    width: 36, 
                    height: 36, 
                    bgcolor: 'rgba(144, 202, 249, 0.2)',
                    color: '#90CAF9',
                    fontWeight: 600
                  }}>
                    {user.username?.[0]?.toUpperCase()}
                  </Avatar>
                </IconButton>
              </motion.div>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                TransitionComponent={motion.div}
                transitionDuration={200}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    background: 'rgba(18, 18, 18, 0.8)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                    minWidth: '200px'
                  }
                }}
                MenuListProps={{
                  sx: {
                    py: 0.5
                  }
                }}
              >
                <MenuItem 
                  onClick={() => {
                    handleClose();
                    navigate('/profile');
                  }}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                >
                  <Person sx={{ mr: 1.5, fontSize: '1.2rem' }} /> Profile
                </MenuItem>
                <MenuItem 
                  onClick={handleLogout}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                >
                  <Dashboard sx={{ mr: 1.5, fontSize: '1.2rem' }} /> Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <motion.div whileHover="hover" whileTap="tap" variants={itemVariants}>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => navigate('/login')}
                  sx={{ 
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      background: 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                >
                  Login
                </Button>
              </motion.div>

              <motion.div whileHover="hover" whileTap="tap" variants={itemVariants}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/register')}
                  sx={{ 
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    boxShadow: '0 2px 4px rgba(33, 203, 243, 0.2)',
                    fontWeight: 500,
                    '&:hover': {
                      boxShadow: '0 4px 8px rgba(33, 203, 243, 0.3)',
                      background: 'linear-gradient(45deg, #1E88E5 30%, #00BCD4 90%)'
                    }
                  }}
                >
                  Get Started
                </Button>
              </motion.div>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}