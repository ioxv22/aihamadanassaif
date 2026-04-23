'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ChatAssistant from '@/components/ChatAssistant';
import ResultsView from '@/components/ResultsView';
import EthicsResearch from '@/components/EthicsResearch';
import FeedbackForm from '@/components/FeedbackForm';
import BudgetCalculator from '@/components/BudgetCalculator';
import RadarMap from '@/components/RadarMap';
import AdminDashboard from '@/components/AdminDashboard';
import AuthSystem from '@/components/AuthSystem';
import styles from './page.module.css';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const [results, setResults] = useState({ flights: [], hotels: [], packages: [] });
  const { user, isAdmin } = useAuth();

  return (
    <main className={styles.main}>
      <Navbar />
      
      {!user ? (
        <section className={styles.authHero}>
          <div className={styles.heroContent}>
            <h1>The World is Yours to Explore</h1>
            <p>Smart Travel Intelligence powered by AI. Real-time tracking, personalized bookings, and expert advice.</p>
          </div>
          <AuthSystem />
        </section>
      ) : (
        <>
          <section className={styles.hero}>
            <h1>Smart Travel AI Assistant</h1>
            <p>Helping students and families make better travel decisions with AI.</p>
            <div className={styles.creators}>Hamad, Saif, Anas</div>
          </section>

          <div className={styles.contentWrapper}>
            <div className={styles.resultsSide}>
              <ResultsView results={results} />
              <RadarMap />
              <BudgetCalculator />
              <AdminDashboard />
            </div>
            <div className={styles.chatSide}>
              <ChatAssistant onSearch={setResults} />
            </div>
          </div>
        </>
      )}

      <div className="container">
        <EthicsResearch />
        <FeedbackForm />
        
        <footer className={styles.footer}>
          <p>© 2026 Smart Travel AI Platform - Educational Project by Hamad, Saif, Anas</p>
          <div className={styles.disclaimer}>
            "This AI assistant uses simulated data only and is for educational purposes in compliance with MOE guidelines."
          </div>
        </footer>
      </div>
    </main>
  );
}
