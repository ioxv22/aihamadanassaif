'use client';

import { useState } from 'react';
import styles from './AuthSystem.module.css';
import { useAuth } from '@/context/AuthContext';

export default function AuthSystem() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { user, login, signup, logout } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
  };

  if (user) {
    return (
      <div className={styles.userInfo}>
        <span>Welcome, <strong>{user.name}</strong></span>
        <button onClick={logout} className={styles.logoutBtn}>Logout</button>
      </div>
    );
  }

  return (
    <div className={`${styles.container} glass`}>
      <h3>{isLogin ? 'Login' : 'Sign Up'}</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        {!isLogin && (
          <input 
            type="text" 
            placeholder="Full Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        )}
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" className="btn btn-primary">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <p className={styles.toggle} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </p>
      <p className={styles.hint}>Tip: Use 'admin@test.com' to see the Admin Dashboard.</p>
    </div>
  );
}
