import './App.css';
import React, { useEffect, useState } from 'react';

import Button from './components/Button';
import AddressLogged from './components/AddressLogged';
import Modal from './components/Modal';
import WalletIcon from './assets/wallet.svg';
import MetamaskIcon from './assets/metamask.svg';

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [icon, setIcon] = useState<string | null>(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const checkAccount = async () => {
        if (typeof window.ethereum === 'undefined') {
          console.log('MetaMask não está instalada no navegador.');
          return;
        }

        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts', // Método para verificar contas ativas
          });

          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setIcon(MetamaskIcon);
          }
        } catch (err) {
          console.error(err);
        }
      };

      checkAccount();
    }
  }, []);

  const connectMetamask = async () => {
    if (typeof window.ethereum === 'undefined') {
      window.open('https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn', '_blank');
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      setAccount(accounts[0]);
      setIcon(MetamaskIcon);
    } catch (err) {
      console.error(err);
    } finally {
      closeModal();
    }
  };

  return (
    <>
      {account ? (
        <AddressLogged
          address={account}
          icon={icon || ''}
          onClick={() => setAccount(null)}
        />
      ) : (
        <Button
          icon={WalletIcon}
          label="Connect a wallet"
          width="200px"
          onClick={openModal}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <h1 className="modal-header">Connect wallet</h1>
        <Button
          icon={MetamaskIcon}
          label="Metamask"
          width="320px"
          onClick={connectMetamask}
        />
      </Modal>
    </>
  );
};

export default App;
