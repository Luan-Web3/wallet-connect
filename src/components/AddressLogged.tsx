import React from 'react';
import './AddressLogged.css';

interface AddressLoggedProps {
  address: string;
  icon: string;
  onClick?: () => void;
}

const AddressLogged: React.FC<AddressLoggedProps> = ({
  icon,
  address,
  onClick,
}) => {
  const formatAddress = () => {
    if (address.length < 10) {
      return address;
    }
    const firstFive = address.substring(0, 5);
    const lastFive = address.substring(address.length - 5);
    return `${firstFive}*****${lastFive}`;
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <div className="address-logged">
      <button className="btn" onClick={copyAddress}>
        {icon && (
          <img src={icon} />
        )}
        <span>{formatAddress()}</span>
      </button>
      <button onClick={onClick} className="btn btn-disconnect">Disconnect</button>
    </div>
  );
};

export default AddressLogged;
