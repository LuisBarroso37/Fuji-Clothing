import React from 'react';

import './Homepage.scss';

import Directory from '../../components/directory/Directory';

const Homepage = (): JSX.Element => (
  <div className='homepage'>
    <Directory />
  </div>
);

export default Homepage;
