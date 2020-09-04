import React from 'react';

import './Custom-button.scss';

interface CustomButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isGoogleSignIn?: boolean;
  inverted?: boolean}

const CustomButton: React.FC<CustomButton> = ({
  children,
  isGoogleSignIn,
  inverted,
  ...props
}) => (
  <button
    {...props}
    className={`${isGoogleSignIn ? 'google-sign-in' : ''} ${inverted ? 'inverted' : ''} custom-button`}
  >
    {children}
  </button>
);

export default CustomButton;
