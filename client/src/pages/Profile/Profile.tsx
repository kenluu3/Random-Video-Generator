import React from 'react';
import { Navigation, ProfileForm } from '../../components';
import '../../styles/base-page.scss';

const Profile = () => {
  return (
    <Navigation>
      <div className='main-container'>
        <ProfileForm />
      </div>
    </Navigation>
  )
}

export { Profile };