import React, { useState } from 'react';
import { connect } from 'react-redux';

import './Sign-up.scss';

import FormInput from '../form-input/Form-input';
import CustomButton from '../custom-button/Custom-button';
import { IEmailSignInPending, ISignInInfo, signUpPending } from '../../redux/user/user.actions';
import { Dispatch } from 'redux';

type ISignUpProps = ReturnType<typeof mapDispatchToProps>;

const SignUp: React.FC<ISignUpProps> = ({ signUpPending }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserCredentials({...userCredentials, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    signUpPending({ displayName, email, password });
  };

  return (
    <div className='sign-up'>
      <h2 className='title'>I do not have an account</h2>
      <span>Sign up with your email or password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          label='Display name'
          value={displayName || ''}
          handleChange={handleChange}
          required
        />
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
        <FormInput
          type='password'
          name='confirmPassword'
          label='Confirm password'
          value={confirmPassword || ''}
          handleChange={handleChange}
          required
        />
        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<IEmailSignInPending>) => ({
  signUpPending: (userCredentials: ISignInInfo) => dispatch(signUpPending(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);
