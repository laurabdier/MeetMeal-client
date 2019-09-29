import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../../stylesheets/userProfile.css';

const getUserProfile = (( setProfiles, props) => {
  const header = {
    'x-auth-token': localStorage.getItem('token')
  }
  console.log(header);
  axios.get('http://localhost:1509/users/my-profile',
    { headers: header},
    console.log('je commence axios')
  ).then(res => {
    console.log('je suis dans le then');
    setProfiles(res.data)
    console.log(res.data);
  }).catch(err => {
    //alert('Nous sommes désolés, nous faisons face à un problème de serveur')
    props.history.push('/')
  })
});

const UserProfile = (props, history) => {
  let [profiles, setProfiles] = useState([])
  console.log('let profile : ');
  console.log(profiles);
    if (profiles.length === 0){
      getUserProfile(setProfiles, history, props)
      console.log('let profile après if : ');
      console.log(profiles.avatar);
    }

  return (
    <div className='container user-profile'>
      <div className='row'>
          <div className='col-lg-3 user-info-intro'>
            <img className='img-fluid' src={profiles.avatar} alt='user profile avatar'></img>
          </div>
          <div className='row'>
            <div className='col-lg-6 user-info-intro'>
              <h1 className='user-name'> {profiles.firstname} {profiles.lastname}</h1>
            </div>
            <div className='col-lg-3 info-profile' id='info-profile'>
              <div className='user-name'><p> Situation amoureuse :  {profiles.loveStatus}</p></div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-8 user-info-intro'>
              <p className='user-info'> {profiles.city} {profiles.zipCode}</p>
            </div>
          </div>
      </div>
      <div className='row'>
        <div className='col-lg-12 user-info-bio'>
          <p className='user-bio'> {profiles.bio}</p>
        </div>
      </div>
      <Link to ='/edituser' className='btn btn-warning'>
        Modifier Votre Profile
      </Link>
    </div>
  );
}

export default UserProfile;
