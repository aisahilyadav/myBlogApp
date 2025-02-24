import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
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
        {status === 'loading' ? 'Loading...' : 'Login'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
