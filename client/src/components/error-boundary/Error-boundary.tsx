import React from 'react';

import './Error-boundary.scss';

interface IErrorBoundaryState {
  hasErrored: boolean;
}

class ErrorBoundary extends React.Component<{}, IErrorBoundaryState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error: string) {
    return { hasErrored: true };
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <div className='errorImageOverlay'>
          <div className='errorImageContainer' />
          <div className='errorImageText'>Sorry, the page was not found!</div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
