import React, { useState, useContext } from 'react';
import UserContext from './UserContext';
import UserContext from './UserContext';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const DeleteAccount = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleDelete = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
        if (confirmDelete) {
            localStorage.removeItem('userSession');
            setUser({ name: '', isLoggedIn: false });
            navigate('/home');
        }
    };

    return(
        <div>
            <h2>Delete Account</h2>
            <p>If you would like to delete your account, press the button below.</p>
            <p>Warning: This action cannot be undone!</p>
            <Button variant='danger' onClick={handleDelete}>Delete Account</Button>
        </div>
    )
};

export default DeleteAccount;