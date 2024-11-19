import React from 'react';
import PromptContainer from '../Prompt/PromptContainer';
import WalletModalContainer from '../WalletModal/WalletModalContainer';

interface IHomeProps {
  modalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
}

const Home: React.FC<IHomeProps> = ({ modalOpen, setModalOpen }) => {
  return (
    <div>
      <PromptContainer />
      <WalletModalContainer open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Home;
