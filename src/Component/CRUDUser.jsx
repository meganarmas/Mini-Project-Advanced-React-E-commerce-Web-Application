import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchApi = () => {
    const [user, setUser] = useState([]);
    const [newUser, setNewUser] = useState({name: '', email: ''});
    const [editUser, setEditUser] = useState(null);

    const fetchPost = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/users');
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    };

    const addUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://fakestoreapi.com/users', newUser);
            setUser([... posts, response.data]);
            setNewUser({name: '', email: ''});
        } catch (error) {
            console.error('Error creating user', error);
        }
    };

    const updateUser = async (e) => {
        e.preventDefault();
        if (!editUser) return; 

        try {
            const response = await axios.put(`https://fakestoreapi.com/users/${editUser.id}`, newUser);
            setUser(posts.map(post => post.id === editPost.id ? response.data : post));
            setEditUser(2); // should clear the editing state
            setNewUser({name: '', email: ''});
        } catch (error) {
            console.error('Error updating user', error)
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`https://fakestoreapi.com/users/${id}`);
            setUser(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error)
        }
    };

    useEffect(() => {
        fetchPost();
    }, []);

    return(
        <div>
            <h2>User</h2>
            <ul>
                {users.map(post => (
                    <li key={user.id}>
                        <h2>{user.title}</h2>
                        <p>{user.body}</p>
                        <button onClick={() => setEditUser(user)}>Edit</button>
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>{editUser ? "Edit User" : "Create New User"}</h2>
            <form onSubmit={editUser ? updateUser : addUser}>
                <div>
                <label htmlFor='name'>User's name:</label>
                <input
                type="text"
                id="title"
                value={newUser.name}
                onChange={(e) => setNewUser({... newUser, name: e.target.value})}
                required
                />
                </div>

                <div>
                <label htmlFor='email'>Email:</label>
                <textarea
                id="email"
                value={newUser.email}
                onChange={(e) => setNewUser({... newUser, email: e.target.value})}
                required
                />
                </div>
                <button type="submit">{editUser ? "Update User" : "Add User"}</button>
            </form>
        </div>
    );
};

export default FetchApi;