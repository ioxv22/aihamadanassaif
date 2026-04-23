'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './ChatAssistant.module.css';
import mockData from '@/data/mockData.json';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

export default function ChatAssistant({ onSearch }: { onSearch: (results: any) => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Welcome! I am the Smart Travel AI. How can I assist you with your flights or hotels today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const isRelevant = (text: string) => {
    const travelKeywords = ['flight', 'hotel', 'travel', 'trip', 'booking', 'price', 'dubai', 'london', 'baggage', 'student', 'emirates', 'etihad', 'flydubai', 'stay', 'destination', 'طيران', 'فندق', 'سفر', 'حجز', 'سعر', 'دبي', 'لندن', 'حقيبة'];
    return travelKeywords.some(kw => text.toLowerCase().includes(kw));
  };

  const fetchAIResponse = async (userText: string) => {
    setIsTyping(true);

    // 1. Check Relevance
    if (!isRelevant(userText)) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: Date.now(), 
          text: "I am specifically designed to help with travel and airline bookings. Please ask me about flights, hotels, or travel tips!", 
          sender: 'ai' 
        }]);
        setIsTyping(false);
      }, 500);
      return;
    }

    // 2. Perform Local Search for Data Visualization
    const lower = userText.toLowerCase();
    let results: any = { flights: [], hotels: [] };
    if (lower.includes('flight') || lower.includes('طيران')) {
      results.flights = mockData.flights;
    } else if (lower.includes('hotel') || lower.includes('فندق')) {
      results.hotels = mockData.hotels;
    }
    onSearch(results);

    // 3. Call External AI API
    try {
      // Using the user provided endpoint
      const response = await fetch(`http://de3.bot-hosting.net:21007/kilwa-chat?text=${encodeURIComponent(userText)}`);
      if (!response.ok) throw new Error('API Error');
      
      const data = await response.text(); // Assuming it returns plain text or we need to parse JSON
      let aiText = data;
      
      // Attempt to parse if it's JSON
      try {
        const jsonData = JSON.parse(data);
        aiText = jsonData.response || jsonData.text || data;
      } catch (e) {
        // Not JSON, use as is
      }

      setMessages(prev => [...prev, { id: Date.now(), text: aiText, sender: 'ai' }]);
    } catch (error) {
      console.error("AI Fetch Error:", error);
      setMessages(prev => [...prev, { id: Date.now(), text: "I'm having trouble connecting to my main brain, but I've updated the flight results for you on the left!", sender: 'ai' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' as const };
    setMessages(prev => [...prev, userMsg]);
    fetchAIResponse(input);
    setInput('');
  };

  return (
    <div className={`${styles.chatContainer} glass`}>
      <div className={styles.header}>
        <h3>Kilwa AI Travel Assistant</h3>
        <p>Smart Help for Students & Travelers</p>
      </div>
      
      <div className={styles.messages} ref={scrollRef}>
        {messages.map(m => (
          <div key={m.id} className={`${styles.message} ${styles[m.sender]}`}>
            <div className={styles.bubble}>{m.text}</div>
          </div>
        ))}
        {isTyping && (
          <div className={`${styles.message} ${styles.ai}`}>
            <div className={styles.bubble}>
              <span className={styles.dots}><span>.</span><span>.</span><span>.</span></span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className={styles.inputArea}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Ask about flights, hotels, or travel tips..."
          className={styles.input}
        />
        <button type="submit" className={styles.sendBtn}>✈️</button>
      </form>

      <div className={styles.disclaimer}>
        This AI assistant uses simulated data and is for educational purposes (MOE Guidelines).
      </div>
    </div>
  );
}
