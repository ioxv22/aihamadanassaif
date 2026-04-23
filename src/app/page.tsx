'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ChatAssistant from '@/components/ChatAssistant';
import ResultsView from '@/components/ResultsView';
import EthicsResearch from '@/components/EthicsResearch';
import FeedbackForm from '@/components/FeedbackForm';
import styles from './page.module.css';

export default function Home() {
  const [results, setResults] = useState({ flights: [], hotels: [] });

  return (
    <main className={styles.main}>
      <Navbar />
      
      <section className={styles.hero}>
        <h1 className="animate-fade-in">Plan Your Next Adventure with AI</h1>
        <p className="animate-fade-in">Designed for students and families to make travel simpler and smarter.</p>
      </section>

      <div className={styles.contentWrapper}>
        <div className={styles.resultsSide}>
          <ResultsView results={results} />
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
          <p className={styles.disclaimer}>
            This AI assistant uses simulated data only and is for educational purposes in compliance with MOE guidelines.
          </p>
        </footer>
      </div>
    </main>
  );
}
