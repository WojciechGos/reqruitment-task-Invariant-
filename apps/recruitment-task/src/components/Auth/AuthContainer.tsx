import React, { useState } from 'react';
import axios from 'axios';
import Auth from './Auth'

const AuthContainer: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const handleLogin = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await axios.post('/api/auth/sign-in/twitter'); 

        const { oauthUrl } = response.data;
  
        window.location.href = oauthUrl;
      } catch (err) {
        console.error('Error during Twitter login:', err);
        setError('Failed to initiate Twitter OAuth flow');
      } finally {
        setLoading(false);
      }
    };

  return <Auth
    handleLogin={handleLogin}
    loading={loading}
    error={error}
  />
}

export default AuthContainer
