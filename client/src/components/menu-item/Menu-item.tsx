import React from 'react';

import './Menu-item.scss';

import { withRouter, RouteComponentProps } from 'react-router-dom';

interface IMenuItem extends RouteComponentProps {
  title: string;
  image: string;
  size: string;
  linkUrl: string;
}

const MenuItem: React.FC<IMenuItem> = ({
  title,
  image,
  size,
  history,
  linkUrl,
  match,
}) => (
  <div
    className={`menu-item ${size}`}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <div
      className='background-image'
      style={{ backgroundImage: `url(${image})` }}
    />
    <div className='content'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <span className='subtitle'>SHOP NOW</span>
    </div>
  </div>
);

export default withRouter(MenuItem);
