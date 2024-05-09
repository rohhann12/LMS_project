import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminRoute from './components/admin/RouteAdmin';
import ParentRoute from './components/parent/sorted/RouteP';
import StudentRoute from './components/student/sorted/Routes';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [role1, setRole1] = useState(false);
  const [role2, setRole2] = useState(false);
  const [role3, setRole3] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forForm,setforForm]=useState(true)

  function auth(e) {
    // e.preventDefault()
    try {
      if (username === 'admin' && password === 'admin' && role === 'admin') {
        setRole1(true);
        setforForm(false); // <-- Update forForm here
      } else if (username === 'parent' && password === 'parent' && role === 'parent') {
        setRole2(true);
        setforForm(false); // <-- Update forForm here
      } else if (username === 'student' && password === 'student' && role === 'student') {
        setRole3(true);
        setforForm(false); // <-- Update forForm here
      } else {
        setErrorMessage('Incorrect credentials');
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div>
      {forForm && (
        <div className='Form' >
          <h1>Welcome To LMS</h1>
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
          type="text"
          value={password}
          required
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={() => auth(username, password, role)}>Submit</button>
        {errorMessage && <p>{errorMessage}</p>}
        </div>
      )}
      {role1 && (
        <div>
          <AdminRoute />
        </div>
      )}
      {role2 && (
        <div>
          <ParentRoute />
        </div>
      )}
      {role3 && (
        <div>
          <StudentRoute />
        </div>
      )}
    </div>
  );
}  
export default App;
