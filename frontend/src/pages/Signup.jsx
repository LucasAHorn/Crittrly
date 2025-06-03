import { useState } from 'react';

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'adopter',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Signing up:', form);
    // Connect to backend API later
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-2">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-2">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-2">
          <label>Role</label>
          <select
            className="form-control"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="adopter">Adopter</option>
            <option value="shelter">Shelter/Original Owner</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success mt-3">Create Account</button>
      </form>
    </div>
  );
}