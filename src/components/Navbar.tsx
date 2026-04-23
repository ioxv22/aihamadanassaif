'use client';

import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <nav className={`${styles.navbar} glass`}>
      <div className={styles.logo}>
        <span className={styles.icon}>✈️</span>
        <span className={styles.name}>Smart Travel Platform</span>
      </div>
      <div className={styles.links}>
        {user ? (
          <div className={styles.userSection}>
            <span className={styles.userName}>{user.name}</span>
            <button onClick={logout} className={styles.navBtn}>Logout</button>
          </div>
        ) : (
          <span className={styles.projectInfo}>Hamad, Saif, Anas</span>
        )}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}
