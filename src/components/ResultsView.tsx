'use client';

import styles from './ResultsView.module.css';

interface Flight {
  id: string;
  airline: string;
  origin: string;
  destination: string;
  price: number;
  duration: string;
  baggage: string;
  tags: string[];
  description: string;
}

interface Hotel {
  id: string;
  name: string;
  pricePerNight: number;
  rating: number;
  distanceFromAirport: string;
  tags: string[];
  description: string;
}

export default function ResultsView({ results }: { results: { flights: Flight[], hotels: Hotel[] } }) {
  if (results.flights.length === 0 && results.hotels.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>🔍</div>
        <h3>No results yet</h3>
        <p>Type something in the chat to see flight and hotel options!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {results.flights.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Flight Options</h2>
          <div className={styles.grid}>
            {results.flights.map(f => (
              <div key={f.id} className="card animate-fade-in">
                <div className={styles.cardHeader}>
                  <span className={styles.airline}>{f.airline}</span>
                  <span className={styles.price}>{f.price} AED</span>
                </div>
                <div className={styles.route}>{f.origin} ➔ {f.destination}</div>
                <div className={styles.details}>
                  <span>⏱ {f.duration}</span>
                  <span>🧳 {f.baggage}</span>
                </div>
                <div className={styles.tags}>
                  {f.tags.map(t => <span key={t} className={`tag ${t === 'Cheapest' || t === 'Best Value' ? 'tag-highlight' : ''}`}>{t}</span>)}
                </div>
                <p className={styles.description}>{f.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {results.hotels.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Hotel Recommendations</h2>
          <div className={styles.grid}>
            {results.hotels.map(h => (
              <div key={h.id} className="card animate-fade-in">
                <div className={styles.cardHeader}>
                  <span className={styles.hotelName}>{h.name}</span>
                  <span className={styles.price}>{h.pricePerNight} AED / night</span>
                </div>
                <div className={styles.rating}>⭐ {h.rating} | 📍 {h.distanceFromAirport} from airport</div>
                <div className={styles.tags}>
                  {h.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <p className={styles.description}>{h.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
