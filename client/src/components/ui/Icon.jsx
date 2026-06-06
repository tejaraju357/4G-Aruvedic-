export default function Icon({ name, size = 18, stroke = 1.5, color = 'currentColor', style }) {
  const paths = {
    search:  <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>,
    cart:    <><path d="M3 4h2l2 12h12l2-8H7"/><circle cx="9" cy="20" r="1.2"/><circle cx="18" cy="20" r="1.2"/></>,
    heart:   <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>,
    heartF:  <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" fill="currentColor"/>,
    user:    <><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4.5 5-6 8-6s6.5 1.5 8 6"/></>,
    plus:    <><path d="M12 5v14M5 12h14"/></>,
    minus:   <path d="M5 12h14"/>,
    chev:    <path d="m9 6 6 6-6 6"/>,
    chevD:   <path d="m6 9 6 6 6-6"/>,
    star:    <path d="M12 3l2.8 6 6.2.6-4.8 4.2 1.5 6.2L12 16.8 6.3 20l1.5-6.2L3 9.6 9.2 9z"/>,
    starF:   <path d="M12 3l2.8 6 6.2.6-4.8 4.2 1.5 6.2L12 16.8 6.3 20l1.5-6.2L3 9.6 9.2 9z" fill="currentColor"/>,
    check:   <path d="m5 12 5 5L20 7"/>,
    x:       <path d="M6 6l12 12M18 6 6 18"/>,
    leaf:    <path d="M5 19c0-9 7-14 16-14 0 9-5 16-14 16-1 0-2 0-2-2z"/>,
    box:     <><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/></>,
    bag:     <><path d="M5 8h14l-1 13H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></>,
    arrow:   <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    home:    <><path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/></>,
    grid:    <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>,
    list:    <><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></>,
    cog:     <><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.3 1a7 7 0 0 0-1.7-1L14.5 3h-5l-.4 2.5a7 7 0 0 0-1.7 1l-2.3-1-2 3.5L5.1 11a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.3-1a7 7 0 0 0 1.7 1L9.5 21h5l.4-2.5a7 7 0 0 0 1.7-1l2.3 1 2-3.5L19.1 13a7 7 0 0 0 0-1z"/></>,
    chart:   <><path d="M4 20V8M10 20V4M16 20v-8M22 20H2"/></>,
    truck:   <><rect x="2" y="7" width="13" height="9"/><path d="M15 10h4l3 3v3h-7"/><circle cx="6" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/></>,
    tag:     <><path d="M3 12V3h9l9 9-9 9-9-9z"/><circle cx="8" cy="8" r="1.5"/></>,
    pencil:  <><path d="M4 20h4l10-10-4-4L4 16v4z"/><path d="m13.5 6.5 4 4"/></>,
    eye:     <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>,
    trash:   <><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></>,
    pin:     <><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></>,
    lock:    <><rect x="5" y="11" width="14" height="9" rx="1"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>,
    sparkle: <><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/></>,
    filter:  <><path d="M3 5h18l-7 9v6l-4-2v-4z"/></>,
    drop:    <path d="M12 3s7 7.5 7 12a7 7 0 1 1-14 0c0-4.5 7-12 7-12z"/>,
    flame:   <path d="M12 3s2 3 2 6a2 2 0 1 1-4 0c0 4-4 5-4 9a6 6 0 0 0 12 0c0-5-6-7-6-15z"/>,
  };
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke={color}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, display: 'block', ...style }}
    >
      {paths[name]}
    </svg>
  );
}
