import { useEffect, useState } from 'react';
import userService from '../services/userService';

export default function Explore() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await userService.discoverUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Discover Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user._id} className="p-4 border rounded shadow">
            <h3 className="font-semibold">{user.username}</h3>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add Friend
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}