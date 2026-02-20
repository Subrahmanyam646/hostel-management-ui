import { useMemo, useState } from 'react';
import { endpoints, searchRoomsAdvanced } from '../api';

const defaultFilters = {
  floor: 'all',
  roomType: 'all',
  paymentStatus: 'all',
  minAvailableBeds: 0,
  maxRent: 10000,
  genderWing: 'all',
};

export default function AdvancedSearchPage({ rooms }) {
  const [filters, setFilters] = useState(defaultFilters);
  const [requestPreview, setRequestPreview] = useState(null);

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const availableBeds = room.capacity - room.occupied;

      return (
        (filters.floor === 'all' || room.floor === Number(filters.floor)) &&
        (filters.roomType === 'all' || room.roomType === filters.roomType) &&
        (filters.paymentStatus === 'all' || room.paymentStatus === filters.paymentStatus) &&
        (filters.genderWing === 'all' || room.genderWing === filters.genderWing) &&
        availableBeds >= Number(filters.minAvailableBeds) &&
        room.monthlyRentPerBed <= Number(filters.maxRent)
      );
    });
  }, [filters, rooms]);

  const uniqueValues = useMemo(() => {
    const floors = [...new Set(rooms.map((room) => room.floor))];
    const roomTypes = [...new Set(rooms.map((room) => room.roomType))];
    const paymentStatuses = [...new Set(rooms.map((room) => room.paymentStatus))];
    const genderWings = [...new Set(rooms.map((room) => room.genderWing))];

    return { floors, roomTypes, paymentStatuses, genderWings };
  }, [rooms]);

  const updateFilter = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const submitSearch = async () => {
    const response = await searchRoomsAdvanced(filters);
    setRequestPreview(response);
  };

  return (
    <section className="page-grid">
      <header>
        <h2>Advanced Room Search</h2>
        <p>Filter by floor, room type, payment status, rent ceiling, available beds, and wing.</p>
      </header>

      <div className="panel filter-grid">
        <label>
          Floor
          <select value={filters.floor} onChange={(e) => updateFilter('floor', e.target.value)}>
            <option value="all">All Floors</option>
            {uniqueValues.floors.map((floor) => (
              <option key={floor} value={floor}>
                Floor {floor}
              </option>
            ))}
          </select>
        </label>

        <label>
          Room Type
          <select value={filters.roomType} onChange={(e) => updateFilter('roomType', e.target.value)}>
            <option value="all">All Types</option>
            {uniqueValues.roomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label>
          Payment Status
          <select value={filters.paymentStatus} onChange={(e) => updateFilter('paymentStatus', e.target.value)}>
            <option value="all">Any</option>
            {uniqueValues.paymentStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label>
          Gender Wing
          <select value={filters.genderWing} onChange={(e) => updateFilter('genderWing', e.target.value)}>
            <option value="all">All Wings</option>
            {uniqueValues.genderWings.map((wing) => (
              <option key={wing} value={wing}>
                {wing}
              </option>
            ))}
          </select>
        </label>

        <label>
          Minimum Available Beds
          <input
            type="number"
            min="0"
            max="12"
            value={filters.minAvailableBeds}
            onChange={(e) => updateFilter('minAvailableBeds', e.target.value)}
          />
        </label>

        <label>
          Maximum Rent per Bed
          <input
            type="number"
            min="3000"
            max="15000"
            step="100"
            value={filters.maxRent}
            onChange={(e) => updateFilter('maxRent', e.target.value)}
          />
        </label>

        <button type="button" onClick={submitSearch}>
          Capture Search Payload
        </button>
      </div>

      <div className="panel endpoint-box">
        <h3>Search Endpoint Contract</h3>
        <p>
          <strong>POST</strong> {endpoints.advancedRoomSearch}
        </p>
        <pre>{JSON.stringify(filters, null, 2)}</pre>
      </div>

      {requestPreview ? (
        <div className="panel success-box">
          <h3>Captured Request Preview</h3>
          <pre>{JSON.stringify(requestPreview, null, 2)}</pre>
        </div>
      ) : null}

      <div className="panel">
        <h3>Search Results ({filteredRooms.length})</h3>
        <table>
          <thead>
            <tr>
              <th>Room</th>
              <th>Floor</th>
              <th>Type</th>
              <th>Available Beds</th>
              <th>Rent / Bed</th>
              <th>Wing</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map((room) => (
              <tr key={room.id}>
                <td>{room.roomNumber}</td>
                <td>{room.floor}</td>
                <td>{room.roomType}</td>
                <td>{room.capacity - room.occupied}</td>
                <td>₹{room.monthlyRentPerBed}</td>
                <td>{room.genderWing}</td>
                <td>{room.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
