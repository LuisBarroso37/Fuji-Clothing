import React from 'react';

import './Cart-dropdown.scss';

import '../custom-button/Custom-button';
import CustomButton from '../custom-button/Custom-button';

const CartDropdown = () => (
    <div className='cart-dropdown'>
        <div className='cart-items' />
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
)

export default CartDropdown;