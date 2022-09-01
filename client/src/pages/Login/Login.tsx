import React from 'react';
import { LoginForm } from '../../components';
import '../../styles/base-page.scss';

const Login = () => {
  return (
    <div className='page-container'>
      <LoginForm />
    </div>
  )
}

export { Login };