import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import userService from '../services/userService';

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [bio, setBio] = useState(user.bio || '');
  const [isEditing, setIsEditing] = useState(false);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userService.getProfile(user.id);
        setFriends(response.data.friends);
      } catch (error) {
        toast.error('Failed to fetch profile data');
      }
    };
    fetchProfile();
  }, [user.id]);

  const handleUpdateBio = async () => {
    try {
      await userService.updateProfile({ bio });
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-4">{user.username}</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Bio</h2>
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2 border rounded"
                rows="4"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleUpdateBio}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="mb-2">{bio || 'No bio yet'}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit Bio
              </button>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Friends ({friends.length})</h2>
          <div className="grid grid-cols-2 gap-4">
            {friends.map((friend) => (
              <div key={friend._id} className="p-3 border rounded">
                <p className="font-semibold">{friend.username}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 