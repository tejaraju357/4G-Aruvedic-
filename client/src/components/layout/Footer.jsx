import { Link } from 'react-router-dom';

function Logo({ size = 22 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2 C 7 8, 7 16, 12 22 C 17 16, 17 8, 12 2 Z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
        <path d="M12 3 V 21" stroke="currentColor" strokeWidth="1" opacity=".5"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      </svg>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: size * .95, fontWeight: 500, letterSpacing: '.02em' }}>
        Aruvedic
      </span>
    </div>
  );
}

const cols = [
  { t: 'Shop',  l: ['Bestsellers', 'New arrivals', 'Skincare', 'Wellness', 'Gifts'] },
  { t: 'Learn', l: ['Our philosophy', 'Sourcing', 'Journal', 'Doshas 101', 'FAQ'] },
  { t: 'Care',  l: ['Contact', 'Shipping', 'Returns', 'Track order', 'Privacy'] },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--bg)', padding: '56px 32px 28px', marginTop: 80 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 40, maxWidth: 1280, margin: '0 auto' }}>
        <div>
          <div style={{ color: 'var(--bg)' }}><Logo size={28} /></div>
          <p style={{ marginTop: 14, fontSize: 13, lineHeight: 1.6, opacity: .7, maxWidth: 280 }}>
            Single-origin Ayurveda, grown on family farms and pressed within seven days of harvest.
          </p>
          <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
            {['Insta', 'Twitter', 'YouTube'].map(s => (
              <div key={s} style={{
                width: 36, height: 36, borderRadius: 999,
                border: '1px solid rgba(255,255,255,.2)',
                display: 'grid', placeItems: 'center',
                fontSize: 11, cursor: 'pointer', opacity: .7,
              }}>{s[0]}</div>
            ))}
          </div>
        </div>
        {cols.map(col => (
          <div key={col.t}>
            <div style={{ fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', opacity: .6, marginBottom: 14 }}>{col.t}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
              {col.l.map(item => (
                <li key={item} style={{ fontSize: 13, opacity: .85, cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '.85'}
                >{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{
        borderTop: '1px solid rgba(255,255,255,.1)', marginTop: 40, paddingTop: 20,
        display: 'flex', justifyContent: 'space-between',
        maxWidth: 1280, margin: '40px auto 0', fontSize: 12, opacity: .6,
      }}>
        <span>© 2026 Aruvedic Wellness Pvt. Ltd.</span>
        <span>Crafted in India · GMP Certified · AYUSH Approved</span>
      </div>
    </footer>
  );
}
