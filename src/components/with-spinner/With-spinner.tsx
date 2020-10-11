import React from 'react';

import './With-spinner.scss';

interface IWithSpinnerOtherProps {
  [x: string]: any;
}

interface ILoading {
  isLoading: boolean;
}

type IWithSpinnerProps = ILoading & IWithSpinnerOtherProps;

const WithSpinner = (WrappedComponent: React.FC<any>) => {
  const Spinner = ({ isLoading, ...otherProps }: IWithSpinnerProps) => {
    return isLoading ? (
      <div className='spinner-overlay'>
        <div className='spinner-container' />
      </div>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner;
};

export default WithSpinner;
