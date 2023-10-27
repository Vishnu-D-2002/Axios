import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Read from './components/Read';
import NewUser from './components/NewUser';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(response.data);
    } catch (error) {
      console.log('Error in fetching data:', error);
    }
  }

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user', error);
    }
  }

  const updateUser = async (updatedUser) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user', error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Router>
      <div className='mt-4'>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; 
        <Link to='/' style={{ padding: 10 }}>Dashboard</Link>
        <Link to='/NewUser' style={{ padding: 10 }}>New User</Link>
      </div>
      <Routes>
        <Route path='/' element={<Read users={users} onEdit={setEditingUser} onDelete={deleteUser} onUpdate={updateUser} />} />
        <Route
          path='/NewUser'
          element={<NewUser fetchUsers={fetchUsers} initialUser={editingUser} onEdit={setEditingUser} onUpdate={updateUser} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
