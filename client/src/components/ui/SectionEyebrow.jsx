export default function SectionEyebrow({ eyebrow, title, sub, align = 'left' }) {
  return (
    <div style={{
      textAlign: align,
      maxWidth: align === 'center' ? 640 : undefined,
      margin: align === 'center' ? '0 auto' : undefined,
    }}>
      {eyebrow && (
        <div style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>
          {eyebrow}
        </div>
      )}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 44, lineHeight: 1.05, fontWeight: 500, margin: '12px 0 0', letterSpacing: '-.01em' }}>
        {title}
      </h2>
      {sub && <p style={{ marginTop: 14, color: 'var(--mute)', fontSize: 15, lineHeight: 1.6 }}>{sub}</p>}
    </div>
  );
}
