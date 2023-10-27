import React, { useState } from 'react';

function Read({ users, onUpdate, onDelete }) {
  const [editableUserId, setEditableUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});

  const handleEdit = (userId, user) => {
    setEditableUserId(userId);
    setEditedUserData(user);
  };

  const handleSave = (user) => {
    onUpdate(user);
    setEditableUserId(null);
    setEditedUserData({});
  };

  const isFieldEdited = (fieldName) => {
    return editedUserData[fieldName] !== undefined && editedUserData[fieldName] !== users.find(user => user.id === editedUserData.id)[fieldName];
  };

  return (
    <div>
      <h2 className='mt-3 mx-3'>User List</h2>
      <div className="row">
        {users.map((user) => (
          <div className="col-md-4 mb-3" key={user.id}>
            <div className="card mx-3 my-3" id='card'>
              <div className="card-body">
                <div>
                  {editableUserId === user.id ? (
                    <div>
                      <input
                        type="text"
                        value={editedUserData.name}
                        onChange={(e) => setEditedUserData({ ...editedUserData, name: e.target.value })}
                      />
                      <input
                        type="text"
                        value={editedUserData.email}
                        onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })}
                      />
                      <input
                        type="text"
                        value={editedUserData.phone}
                        onChange={(e) => setEditedUserData({ ...editedUserData, phone: e.target.value })}
                      />
                      <input
                        type="text"
                        value={editedUserData.address.city}
                        onChange={(e) => setEditedUserData({ ...editedUserData, address: { ...editedUserData.address, city: e.target.value } })}
                      />
                      <input
                        type="text"
                        value={editedUserData.address.street}
                        onChange={(e) => setEditedUserData({ ...editedUserData, address: { ...editedUserData.address, street: e.target.value } })}
                      />
                      {isFieldEdited('name') || isFieldEdited('email') || isFieldEdited('phone') || isFieldEdited('address') ? (
                        <button onClick={() => handleSave(editedUserData)}>Save</button>
                      ) : null}
                    </div>
                  ) : (
                    <div>
                      <h5 className="card-title">Name: {user.name}</h5>
                      <span className="card-text">Email: {user.email}</span><br />
                      <span className="card-text">Phone: {user.phone}</span>
                      {user.address && (
                        <div>
                          <strong>Address:</strong>
                          <br />
                          <span>Street: {user.address.street}</span>
                          <br />
                          <span>City: {user.address.city}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  {editableUserId === user.id ? (
                    <button className="btn btn-success mx-2" onClick={() => handleSave(editedUserData)}>Save</button>
                  ) : (
                    <button className="btn btn-success mx-3" onClick={() => handleEdit(user.id, user)}>Edit</button>
                  )}
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => onDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Read;
