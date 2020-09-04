import React from 'react';

import './Sign-up.scss';

import FormInput from '../form-input/Form-input';
import CustomButton from '../custom-button/Custom-button';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

interface ISignUp {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

class SignUp extends React.Component<{}, ISignUp> {
  constructor(props: {}) {
    super(props);
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<ISignUp, keyof ISignUp>);
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      if (email && password) {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
        );

        await createUserProfileDocument(user, { displayName });

        this.setState({
          displayName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have an account</h2>
        <span>Sign up with your email or password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            label='Display name'
            value={displayName || ''}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            type='text'
            name='email'
            label='Email'
            value={email || ''}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            type='password'
            name='password'
            label='Password'
            value={password || ''}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            label='Confirm password'
            value={confirmPassword || ''}
            handleChange={this.handleChange}
            required
          />
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
