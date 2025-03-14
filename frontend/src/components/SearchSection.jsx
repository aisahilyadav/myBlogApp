import { Paper, InputBase, IconButton, Container, Box } from '@mui/material';
import { Search } from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function SearchSection() {
  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        mt: 4, 
        mb: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ width: '100%', maxWidth: '800px' }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            borderRadius: '50px',
            background: 'rgba(12, 12, 12, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
          }}
        >
          <IconButton sx={{ p: '10px', ml: 1 }}>
            <Search />
          </IconButton>
          <InputBase
            placeholder="Search blogs, writers, topics..."
            sx={{ 
              ml: 1, 
              flex: 1,
              fontSize: '1rem',
              '& input': {
                py: 1
              }
            }}
          />
        </Paper>
      </motion.div>
    </Container>
  );
} 