'use client';

import { useTheme } from '@/context/ThemeContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`${styles.navbar} glass`}>
      <div className={styles.logo}>
        <span className={styles.icon}>✈️</span>
        <span className={styles.name}>Smart Travel AI</span>
      </div>
      <div className={styles.links}>
        <span className={styles.projectInfo}>By Hamad, Saif, Anas</span>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}
