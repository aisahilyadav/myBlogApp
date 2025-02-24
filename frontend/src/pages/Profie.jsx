import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import userService from '../services/userService';

function Profile() {
  const [profile, setProfile] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await userService.getProfile(user.id);
      setProfile(data);
    };
    fetchProfile();
  }, [user.id]);

  return (
    <div>
      <h1>{profile?.username}</h1>
      <p>{profile?.bio}</p>
      {/* Add edit profile form */}
    </div>
  );
}