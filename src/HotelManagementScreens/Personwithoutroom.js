import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PersonList = () => {
  const [joinees, setJoinees] = useState([]);

  useEffect(() => {
    const fetchJoinees = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/persons/withoutRoom');
        setJoinees(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchJoinees();
  }, []);

  return (
    <div>
      <div>
      <h2>Joinee Details</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Aadhar Number</th>
            <th>Occupation</th>
          </tr>
        </thead>
        <tbody>
          {joinees.map((joinee) => (
            <tr key={joinee.id}>
              <td>{joinee.name}</td>
              <td>{joinee.phonenumber}</td>
              <td>{joinee.address}</td>
              <td>{joinee.aadharNumber}</td>
              <td>{joinee.occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </div>
  );
};

export default PersonList;