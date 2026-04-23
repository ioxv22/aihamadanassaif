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
    { id: 1, text: "Welcome! I am the Smart Travel AI for Hamad, Saif, and Anas's project. How can I assist you with flights, hotels, or packages today?", sender: 'ai' }
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
    const travelKeywords = ['flight', 'hotel', 'travel', 'trip', 'booking', 'price', 'dubai', 'london', 'baggage', 'student', 'emirates', 'etihad', 'flydubai', 'stay', 'destination', 'package', 'طيران', 'فندق', 'سفر', 'حجز', 'سعر', 'دبي', 'لندن', 'حقيبة', 'باكيج'];
    return travelKeywords.some(kw => text.toLowerCase().includes(kw));
  };

  const fetchAIResponse = async (userText: string) => {
    setIsTyping(true);

    if (!isRelevant(userText)) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: Date.now(), 
          text: "I am specifically designed for this Grade 11 project to help with travel. Please ask about flights, hotels, or packages!", 
          sender: 'ai' 
        }]);
        setIsTyping(false);
      }, 500);
      return;
    }

    const lower = userText.toLowerCase();
    let results: any = { flights: [], hotels: [], packages: [] };

    // Package logic
    if (lower.includes('package') || lower.includes('combo') || lower.includes('باكيج')) {
      results.packages = [
        {
          flight: mockData.flights[0],
          hotel: mockData.hotels[0],
          totalPrice: mockData.flights[0].price + (mockData.hotels[0].pricePerNight * 3),
          stayDuration: 3
        },
        {
          flight: mockData.flights[1],
          hotel: mockData.hotels[1],
          totalPrice: mockData.flights[1].price + (mockData.hotels[1].pricePerNight * 3),
          stayDuration: 3
        }
      ];
    } else if (lower.includes('flight') || lower.includes('طيران')) {
      results.flights = mockData.flights;
    } else if (lower.includes('hotel') || lower.includes('فندق')) {
      results.hotels = mockData.hotels;
    }
    onSearch(results);

    try {
      const response = await fetch(`http://de3.bot-hosting.net:21007/kilwa-chat?text=${encodeURIComponent(userText)}`);
      const data = await response.text();
      let aiText = data;
      try {
        const jsonData = JSON.parse(data);
        aiText = jsonData.response || jsonData.text || data;
      } catch (e) {}
      setMessages(prev => [...prev, { id: Date.now(), text: aiText, sender: 'ai' }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now(), text: "I've updated the results for you! Emirates is excellent for families, while FlyDubai offers the best student rates.", sender: 'ai' }]);
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
        <p>Smart Help by Hamad, Saif & Anas</p>
      </div>
      <div className={styles.messages} ref={scrollRef}>
        {messages.map(m => (
          <div key={m.id} className={`${styles.message} ${styles[m.sender]}`}>
            <div className={styles.bubble}>{m.text}</div>
          </div>
        ))}
        {isTyping && <div className={`${styles.message} ${styles.ai}`}><div className={styles.bubble}><span className={styles.dots}><span>.</span><span>.</span><span>.</span></span></div></div>}
      </div>
      <form onSubmit={handleSubmit} className={styles.inputArea}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about flights, hotels, or packages..." className={styles.input} />
        <button type="submit" className={styles.sendBtn}>✈️</button>
      </form>
      <div className={styles.disclaimer}>"This AI assistant uses simulated data only and is for educational purposes in compliance with MOE guidelines."</div>
    </div>
  );
}
