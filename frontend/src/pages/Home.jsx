import { Container, Paper, Typography, Button, Box, IconButton, useTheme,  Grid 
} from '@mui/material';
import { Edit, Group, TrendingUp, AutoStories, GitHub, Twitter, LinkedIn, Facebook, Explore, Email, LocationOn, Phone 
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchSection from '../components/SearchSection';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();

  // Animation variant for hero section
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Data for the four cards
  const cards = [
    {
      icon: <Edit sx={{ fontSize: 40, color: 'white' }} />,
      title: "Write & Create",
      description: "Express yourself through powerful storytelling tools.",
      quote: `"There is no greater agony than bearing an untold story inside you." – Maya Angelou`,
      bg: 'linear-gradient(135deg, #1a237e 0%, #4a148c 100%)'
    },
    {
      icon: <Group sx={{ fontSize: 40, color: 'white' }} />,
      title: "Connect",
      description: "Join a community of passionate writers and readers.",
      quote: `"A word after a word after a word is power." – Margaret Atwood`,
      bg: 'linear-gradient(135deg, #00695c 0%, #004d40 100%)'
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: 'white' }} />,
      title: "Grow",
      description: "Build your audience and reach more readers.",
      quote: `"Stories can conquer fear, you know. They can make the heart bigger." – Ben Okri`,
      bg: 'linear-gradient(135deg, #880e4f 0%, #5d1049 100%)'
    },
    {
      icon: <AutoStories sx={{ fontSize: 40, color: 'white' }} />,
      title: "Read",
      description: "Discover stories from writers around the world.",
      quote: `"A reader lives a thousand lives before he dies. The man who never reads lives only one." – George R.R. Martin`,
      bg: 'linear-gradient(135deg, #006064 0%, #004346 100%)'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #1a237e 30%, #283593 90%)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            {/* Left Column */}
            <Grid item xs={12} md={6}>
              <motion.div {...fadeInUp}>
                <Typography
                  component="h1"
                  variant="h2"
                  color="white"
                  gutterBottom
                  sx={{
                    fontWeight: 800,
                    letterSpacing: '-0.05rem',
                    lineHeight: 1.2,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  Share Your <span style={{ color: '#ffd54f' }}>Stories</span> with the World
                </Typography>
                <Typography
                  variant="h5"
                  color="white"
                  paragraph
                  sx={{ opacity: 0.9, mb: 4, fontSize: '1.4rem', lineHeight: 1.6 }}
                >
                  Create, connect, and inspire through your writing. Join our community of passionate writers and readers.
                </Typography>
                {user ? (
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<Edit />}
                        onClick={() => navigate('/dashboard')}
                        sx={{
                          backgroundColor: 'white',
                          color: 'primary.main',
                          '&:hover': { backgroundColor: '#e0e0e0' }
                        }}
                      >
                        Create Blog
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<Explore />}
                        onClick={() => navigate('/explore')}
                        sx={{
                          borderColor: 'white',
                          color: 'white',
                          '&:hover': { borderColor: '#e0e0e0', color: '#e0e0e0' }
                        }}
                      >
                        Explore
                      </Button>
                    </motion.div>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/register')}
                        sx={{
                          backgroundColor: 'white',
                          color: 'primary.main',
                          '&:hover': { backgroundColor: '#e0e0e0' }
                        }}
                      >
                        Get Started
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate('/login')}
                        sx={{
                          borderColor: 'white',
                          color: 'white',
                          '&:hover': { borderColor: '#e0e0e0', color: '#e0e0e0' }
                        }}
                      >
                        Sign In
                      </Button>
                    </motion.div>
                  </Box>
                )}
              </motion.div>
            </Grid>
            {/* Right Column */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <SearchSection />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Card Layout Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          sx={{ textAlign: 'center', mb: 8, fontWeight: 700, color: theme.palette.primary.main }}
        >
          Your Story Journey
        </Typography>
        {cards.map((item, index) => (
          <Grid container spacing={4} key={index} sx={{ mb: 8, flexDirection: index % 2 === 0 ? 'row' : 'row-reverse', alignItems: 'center' }}>
            {/* Card Content */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <Paper
                  elevation={8}
                  sx={{
                    p: { xs: 4, md: 6 },
                    borderRadius: 4,
                    background: item.bg,
                    overflow: 'hidden',
                    height: '80vh',//height of the card
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.5s ease',
                    '&:hover': { boxShadow: theme.shadows[20] }
                  }}
                >
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}>
                    <Box sx={{
                      bgcolor: 'rgba(255,255,255,0.15)',
                      borderRadius: '50%',
                      p: 3,
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                      mb: 3
                    }}>
                      {item.icon}
                    </Box>
                    <Typography variant="h3" gutterBottom sx={{
                      fontWeight: 700,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                      color: 'white'
                    }}>
                      {item.title}
                    </Typography>
                    <Typography variant="h6" sx={{
                      opacity: 0.9,
                      lineHeight: 1.6,
                      color: 'white'
                    }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            {/* Quote Section (Rendered Outside the Card) */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Paper
                  elevation={4}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    background: 'rgba(0,0,0,0.05)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    
                    minHeight: 200
                  }}
                >
                  <Typography variant="h5" sx={{
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic',
                    color: 'text.primary',
                    textAlign: 'center',
                    p: 2
                  }}>
                    {item.quote}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        ))}
      </Container>

      {/* Enhanced Professional Footer */}
      <Box 
        component="footer" 
        sx={{ 
          mt: 'auto', 
          py: 8,
          background: 'linear-gradient(to right, #1a237e, #283593)',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <Container maxWidth="lg">
          {/* Footer Top - Logo and Newsletter */}
          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 800, 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <AutoStories /> StoryShare
                </Typography>
              </Box>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'rgba(255,255,255,0.8)',
                  maxWidth: 450,
                  lineHeight: 1.7
                }}
              >
                Your platform for sharing powerful stories and connecting with writers worldwide. 
                Our mission is to build a community where every voice can be heard and every story can inspire.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 600, 
                  color: 'white',
                  mb: 2
                }}
              >
                Subscribe to Our Newsletter
              </Typography>
              <Box 
                component="form" 
                sx={{ 
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 1
                }}
              >
                <Box 
                  component="input"
                  sx={{
                    flex: 1,
                    p: 1.5,
                    borderRadius: 2,
                    border: 'none',
                    fontSize: '1rem',
                    outline: 'none',
                    '&:focus': {
                      boxShadow: '0 0 0 2px #90caf9'
                    }
                  }}
                  placeholder="Enter your email"
                />
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#ffd54f',
                    color: '#1a237e',
                    p: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: '#ffb300'
                    }
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Footer Main Content */}
          <Grid container spacing={4} sx={{ mb: 6, borderTop: '1px solid rgba(255,255,255,0.1)', pt: 6 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ 
                  color: 'white',
                  fontWeight: 600,
                  position: 'relative',
                  paddingBottom: 2,
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 40,
                    height: 3,
                    background: '#ffd54f'
                  }
                }}
              >
                Navigation
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 3 }}>
                {['Home', 'About', 'Features', 'Pricing', 'Blog', 'Contact'].map((link) => (
                  <Button 
                    key={link}
                    sx={{ 
                      justifyContent: 'flex-start', 
                      color: 'rgba(255,255,255,0.8)',
                      p: 0,
                      '&:hover': {
                        color: '#ffd54f',
                        background: 'transparent'
                      },
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {link}
                  </Button>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ 
                  color: 'white',
                  fontWeight: 600,
                  position: 'relative',
                  paddingBottom: 2,
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 40,
                    height: 3,
                    background: '#ffd54f'
                  }
                }}
              >
                Resources
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 3 }}>
                {['Help Center', 'Writing Tips', 'Community Guidelines', 'Privacy Policy', 'Terms of Service'].map((link) => (
                  <Button 
                    key={link}
                    sx={{ 
                      justifyContent: 'flex-start', 
                      color: 'rgba(255,255,255,0.8)',
                      p: 0,
                      '&:hover': {
                        color: '#ffd54f',
                        background: 'transparent'
                      },
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {link}
                  </Button>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ 
                  color: 'white',
                  fontWeight: 600,
                  position: 'relative',
                  paddingBottom: 2,
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 40,
                    height: 3,
                    background: '#ffd54f'
                  }
                }}
              >
                Connect With Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 3, mb: 4 }}>
                {[GitHub, Twitter, LinkedIn, Facebook].map((Icon, index) => (
                  <IconButton 
                    key={index}
                    sx={{ 
                      color: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                      '&:hover': { 
                        bgcolor: '#ffd54f',
                        color: '#1a237e'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Icon />
                  </IconButton>
                ))}
              </Box>
              {/* Contact Info */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Email sx={{ color: 'rgba(255,255,255,0.8)' }} />
                  <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    contact@storyshare.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Phone sx={{ color: 'rgba(255,255,255,0.8)' }} />
                  <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    +1 (555) 123-4567
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ 
                  color: 'white',
                  fontWeight: 600,
                  position: 'relative',
                  paddingBottom: 2,
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 40,
                    height: 3,
                    background: '#ffd54f'
                  }
                }}
              >
                Our Location
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2 }}>
                  <LocationOn sx={{ color: 'rgba(255,255,255,0.8)' }} />
                  <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    India<br />
                   
                    
                  </Typography>
                </Box>
               
              </Box>
            </Grid>
          </Grid>
          
          {/* Footer Bottom - Copyright */}
          <Box 
            sx={{ 
              pt: 3, 
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ color: 'rgba(255,255,255,0.7)' }}
            >
              © {new Date().getFullYear()} StoryShare. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Button sx={{ color: 'rgba(255,255,255,0.7)', minWidth: 'auto', p: 0, '&:hover': { background: 'transparent', color: '#ffd54f' } }}>
                Privacy
              </Button>
              <Button sx={{ color: 'rgba(255,255,255,0.7)', minWidth: 'auto', p: 0, '&:hover': { background: 'transparent', color: '#ffd54f' } }}>
                Terms
              </Button>
              <Button sx={{ color: 'rgba(255,255,255,0.7)', minWidth: 'auto', p: 0, '&:hover': { background: 'transparent', color: '#ffd54f' } }}>
                Cookies
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}