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

interface Package {
  flight: Flight;
  hotel: Hotel;
  totalPrice: number;
  stayDuration: number;
}

export default function ResultsView({ results }: { results: { flights: Flight[], hotels: Hotel[], packages?: Package[] } }) {
  if (results.flights.length === 0 && results.hotels.length === 0 && (!results.packages || results.packages.length === 0)) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>🌍</div>
        <h3>Ready to Explore?</h3>
        <p>Type a request like "Find cheapest flight" or "Compare flight + hotel" in the chat.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Packages Section */}
      {results.packages && results.packages.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Recommended Packages (Flight + Hotel)</h2>
          <div className={styles.grid}>
            {results.packages.map((p, idx) => (
              <div key={idx} className={`${styles.packageCard} glass animate-fade-in`}>
                <div className={styles.packageBadge}>Best Combo</div>
                <div className={styles.packageHeader}>
                  <h4>{p.flight.airline} + {p.hotel.name}</h4>
                  <span className={styles.totalPrice}>{p.totalPrice} AED</span>
                </div>
                <p className={styles.packageDetails}>
                  Flight to {p.flight.destination} + {p.stayDuration} nights stay.
                </p>
                <div className={styles.packageBreakdown}>
                  <span>✈️ {p.flight.price} AED</span>
                  <span>🏨 {p.hotel.pricePerNight * p.stayDuration} AED</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Flights Section */}
      {results.flights.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Flight Options</h2>
          <div className={styles.grid}>
            {results.flights.map(f => (
              <div key={f.id} className={`${styles.card} card animate-fade-in ${f.tags.includes('Cheapest') ? styles.cheapest : ''}`}>
                {f.tags.includes('Cheapest') && <div className={styles.ribbon}>Cheapest</div>}
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

      {/* Hotels Section */}
      {results.hotels.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Hotel Recommendations</h2>
          <div className={styles.grid}>
            {results.hotels.map(h => (
              <div key={h.id} className={`${styles.card} card animate-fade-in`}>
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
