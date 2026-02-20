import { useEffect, useState } from 'react';
import { hmsService } from '@/services/hms.service';
import { Room } from '@/types';

export const HostelsPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    hmsService.getRooms().then(setRooms);
  }, []);

  const grouped = rooms.reduce<Record<string, Room[]>>((acc, room) => {
    if (!acc[room.hostelName]) acc[room.hostelName] = [];
    acc[room.hostelName].push(room);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Hostel & Room Management</h2>
      {Object.entries(grouped).map(([hostel, hostelRooms]) => (
        <div key={hostel} className="panel">
          <h3 className="mb-3 text-lg font-semibold">{hostel}</h3>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {hostelRooms.map((room) => {
              const available = room.capacity - room.occupiedBeds;
              return (
                <div key={room.id} className="rounded border border-slate-200 p-3 dark:border-slate-800">
                  <p className="font-medium">Floor {room.floor} • Room {room.roomNumber}</p>
                  <p className="text-sm">Beds: {room.occupiedBeds}/{room.capacity}</p>
                  <p className="text-sm">Available: {available}</p>
                  <p className="text-sm">Status: {room.status}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div className="panel">
        <h3 className="font-semibold">Create / Edit Room (API example)</h3>
        <pre className="mt-2 overflow-x-auto rounded bg-slate-900 p-3 text-xs text-slate-100">{`POST /rooms\n{ "hostelName": "A Block", "floor": 2, "roomNumber": "204", "capacity": 4 }`}</pre>
      </div>
    </div>
  );
};
