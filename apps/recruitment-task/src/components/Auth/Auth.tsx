import React from 'react'
import { Button, CircularProgress, Typography, Box } from '@mui/material';

interface IAuthProps {
    error: string | null,
    handleLogin: ()=>void,
    loading: boolean

}

const Auth: React.FC<IAuthProps> = ({
    error,
    handleLogin,
    loading
}) => {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3 }}>
          <Typography variant="h6" gutterBottom>Login with Twitter</Typography>
          
          {error && (
            <Typography variant="body2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            disabled={loading}
            sx={{ mb: 2 }}
          >
            {loading ? <CircularProgress size={24} color="secondary" /> : 'Login with Twitter'}
          </Button>
    
          <Typography variant="body2" color="textSecondary">
            Click the button above to log in with Twitter.
          </Typography>
        </Box>
      );
}

export default Auth
