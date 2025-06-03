import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Logging in:', { email, password });
    // We’ll connect this to the backend later
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group my-2">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Login</button>
      </form>
    </div>
  );
}