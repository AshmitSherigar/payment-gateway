import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, phone_number: phoneNumber, dob }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Registration failed');

      localStorage.setItem('bank_auth_token', data.token);
      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Open a New Account</h2>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleRegister}>
        <div>
          <label>Username: </label>
          <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <br />
        <div>
          <label>Password: </label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <br />
        <div>
          <label>Phone Number: </label>
          <input type="tel" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <br />
        <div>
          <label>Date of Birth: </label>
          <input type="date" required value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>
        <br />
        <button type="submit">Create Account</button>
      </form>

      <p>Already have an account? <Link to="/login">Sign in</Link></p>
    </div>
  );
}