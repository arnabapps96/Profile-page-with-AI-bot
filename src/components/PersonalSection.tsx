'use client';
import { useState, useEffect } from 'react';

interface Track {
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
}

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
  recentTracks?: Track[];
}

export default function PersonalSection() {
  const [spotify, setSpotify] = useState<SpotifyData | null>(null);

  useEffect(() => {
    const fetchSpotify = async () => {
      try {
        const res = await fetch('/api/spotify');
        const data = await res.json();
        setSpotify(data);
      } catch (e) {
        console.error('Failed to fetch Spotify', e);
      }
    };

    fetchSpotify();
    const interval = setInterval(fetchSpotify, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  const travelLog = [
    { name: 'Gulmarg', country: 'India', year: '2023', type: 'Mountains' },
    { name: 'Istanbul', country: 'Turkey', year: '2022', type: 'Heritage' },
    { name: 'Dubai', country: 'UAE', year: '2021', type: 'City' },
    { name: 'Phuket', country: 'Thailand', year: '2024', type: 'Beach' },
    { name: 'Udaipur', country: 'India', year: '2022', type: 'Heritage' },
  ];

  const readingList = [
    { title: 'The Economics of Everything', source: 'Mint' },
    { title: 'Tech Trends 2026', source: 'Dot' },
    { title: 'Predictive Wellness', source: 'Research' },
  ];

  return (
    <section id="personal" className="section" style={{ background: '#fff', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <span className="label">Life Beyond the Slide Deck</span>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '4rem' }}>Interests & Explorations</h2>
        
        <div className="personal-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '2rem'
        }}>
          
          {/* Spotify Card */}
          <div className="personal-card fade-up" style={{
            gridColumn: 'span 7',
            background: '#000',
            color: '#fff',
            borderRadius: '32px',
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '450px'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <span style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: 800, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.15em',
                  color: '#1DB954'
                }}>
                  {spotify?.isPlaying ? 'Currently Listening' : 'Recently Played'}
                </span>
                <div style={{ width: '24px', height: '24px' }}>
                  <svg viewBox="0 0 24 24" fill="#1DB954">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 17.5c-.22.36-.68.47-1.05.25-2.85-1.74-6.43-2.12-10.65-1.16-.42.09-.83-.18-.92-.59-.09-.42.18-.83.59-.92 4.63-1.06 8.59-.62 11.78 1.33.37.22.48.68.25 1.05zm1.5-3.3c-.27.45-.87.6-1.32.33-3.26-2-8.24-2.58-12.1-1.39-.51.15-1.05-.14-1.21-.65-.16-.51.14-1.05.65-1.21 4.41-1.34 9.91-.68 13.65 1.61.45.26.59.86.33 1.32zm.1-3.41c-3.91-2.32-10.36-2.54-14.13-1.39-.6.18-1.24-.16-1.42-.76-.18-.6.16-1.24.76-1.42 4.33-1.31 11.45-1.05 15.96 1.63.54.32.72 1.02.4 1.56-.32.54-1.02.72-1.56.4z"/>
                  </svg>
                </div>
              </div>

              {spotify?.isPlaying && spotify.title ? (
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                  <div style={{ 
                    width: '120px', 
                    height: '120px', 
                    borderRadius: '12px', 
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    flexShrink: 0
                  }}>
                    <img 
                      src={spotify.albumImageUrl} 
                      alt={spotify.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.8rem', margin: '0 0 0.5rem 0', color: '#fff' }}>{spotify.title}</h3>
                    <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>{spotify.artist}</p>
                  </div>
                </div>
              ) : spotify?.recentTracks ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {spotify.recentTracks.map((track, i) => (
                    <a 
                      key={i} 
                      href={track.songUrl} 
                      target="_blank" 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '1rem', 
                        textDecoration: 'none',
                        padding: '0.75rem',
                        borderRadius: '12px',
                        background: 'rgba(255,255,255,0.05)',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    >
                      <img src={track.albumImageUrl} style={{ width: '48px', height: '48px', borderRadius: '4px' }} alt="" />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ fontSize: '0.95rem', margin: 0, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.title}</h4>
                        <p style={{ fontSize: '0.8rem', margin: 0, color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.artist}</p>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '2rem 0' }}>
                  <p style={{ color: 'rgba(255,255,255,0.5)' }}>Not playing anything right now.</p>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={spotify?.isPlaying ? 'music-bar' : ''} style={{
                    width: '4px',
                    height: spotify?.isPlaying ? '20px' : '4px',
                    background: '#1DB954',
                    borderRadius: '2px',
                    animationDelay: `${i * 0.1}s`
                  }} />
                ))}
              </div>
              {spotify?.songUrl && spotify.isPlaying && (
                <a 
                  href={spotify.songUrl} 
                  target="_blank" 
                  style={{ 
                    fontSize: '0.85rem', 
                    color: '#1DB954', 
                    textDecoration: 'none', 
                    fontWeight: 700 
                  }}
                >
                  Listen on Spotify ↗
                </a>
              )}
            </div>

            {/* Background Glow */}
            <div style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: '300px',
              height: '300px',
              background: '#1DB954',
              filter: 'blur(120px)',
              opacity: 0.15,
              zIndex: 0,
              pointerEvents: 'none'
            }} />
          </div>

          {/* Reading Card */}
          <div className="personal-card fade-up" style={{
            gridColumn: 'span 5',
            background: '#f8fafc',
            borderRadius: '32px',
            padding: '2.5rem',
            border: '1px solid var(--border)',
            animationDelay: '0.1s'
          }}>
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: 800, 
              textTransform: 'uppercase', 
              letterSpacing: '0.15em',
              color: 'var(--accent)',
              display: 'block',
              marginBottom: '2rem'
            }}>Reading Interests</span>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {readingList.map((item, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700, margin: '0 0 0.25rem 0' }}>{item.source}</p>
                  <h4 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--foreground)' }}>{item.title}</h4>
                </div>
              ))}
            </div>
            
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '2rem', fontStyle: 'italic' }}>
              "Lately, I've been deep-diving into long-form tech analysis and health optimization."
            </p>
          </div>

          {/* Travel Card */}
          <div className="personal-card fade-up" style={{
            gridColumn: 'span 12',
            background: 'var(--foreground)',
            color: '#fff',
            borderRadius: '32px',
            padding: '3rem',
            animationDelay: '0.2s',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <span style={{ 
                fontSize: '0.75rem', 
                fontWeight: 800, 
                textTransform: 'uppercase', 
                letterSpacing: '0.15em',
                color: 'var(--accent)',
                display: 'block',
                marginBottom: '2rem'
              }}>Travel Log</span>
              
              <div style={{ 
                display: 'flex', 
                gap: '3rem', 
                overflowX: 'auto', 
                paddingBottom: '1rem' 
              }} className="hide-scrollbar">
                {travelLog.map((trip, i) => (
                  <div key={i} style={{ flexShrink: 0 }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 800, margin: '0 0 0.5rem 0' }}>{trip.year} • {trip.type}</p>
                    <h3 style={{ fontSize: '2rem', color: '#fff', margin: '0 0 0.25rem 0' }}>{trip.name}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>{trip.country}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative Map/Pattern */}
            <div style={{
              position: 'absolute',
              bottom: '-20%',
              right: '0',
              fontSize: '15rem',
              opacity: 0.03,
              fontFamily: 'serif',
              pointerEvents: 'none'
            }}>EXPLORE</div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes musicBar {
          0%, 100% { height: 10px; }
          50% { height: 25px; }
        }
        .music-bar {
          animation: musicBar 1s ease-in-out infinite;
        }
        @media (max-width: 1024px) {
          .personal-grid { grid-template-columns: 1fr !important; }
          .personal-card { grid-column: span 12 !important; }
        }
      `}</style>
    </section>
  );
}
