import React from 'react';

import Spinner from '../spinner/Spinner';

interface IWithSpinnerOtherProps {
  [x: string]: any;
}

interface ILoading {
  isLoading: boolean;
}

type IWithSpinnerProps = ILoading & IWithSpinnerOtherProps;

const WithSpinner = (WrappedComponent: React.FC<any>) => ({
  isLoading,
  ...otherProps
}: IWithSpinnerProps) =>
  isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;

export default WithSpinner;
