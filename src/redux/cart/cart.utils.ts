import { Item } from '../../pages/shop/Shop';

type ICartItems = Array<Item>;

export const addItemToCart = (cartItems: ICartItems, cartItemToAdd: Item) => {
  const existingCardItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCardItem) {
    return cartItems.map((cartItem) => {
      let quantity = 0;
      
      if (cartItem.quantity) {
        quantity = cartItem.quantity
      }

      return cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: quantity + 1 }
        : cartItem
    });
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
