import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import './UserProfile.css';

const UserProfile = ({ numberOfFiles }) => {
  const { state, dispatch } = useContext(UserContext);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${state.user._id}`, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      dispatch({ type: 'LOGOUT' });
      // Redirect to the login page or show a message
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Add a safeguard to ensure user is defined
  if (!state.user) {
    return <p>Loading...</p>; // Or any other loading state you prefer
  }

  return (
    <div className="user-profile">
      <h2>{state.user.name}</h2>
      <div className="user-info">
        <p>{state.user.email}</p>
        <p>Number of Files: {numberOfFiles}</p>
        <button onClick={handleDelete}>Delete Account</button>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  numberOfFiles: PropTypes.number.isRequired,
};

export default UserProfile;
