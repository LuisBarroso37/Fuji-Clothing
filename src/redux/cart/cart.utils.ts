import { Item } from '../../redux/shop/shop.reducer';

type ICartItems = Array<Item>;

const addItemToCart = (cartItems: ICartItems, cartItemToAdd: Item) => {
  const existingCardItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCardItem) {
    return cartItems.map((cartItem) => {
      let quantity = 0;

      if (cartItem.quantity) {
        quantity = cartItem.quantity;
      }

      return cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: quantity + 1 }
        : cartItem;
    });
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

const removeItemFromCart = (cartItems: ICartItems, cartItemToRemove: Item) => {
  const existingCardItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCardItem) {
    let quantity = 0;

    if (existingCardItem.quantity) {
      quantity = existingCardItem.quantity;
    }

    if (quantity === 1) {
      return cartItems.filter(
        (cartItem) => cartItem.id !== cartItemToRemove.id
      );
    }

    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: quantity - 1 }
        : { ...cartItem }
    );
  }
};

export { addItemToCart, removeItemFromCart };
