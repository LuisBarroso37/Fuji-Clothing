import React from 'react';
import { connect } from 'react-redux';

import './Directory.scss';

import MenuItem from '../menu-item/Menu-item';
import { IDirectoryState } from '../../redux/directory/directory.reducer';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';
import { IRootReducer } from '../../redux/root-reducer';

const Directory: React.FC<IDirectoryState> = ({ sections }) => (
    <div className='directory-menu'>
      {sections.map((section) => (
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

const mapStateToProps = (state: IRootReducer) => ({
  sections: selectDirectorySections(state)
});

export default connect(mapStateToProps)(Directory);
