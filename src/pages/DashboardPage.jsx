import { useMemo } from 'react';
import MetricsCard from '../components/MetricsCard';

export default function DashboardPage({ summary, rooms, monthlyPayments }) {
  const roomOccupancy = useMemo(() => {
    if (!rooms.length) {
      return [];
    }

    return rooms.map((room) => ({
      ...room,
      availableBeds: room.capacity - room.occupied,
      occupancyRate: `${Math.round((room.occupied / room.capacity) * 100)}%`,
    }));
  }, [rooms]);

  return (
    <section className="page-grid">
      <header>
        <h2>Hostel Operations Dashboard</h2>
        <p>Track occupancy, available bed count, and monthly payment health at a glance.</p>
      </header>

      <div className="metrics-grid">
        <MetricsCard title="Total Floors" value={summary.totalFloors} />
        <MetricsCard title="Total Rooms" value={summary.totalRooms} accent="green" />
        <MetricsCard title="Available Beds" value={summary.availableBeds} accent="purple" />
        <MetricsCard
          title="Monthly Collection"
          value={`₹${summary.currentMonthCollection.toLocaleString('en-IN')}`}
          subtitle={`Pending ₹${summary.pendingAmount.toLocaleString('en-IN')}`}
          accent="orange"
        />
      </div>

      <div className="panel">
        <h3>Room Availability and Bed Count</h3>
        <table>
          <thead>
            <tr>
              <th>Room</th>
              <th>Floor</th>
              <th>Capacity</th>
              <th>Occupied</th>
              <th>Available</th>
              <th>Occupancy</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {roomOccupancy.map((room) => (
              <tr key={room.id}>
                <td>{room.roomNumber}</td>
                <td>{room.floor}</td>
                <td>{room.capacity}</td>
                <td>{room.occupied}</td>
                <td>{room.availableBeds}</td>
                <td>{room.occupancyRate}</td>
                <td>
                  <span className={`status-pill status-${room.paymentStatus.toLowerCase()}`}>
                    {room.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="panel">
        <h3>Monthly Payment Status</h3>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Paid</th>
              <th>Partial</th>
              <th>Pending</th>
              <th>Collection</th>
            </tr>
          </thead>
          <tbody>
            {monthlyPayments.map((item) => (
              <tr key={item.month}>
                <td>{item.month}</td>
                <td>{item.paidTenants}</td>
                <td>{item.partialTenants}</td>
                <td>{item.pendingTenants}</td>
                <td>₹{item.collection.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
