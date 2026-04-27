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
import PresentationMode from '@/components/PresentationMode';
import styles from './page.module.css';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const [results, setResults] = useState({ flights: [], hotels: [], packages: [] });
  const { user, isAdmin } = useAuth();

  const scrollToChat = () => {
    document.getElementById('chat-assistant')?.scrollIntoView({ behavior: 'smooth' });
  };

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
            <div className={styles.creators}>Created by: Hamad, Saif, Anas</div>
            <h1>Smart Travel AI Assistant</h1>
            <p>Helping students and families make better travel decisions with AI. Personalized, safe, and budget-optimized.</p>
            <button onClick={scrollToChat} className="btn btn-primary" style={{ marginTop: '1rem', padding: '1rem 2.5rem', fontSize: '1.2rem', borderRadius: '30px' }}>
              ✨ Plan My Trip
            </button>
          </section>

          <div className={styles.contentWrapper}>
            <div className={styles.resultsSide}>
              <ResultsView results={results} />
              <RadarMap />
              <BudgetCalculator />
              {isAdmin && <AdminDashboard />}
            </div>
            <div className={styles.chatSide} id="chat-assistant">
              <ChatAssistant onSearch={setResults} />
            </div>
          </div>
        </>
      )}

      <div className="container">
        {user && <PresentationMode />}
        <EthicsResearch />
        <FeedbackForm />
        
        <footer className={styles.footer}>
          <p>© 2026 Smart Travel AI Platform - Educational Project</p>
          <div className={styles.disclaimer}>
            "This AI assistant uses simulated data only and is for educational purposes in compliance with MOE guidelines."
          </div>
        </footer>
      </div>
    </main>
  );
}
