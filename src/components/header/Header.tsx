import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Header.scss';

import Logo from '../../assets/fuji.png';
import { auth } from '../../firebase/firebase.utils';
import { IRootReducer } from '../../redux/root-reducer';
import { IUserState } from '../../redux/user/user.reducer';
import CartIcon from '../cart-icon/Cart-icon';
import CartDropdown from '../cart-dropdown/Cart-dropdown';
import { ICartState } from '../../redux/cart/cart.reducer';

type IHeaderProps = IUserState & ICartState;

const Header: React.FC<IHeaderProps> = ({ currentUser, hidden }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <img src={Logo} alt='Logo' className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

const mapStateToProps = (state: IRootReducer) => ({
  currentUser: state.user.currentUser,
  hidden: state.cart.hidden,
  cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps)(Header);
