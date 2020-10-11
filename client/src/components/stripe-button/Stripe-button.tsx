import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

interface IStripeButtonProps {
  price: number;
}

const StripeCheckoutButton: React.FC<IStripeButtonProps> = ({ price }) => {
  // Stripe needs the price in cents
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51HPT8EKNUjOSyNPA6I7RZNtwZyB1Ki2MzblpDJpAKfuiU1h18vt51GJBdPusdsWET3u8IhUwesAqyGTwqEyXStuO00Zp4fdUus';

  const onToken = (token: any) => {
    fetch('/payment', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        amount: priceForStripe,
        token
      })
    })
    .then(res => alert('Payment successful'))
    .catch(err => {
      console.log(`Payment error: ${JSON.parse(err)}`);
      alert('There was an issue with your payment. Please make sure you use the provided credit card');
    });
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='Fuji Clothing'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
