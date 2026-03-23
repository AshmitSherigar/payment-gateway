import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
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
          <label>Full Name: </label>
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <br />
        <div>
          <label>Email: </label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <br />
        <div>
          <label>Password: </label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <br />
        <button type="submit">Create Account</button>
      </form>

      <p>Already have an account? <Link to="/login">Sign in</Link></p>
    </div>
  );
}