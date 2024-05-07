import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  function auth() {
    if (username === 'admin' && password === 'admin' && role === 'admin') {
      navigate('/AdminRoute');
    } else if (username === 'parent' && password === 'parent' && role === 'parent') {
      navigate('/ParentRoute');
    } else if (username === 'student' && password === 'student' && role === 'student') {
      navigate('/StudentRoute');
    } else {
      // Redirect to a specific route for incorrect credentials
      navigate('/login'); // Assuming you have a login route
    }
  }

  return (
    <div>
      <label>Choose Role</label>
      <br />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Choose Role</option>
        <option value="admin">ADMIN</option>
        <option value="parent">PARENT</option>
        <option value="student">STUDENT</option>
      </select>
      <br />
      <input
        type="text"
        value={username}
        required
        placeholder='username'
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        value={password}
        required
        placeholder='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={auth}>Submit</button>
    </div>
  );
}

export default App;
