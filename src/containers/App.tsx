import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import './App.css';

import Homepage from '../pages/homepage/Homepage';
import ShopPage from '../pages/shop/Shop';
import CheckoutPage from '../pages/checkout/Checkout';
import Header from '../components/header/Header';
import SignInAndSignUpPage from '../pages/sign-in-and-sign-up/sign-in-and-sign-up';
import { IRootReducer } from '../redux/root-reducer';
import { selectCurrentUser } from '../redux/user/user.selectors';
import {
  checkUserSession,
  IGoogleSignInPending,
} from '../redux/user/user.actions';
//import { addCollectionAndDocuments } from '../firebase/firebase.utils';
//import { selectCollectionsForPreview } from '../redux/shop/shop.selectors';

type AppProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class App extends React.Component<AppProps, {}> {
  unsubscribeFromAuth: any = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();

    //Add shop data to the firestore - Only done once which is why it is commented out
    // Destructure collectionsArray from this.props

    /*addCollectionAndDocuments(
      'collections',
      collectionsArray.map((collection) => ({
        title: collection.title,
        items: collection.items,
      }))
    );*/
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootReducer) => ({
  currentUser: selectCurrentUser(state),
  //collectionsArray: selectCollectionsForPreview(state),
});

const mapDispatchToProps = (dispatch: Dispatch<IGoogleSignInPending>) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
