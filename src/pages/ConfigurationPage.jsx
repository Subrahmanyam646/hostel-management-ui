import { useState } from 'react';
import { configureFloorsAndRooms, endpoints } from '../api';

const initialRoom = {
  floor: 1,
  roomNumber: '',
  capacity: 2,
  roomType: 'Standard',
};

export default function ConfigurationPage() {
  const [formData, setFormData] = useState(initialRoom);
  const [submittedPayload, setSubmittedPayload] = useState(null);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      floorNumber: Number(formData.floor),
      roomNumber: formData.roomNumber,
      maxPersons: Number(formData.capacity),
      roomType: formData.roomType,
    };

    const response = await configureFloorsAndRooms(payload);
    setSubmittedPayload(response);
    setFormData(initialRoom);
  };

  return (
    <section className="page-grid">
      <header>
        <h2>Floor and Room Configuration</h2>
        <p>Create rooms with max occupancy settings. Connect this directly to your backend endpoint.</p>
      </header>

      <form className="panel form-grid" onSubmit={handleSubmit}>
        <label>
          Floor Number
          <input
            type="number"
            min="1"
            value={formData.floor}
            onChange={(e) => updateField('floor', e.target.value)}
            required
          />
        </label>

        <label>
          Room Number
          <input
            type="text"
            value={formData.roomNumber}
            placeholder="e.g. 306"
            onChange={(e) => updateField('roomNumber', e.target.value)}
            required
          />
        </label>

        <label>
          Max Persons per Room
          <input
            type="number"
            min="1"
            max="12"
            value={formData.capacity}
            onChange={(e) => updateField('capacity', e.target.value)}
            required
          />
        </label>

        <label>
          Room Type
          <select value={formData.roomType} onChange={(e) => updateField('roomType', e.target.value)}>
            <option>Standard</option>
            <option>Deluxe</option>
            <option>Dorm</option>
            <option>Suite</option>
          </select>
        </label>

        <button type="submit">Save Configuration</button>
      </form>

      <div className="panel endpoint-box">
        <h3>Backend Contract</h3>
        <p>
          <strong>POST</strong> {endpoints.floors}
        </p>
        <pre>{`{
  "floorNumber": 3,
  "roomNumber": "306",
  "maxPersons": 4,
  "roomType": "Standard"
}`}</pre>
      </div>

      {submittedPayload ? (
        <div className="panel success-box">
          <h3>Captured Payload Preview</h3>
          <pre>{JSON.stringify(submittedPayload, null, 2)}</pre>
        </div>
      ) : null}
    </section>
  );
}
