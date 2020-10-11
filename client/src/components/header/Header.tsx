import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Header.scss';

import Logo from '../../assets/fuji.png';
import { IRootReducer } from '../../redux/root-reducer';
import { IUserState } from '../../redux/user/user.reducer';
import CartIcon from '../cart-icon/Cart-icon';
import CartDropdown from '../cart-dropdown/Cart-dropdown';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import {
  IGoogleSignInPending,
  signOutPending,
} from '../../redux/user/user.actions';
import { Dispatch } from 'redux';

interface IHeaderState {
  hidden: boolean;
}

type IHeaderProps = IUserState &
  IHeaderState &
  ReturnType<typeof mapDispatchToProps>;

const Header: React.FC<IHeaderProps> = ({
  currentUser,
  hidden,
  signOutPending,
}) => (
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
        <div className='option' onClick={signOutPending}>
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
  currentUser: selectCurrentUser(state),
  hidden: selectCartHidden(state),
});

const mapDispatchToProps = (dispatch: Dispatch<IGoogleSignInPending>) => ({
  signOutPending: () => dispatch(signOutPending()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
