export const PALETTES = {
  earth: {
    name: 'Earth',
    bg: '#F6F0E4', surface: '#FFFCF5', ink: '#1F1A12', mute: '#7A6F5C',
    line: '#E4DBC8', accent: '#B86A3F', accentInk: '#FFFFFF', leaf: '#6B7F5C', soft: '#EDE3CF',
  },
  sage: {
    name: 'Sage',
    bg: '#EEF1E8', surface: '#FBFCF6', ink: '#1B231A', mute: '#6B7569',
    line: '#DCE2D2', accent: '#4F6A3E', accentInk: '#FBFCF6', leaf: '#7A8E68', soft: '#DDE5CF',
  },
  bone: {
    name: 'Bone',
    bg: '#F5F3EE', surface: '#FFFFFF', ink: '#15140F', mute: '#7B776E',
    line: '#E2DED4', accent: '#15140F', accentInk: '#F5F3EE', leaf: '#5C6B53', soft: '#ECE7DC',
  },
};

export const FONT_PAIRS = {
  classical: {
    name: 'Classical',
    display: '"Cormorant Garamond", "EB Garamond", Georgia, serif',
    body: '"Outfit", system-ui, sans-serif',
  },
  editorial: {
    name: 'Editorial',
    display: '"Libre Caslon Text", "Playfair Display", Georgia, serif',
    body: '"Work Sans", system-ui, sans-serif',
  },
  modern: {
    name: 'Modern',
    display: '"DM Serif Display", Georgia, serif',
    body: '"DM Sans", system-ui, sans-serif',
  },
};

export function applyTheme(palette, fonts) {
  const p = PALETTES[palette] || PALETTES.earth;
  const f = FONT_PAIRS[fonts] || FONT_PAIRS.classical;
  const root = document.documentElement;
  root.style.setProperty('--bg', p.bg);
  root.style.setProperty('--surface', p.surface);
  root.style.setProperty('--ink', p.ink);
  root.style.setProperty('--mute', p.mute);
  root.style.setProperty('--line', p.line);
  root.style.setProperty('--accent', p.accent);
  root.style.setProperty('--accent-ink', p.accentInk);
  root.style.setProperty('--leaf', p.leaf);
  root.style.setProperty('--soft', p.soft);
  root.style.setProperty('--font-display', f.display);
  root.style.setProperty('--font-body', f.body);
}
