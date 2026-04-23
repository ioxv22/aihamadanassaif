'use client';

import { useState } from 'react';
import styles from './BudgetCalculator.module.css';

export default function BudgetCalculator() {
  const [budget, setBudget] = useState<number>(0);
  const [spent, setSpent] = useState<number>(0);

  const remaining = budget - spent;

  return (
    <div className={`${styles.container} glass`}>
      <h3>Student Budget Calculator</h3>
      <div className={styles.inputs}>
        <div className={styles.field}>
          <label>Total Travel Budget (AED)</label>
          <input 
            type="number" 
            value={budget} 
            onChange={(e) => setBudget(Number(e.target.value))} 
            placeholder="e.g. 5000"
          />
        </div>
        <div className={styles.field}>
          <label>Estimated Expenses (AED)</label>
          <input 
            type="number" 
            value={spent} 
            onChange={(e) => setSpent(Number(e.target.value))} 
            placeholder="e.g. 3000"
          />
        </div>
      </div>
      <div className={styles.result}>
        <div className={styles.remaining}>
          <span>Remaining:</span>
          <span className={remaining < 0 ? styles.negative : styles.positive}>
            {remaining} AED
          </span>
        </div>
        <p className={styles.advice}>
          {remaining > 1000 ? "✅ Great job! You have extra for activities." : 
           remaining >= 0 ? "⚠️ You are on track, but spend carefully." : 
           "❌ Over budget! Try looking for a cheaper flight or hotel."}
        </p>
      </div>
    </div>
  );
}
