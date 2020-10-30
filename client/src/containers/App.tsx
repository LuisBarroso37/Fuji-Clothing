import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import './App.css';

import ErrorBoundary from '../components/error-boundary/Error-boundary';
import Spinner from '../components/spinner/Spinner';
import Header from '../components/header/Header';
import { IRootReducer } from '../redux/root-reducer';
import { selectCurrentUser } from '../redux/user/user.selectors';
import {
  checkUserSession,
  IGoogleSignInPending,
} from '../redux/user/user.actions';
//import { addCollectionAndDocuments } from '../firebase/firebase.utils';
//import { selectCollectionsForPreview } from '../redux/shop/shop.selectors';

const Homepage = lazy(() => import('../pages/homepage/Homepage'));
const ShopPage = lazy(() => import('../pages/shop/Shop'));
const CheckoutPage = lazy(() => import('../pages/checkout/Checkout'));
const SignInAndSignUpPage = lazy(
  () => import('../pages/sign-in-and-sign-up/sign-in-and-sign-up')
);

type AppProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const App: React.FC<AppProps> = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
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
  }, [checkUserSession]);

  return (
    <div>
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={Homepage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route
              exact
              path='/signin'
              render={() =>
                currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
              }
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state: IRootReducer) => ({
  currentUser: selectCurrentUser(state),
  //collectionsArray: selectCollectionsForPreview(state),
});

const mapDispatchToProps = (dispatch: Dispatch<IGoogleSignInPending>) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
