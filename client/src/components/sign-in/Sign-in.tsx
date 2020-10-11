import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import './Sign-in.scss';

import FormInput from '../form-input/Form-input';
import CustomButton from '../custom-button/Custom-button';
import {
  googleSignInPending,
  IGoogleSignInPending,
  emailSignInPending,
  IEmailSignInPending,
} from '../../redux/user/user.actions';

type ISignInProps = ReturnType<typeof mapDispatchToProps>;

const SignIn: React.FC<ISignInProps> = ({ emailSignInPending, googleSignInPending }) => {
  const [userCredentials, setUserCredentials] = useState({ email: '', password: ''});

  const { email, password } = userCredentials;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setUserCredentials({...userCredentials, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    emailSignInPending(email, password);
  };

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='email'
          label='Email'
          value={email || ''}
          handleChange={handleChange}
          required
        />
        <FormInput
          type='password'
          name='password'
          label='Password'
          value={password || ''}
          handleChange={handleChange}
          required
        />
        <div className='buttons'>
          <CustomButton type='submit'>Sign in</CustomButton>
          <CustomButton
            type='button'
            isGoogleSignIn
            onClick={googleSignInPending}
          >
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

type IMapDispatchToProps = IGoogleSignInPending | IEmailSignInPending;

const mapDispatchToProps = (dispatch: Dispatch<IMapDispatchToProps>) => ({
  googleSignInPending: () => dispatch(googleSignInPending()),
  emailSignInPending: (email: string, password: string) =>
    dispatch(emailSignInPending({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
