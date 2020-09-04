import React from 'react';

import SHOP_DATA from './Shop.data';
import CollectionPreview from '../../components/collection-preview/Collection-preview';

export interface Item {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity?: number
}

export interface ICollection {
  id: number;
  title: string;
  items: Array<Item>;
}

interface ICollections {
  collections: Array<ICollection>;
}

class ShopPage extends React.Component<{}, ICollections> {
  constructor(props: {}) {
    super(props);
    this.state = {
      collections: SHOP_DATA,
    };
  }
  render() {
    const { collections } = this.state;
    return (
      <div>
        {collections.map((collection) => (
          <CollectionPreview
            key={collection.id}
            id={collection.id}
            title={collection.title}
            items={collection.items}
          />
        ))}
      </div>
    );
  }
}

export default ShopPage;
