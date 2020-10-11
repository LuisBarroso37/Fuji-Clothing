import React from 'react';
import { connect } from 'react-redux';

import './Sign-up.scss';

import FormInput from '../form-input/Form-input';
import CustomButton from '../custom-button/Custom-button';
import { IEmailSignInPending, ISignInInfo, signUpPending } from '../../redux/user/user.actions';
import { Dispatch } from 'redux';

interface ISignUpState {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type ISignUpProps = ReturnType<typeof mapDispatchToProps>;

class SignUp extends React.Component<ISignUpProps, ISignUpState> {
  constructor(props: ISignUpProps) {
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
    this.setState({ [name]: value } as Pick<ISignUpState, keyof ISignUpState>);
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { signUpPending } = this.props;
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    signUpPending({ displayName, email, password });
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

const mapDispatchToProps = (dispatch: Dispatch<IEmailSignInPending>) => ({
  signUpPending: (userCredentials: ISignInInfo) => dispatch(signUpPending(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);
