import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import './Collection.scss';

import CollectionItem from '../../components/collection-item/Collection-item';
import { selectCollection } from '../../redux/shop/shop.selectors';
import { IRootReducer } from '../../redux/root-reducer';

interface IMatchProps {
  match: {
    params: {
      collectionId: string;
    };
  };
}

type ICategoryPageProps = IMatchProps &
  RouteComponentProps &
  ReturnType<typeof mapStateToProps>;

const CollectionPage: React.FC<ICategoryPageProps> = ({
  match,
  collection,
}) => {
  const { title, items } = collection || {};

  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items
          ? items.map((item) => <CollectionItem key={item.id} item={item} />)
          : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IRootReducer, ownProps: IMatchProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
