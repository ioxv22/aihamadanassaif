'use client';

import { useState, useEffect } from 'react';
import styles from './AdminDashboard.module.css';
import { useAuth } from '@/context/AuthContext';

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const [stats, setStats] = useState({
    totalBookings: 154,
    revenue: 450000,
    topDestination: 'London',
    activeUsers: 1205
  });

  if (!isAdmin) return null;

  return (
    <div className={`${styles.container} glass`}>
      <div className={styles.header}>
        <h2>Admin Dashboard</h2>
        <p>System Overview & Analytics</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.label}>Total Bookings</span>
          <span className={styles.value}>{stats.totalBookings}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.label}>Revenue (Simulated)</span>
          <span className={styles.value}>{stats.revenue.toLocaleString()} AED</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.label}>Top Destination</span>
          <span className={styles.value}>{stats.topDestination}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.label}>Active Users</span>
          <span className={styles.value}>{stats.activeUsers}</span>
        </div>
      </div>

      <div className={styles.management}>
        <h3>Inventory Management</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Item</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>F001</td>
              <td>DXB -> LHR</td>
              <td>Flight</td>
              <td><span className={styles.active}>Active</span></td>
              <td><button className={styles.editBtn}>Edit</button></td>
            </tr>
            <tr>
              <td>H005</td>
              <td>Grand Oasis</td>
              <td>Hotel</td>
              <td><span className={styles.active}>Active</span></td>
              <td><button className={styles.editBtn}>Edit</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
