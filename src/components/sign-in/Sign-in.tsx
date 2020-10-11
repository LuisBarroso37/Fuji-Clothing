import React from 'react';
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

interface ISignIn {
  email: string;
  password: string;
}

type ISignInProps = ReturnType<typeof mapDispatchToProps>;

class SignIn extends React.Component<ISignInProps, ISignIn> {
  constructor(props: ISignInProps) {
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

    const { emailSignInPending } = this.props;
    const { email, password } = this.state;

    emailSignInPending(email, password);
  };

  render() {
    const { googleSignInPending } = this.props;
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
              onClick={googleSignInPending}
            >
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

type IMapDispatchToProps = IGoogleSignInPending | IEmailSignInPending;

const mapDispatchToProps = (dispatch: Dispatch<IMapDispatchToProps>) => ({
  googleSignInPending: () => dispatch(googleSignInPending()),
  emailSignInPending: (email: string, password: string) =>
    dispatch(emailSignInPending({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
