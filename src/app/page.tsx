'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ChatAssistant from '@/components/ChatAssistant';
import ResultsView from '@/components/ResultsView';
import EthicsResearch from '@/components/EthicsResearch';
import FeedbackForm from '@/components/FeedbackForm';
import BudgetCalculator from '@/components/BudgetCalculator';
import styles from './page.module.css';

export default function Home() {
  const [results, setResults] = useState({ flights: [], hotels: [], packages: [] });

  return (
    <main className={styles.main}>
      <Navbar />
      
      <section className={styles.hero}>
        <h1 className="animate-fade-in">Smart Travel AI Assistant</h1>
        <p className="animate-fade-in">Helping students and families make better travel decisions with AI.</p>
        <div className={styles.creators}>Created by: Hamad, Saif, and Anas</div>
      </section>

      <div className={styles.contentWrapper}>
        <div className={styles.resultsSide}>
          <ResultsView results={results} />
          <BudgetCalculator />
        </div>
        <div className={styles.chatSide}>
          <ChatAssistant onSearch={setResults} />
        </div>
      </div>

      <div className="container">
        <EthicsResearch />
        <FeedbackForm />
        
        <footer className={styles.footer}>
          <p>© 2024 Smart Travel AI Assistant - Educational Project by Hamad, Saif, Anas</p>
          <div className={styles.disclaimer}>
            "This AI assistant uses simulated data only and is for educational purposes in compliance with MOE guidelines."
          </div>
        </footer>
      </div>
    </main>
  );
}
