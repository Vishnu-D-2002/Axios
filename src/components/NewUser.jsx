import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NewUser({ fetchUsers, initialUser, onEdit }) {
  const [userData, setUserData] = useState(initialUser || {
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
    },
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    phone: false,
    street: false,
    city: false,
  });

  useEffect(() => {
    if (initialUser) {
      setUserData(initialUser);
    }
  }, [initialUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'street' || name === 'city') {
      setUserData({
        ...userData,
        address: {
          ...userData.address,
          [name]: value,
        },
      });
    } else {
      setUserData({ ...userData, [name]: value });
    }

    // Clear error when the user starts typing in a field
    setFormErrors({ ...formErrors, [name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if required fields are empty
    const requiredFields = ['name', 'email', 'phone', 'street', 'city'];
    const hasErrors = requiredFields.some((field) => {
      if (field === 'street' || field === 'city') {
        return !userData.address[field];
      }
      return !userData[field];
    });

    if (hasErrors) {
      // Display error for required fields
      setFormErrors({
        ...formErrors,
        name: !userData.name,
        email: !userData.email,
        phone: !userData.phone,
        street: !userData.address.street,
        city: !userData.address.city,
      });
      return;
    }

    try {
      if (initialUser) {
        // Handle edit if an initialUser is provided
        await axios.put(`https://jsonplaceholder.typicode.com/users/${initialUser.id}`, userData);
        onEdit(null); // Clear the edit mode
      } else {
        // Handle add if no initialUser is provided
        await axios.post('https://jsonplaceholder.typicode.com/users/', userData);
      }
      fetchUsers(); // Fetch users again to reflect the changes
      setUserData({
        name: '',
        email: '',
        phone: '',
        address: {
          street: '',
          city: '',
        },
      });
    } catch (error) {
      console.error(`Error ${initialUser ? 'updating' : 'adding'} user`, error);
    }
  };

  return (
    <div>
      <h2>{initialUser ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
          {formErrors.name && <span className="text-danger">Name is required</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          {formErrors.email && <span className="text-danger">Email is required</span>}
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
          />
          {formErrors.phone && <span className="text-danger">Phone is required</span>}
        </div>
        <div>
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            name="street"
            value={userData.address.street}
            onChange={handleChange}
          />
          {formErrors.street && <span className="text-danger">Street is required</span>}
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={userData.address.city}
            onChange={handleChange}
          />
          {formErrors.city && <span className="text-danger">City is required</span>}
        </div>
        <button type="submit">
          {initialUser ? 'Update User' : 'Add User'}
        </button>
      </form>
    </div>
  );
}

export default NewUser;
