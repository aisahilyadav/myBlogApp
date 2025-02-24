import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/auth/authSlice';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <input
        type="text"
        placeholder="Username"
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button 
        disabled={status === 'loading'}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {status === 'loading' ? 'Loading...' : 'Register'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
} 