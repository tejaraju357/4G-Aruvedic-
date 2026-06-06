export default function TabPills({ tabs, value, onChange }) {
  return (
    <div style={{ display: 'inline-flex', background: 'var(--soft)', padding: 4, borderRadius: 999, gap: 2 }}>
      {tabs.map(t => (
        <button
          key={t.value}
          onClick={() => onChange(t.value)}
          style={{
            padding: '8px 18px', borderRadius: 999, border: 'none', cursor: 'pointer',
            background: value === t.value ? 'var(--surface)' : 'transparent',
            color: 'var(--ink)', fontSize: 13, fontFamily: 'var(--font-body)',
            fontWeight: value === t.value ? 500 : 400,
            boxShadow: value === t.value ? '0 1px 4px rgba(0,0,0,.06)' : 'none',
            letterSpacing: '.02em',
          }}
        >{t.label}</button>
      ))}
    </div>
  );
}
