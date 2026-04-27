'use client';

import styles from './RadarMap.module.css';

export default function RadarMap() {
  return (
    <div className={`${styles.radarContainer} glass animate-fade-in`}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <span className={styles.icon}>🛰️</span>
          <div>
            <h3>Live Global Air Traffic</h3>
            <p>Real-time aircraft positions and tracking</p>
          </div>
        </div>
      </div>
      <div className={styles.mapWrapper}>
        <iframe 
          src="https://www.flightradar24.com/simple_index.php?lat=25&lon=55&z=5" 
          width="100%" 
          height="100%"
          style={{ border: 'none', borderRadius: '0 0 20px 20px' }}
          title="Live Global Air Traffic"
        />
      </div>
    </div>
  );
}
