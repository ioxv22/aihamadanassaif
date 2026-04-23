'use client';

import { useState } from 'react';
import styles from './FeedbackForm.module.css';

export default function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`${styles.container} glass flex-center`}>
        <h3>Thank you for your feedback! ❤️</h3>
      </div>
    );
  }

  return (
    <div className={`${styles.container} glass`}>
      <h2>Peer Feedback</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.group}>
          <label>Was the AI recommendation helpful?</label>
          <div className={styles.radioGroup}>
            <label><input type="radio" name="helpful" required /> Yes</label>
            <label><input type="radio" name="helpful" /> No</label>
          </div>
        </div>
        <div className={styles.group}>
          <label>Was the interface easy to understand?</label>
          <div className={styles.radioGroup}>
            <label><input type="radio" name="easy" required /> Yes</label>
            <label><input type="radio" name="easy" /> No</label>
          </div>
        </div>
        <div className={styles.group}>
          <label>Any other comments?</label>
          <textarea className={styles.textarea} placeholder="Share your thoughts..."></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit Feedback</button>
      </form>
    </div>
  );
}
