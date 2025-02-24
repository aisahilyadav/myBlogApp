import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Blog App</h1>
      <p className="text-lg mb-4">Share your thoughts with the world!</p>
      <div className="space-x-4">
        <Link 
          to="/login" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </Link>
        <Link 
          to="/register" 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Register
        </Link>
      </div>
    </div>
  );
} 