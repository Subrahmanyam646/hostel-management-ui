import React, { useState } from 'react';
import axios from 'axios';

const AddJoineeForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [occupation, setOccupation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form fields here if needed

    // Prepare data object
    const newData = {
      name,
      phonenumber: phoneNumber,
      address,
      aadharNumber,
      occupation
    };
    const options = {
      url: 'http://localhost:8080/api/persons',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: newData
    }
 
     try {
       const response = await axios(options)
       console.log(response.data);
     } catch (error) {
       console.error('Error:', error);
       setError('Error adding new joinee '+error.message)
     }

    // Reset form fields
    // setName('');
    // setPhoneNumber('');
    // setAddress('');
    // setAadharNumber('');
    // setOccupation('');
  };

  return (
    <div>
      <h2>Add New Joinee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="aadharNumber">Aadhar Number:</label>
          <input
            type="text"
            id="aadharNumber"
            value={aadharNumber}
            onChange={(e) => setAadharNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="occupation">Occupation:</label>
          <input
            type="text"
            id="occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Joinee</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
};

export default AddJoineeForm;
