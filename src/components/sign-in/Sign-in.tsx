import React from 'react';

import './Sign-in.scss';

import FormInput from '../form-input/Form-input';
import CustomButton from '../custom-button/Custom-button';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

interface ISignIn {
  email: string;
  password: string;
}

class SignIn extends React.Component<{}, ISignIn> {
  constructor(props: {}) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    this.setState({ [name]: value } as Pick<ISignIn, keyof ISignIn>);
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      if (email && password) {
        await auth.signInWithEmailAndPassword(email, password);

        this.setState({
          email: '',
          password: '',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='email'
            label='Email'
            value={this.state.email || ''}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            type='password'
            name='password'
            label='Password'
            value={this.state.password || ''}
            handleChange={this.handleChange}
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'>Sign in</CustomButton>
            <CustomButton
              type='button'
              isGoogleSignIn
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
