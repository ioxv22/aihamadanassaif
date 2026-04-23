'use client';

import { useState } from 'react';
import styles from './AuthSystem.module.css';
import { useAuth } from '@/context/AuthContext';

export default function AuthSystem() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { user, login, signup, loginWithGoogle, logout } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google login failed');
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
      {error && <div className={styles.error}>{error}</div>}
      
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

      <div className={styles.divider}>
        <span>OR</span>
      </div>

      <button onClick={handleGoogleLogin} className={styles.googleBtn}>
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
        Login with Google
      </button>

      <p className={styles.toggle} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </p>
      <p className={styles.hint}>Tip: Use 'admin@test.com' to see the Admin Dashboard.</p>
    </div>
  );
}
