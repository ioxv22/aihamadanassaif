'use client';

import styles from './PresentationMode.module.css';

export default function PresentationMode() {
  return (
    <section className={styles.presentationSection}>
      <div className={styles.header}>
        <div className={styles.badge}>Exhibition Mode</div>
        <h2>Why our project is different?</h2>
        <p>A new paradigm in travel planning designed for students and families.</p>
      </div>

      <div className={styles.grid}>
        <div className={`${styles.card} glass`}>
          <div className={styles.icon}>🤖</div>
          <h3>AI-Powered Guidance</h3>
          <p>Not just another booking site. Our AI acts as a personal travel agent, guiding you step-by-step to build the perfect itinerary based on your precise needs.</p>
        </div>

        <div className={`${styles.card} glass`}>
          <div className={styles.icon}>👨‍👩‍👧‍👦</div>
          <h3>For Students & Families</h3>
          <p>We prioritize budget optimization, safety scoring, and accessibility features to ensure every trip is affordable and family-friendly.</p>
        </div>

        <div className={`${styles.card} glass`}>
          <div className={styles.icon}>🛰️</div>
          <h3>Live Flight Tracking</h3>
          <p>Real-time global air traffic integration provides instant insights into flight statuses and global connectivity right from your dashboard.</p>
        </div>

        <div className={`${styles.card} glass`}>
          <div className={styles.icon}>🎓</div>
          <h3>Educational Interface</h3>
          <p>Learn how AI works while using it. We promote transparency in AI processing, comparing traditional methods with modern machine learning.</p>
        </div>
      </div>
    </section>
  );
}
