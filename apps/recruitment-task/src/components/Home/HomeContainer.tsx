import React, { useState } from 'react';
import Home from './Home';

const HomeContainer: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <Home modalOpen={modalOpen} setModalOpen={setModalOpen} />
  );
};

export default HomeContainer;