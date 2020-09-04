import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import './App.css';

import Homepage from '../pages/homepage/Homepage';
import ShopPage from '../pages/shop/Shop';
import Header from '../components/header/Header';
import SignInAndSignUpPage from '../pages/sign-in-and-sign-up/sign-in-and-sign-up';
import { auth, createUserProfileDocument } from '../firebase/firebase.utils';
import { setCurrentUser, ISetCurrentUser } from '../redux/user/user.actions';
import { IUser, IUserState } from '../redux/user/user.reducer';

type AppProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

class App extends React.Component<AppProps, {}> {
  unsubscribeFromAuth: any = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      const userRef = await createUserProfileDocument(userAuth);

      if (userRef) {
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
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

const mapStateToProps = ({ user }: { user: IUserState }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch: Dispatch<ISetCurrentUser>) => ({
  setCurrentUser: (user: IUser) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
