import React from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress } from '@mui/material';

interface IWalletModalProps {
  open: boolean;
  onClose: () => void;
  walletAddress: string;
  setWalletAddress: (value: string) => void;
  handleSave: () => void;
  loading: boolean;
  error: string | null;
}

const WalletModal: React.FC<IWalletModalProps> = ({
  open,
  onClose,
  walletAddress,
  setWalletAddress,
  handleSave,
  loading,
  error,
}) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="wallet-modal-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="wallet-modal-title" variant="h6" gutterBottom>
          Enter Your Ethereum Wallet Address
        </Typography>

        {error && (
          <Typography variant="body2" color="error" gutterBottom>
            {error}
          </Typography>
        )}

        <TextField
          fullWidth
          label="Wallet Address"
          variant="outlined"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="secondary" /> : 'Save Address'}
        </Button>
      </Box>
    </Modal>
  );
};

export default WalletModal;
