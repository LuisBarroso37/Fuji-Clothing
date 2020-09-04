import React from 'react';

import './Directory.scss';

import MenuItem from '../menu-item/Menu-item';
import SECTIONS from './Directory.data';

interface ISections {
  title: string;
  imageUrl: string;
  id: number;
  size?: string;
  linkUrl: string;
}

interface IDirectoryState {
  sections: Array<ISections>;
}

class Directory extends React.Component<{}, IDirectoryState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      sections: SECTIONS,
    };
  }

  render() {
    return (
      <div className='directory-menu'>
        {this.state.sections.map((section) => (
          <MenuItem
            key={section.id}
            title={section.title}
            image={section.imageUrl}
            size={section.size || ''} // Avoid undefined error in Typescript
            linkUrl={section.linkUrl}
          />
        ))}
      </div>
    );
  }
}

export default Directory;
