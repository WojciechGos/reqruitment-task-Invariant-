import React, { useState } from 'react';
import axios from 'axios';
import WalletModal from './WalletModal';

const WalletModalContainer: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    // Validate Ethereum address
    const ethRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!ethRegex.test(walletAddress)) {
      setError('Invalid Ethereum wallet address');
      setLoading(false);
      return;
    }

    try {
      // Replace with your backend endpoint to save the wallet address
      await axios.post('/api/save-wallet', { walletAddress });
      onClose(); // Close the modal after successful submission
    } catch (err) {
      console.error('Error saving wallet address:', err);
      setError('Failed to save the wallet address. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <WalletModal
      open={open}
      onClose={onClose}
      walletAddress={walletAddress}
      setWalletAddress={setWalletAddress}
      handleSave={handleSave}
      loading={loading}
      error={error}
    />
  );
};

export default WalletModalContainer;
