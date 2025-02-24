import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.username}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link 
              to="/explore" 
              className="block w-full p-2 text-center bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Discover Users
            </Link>
            <Link 
              to="/profile" 
              className="block w-full p-2 text-center bg-green-500 text-white rounded hover:bg-green-600"
            >
              View Profile
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Stats</h2>
          <div className="space-y-2">
            <p>Friends: {user.friends?.length || 0}</p>
            <p>Pending Requests: {user.friendRequests?.length || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 