// ─── Aruvedic Data ─────────────────────────────────────────────────────────────

export const CATEGORIES = [
  { id: 'supplements', label: 'Supplements', sub: 'Tablets & capsules' },
  { id: 'oils',        label: 'Oils & Balms', sub: 'Cold-pressed' },
  { id: 'skincare',    label: 'Skincare',     sub: 'For face & body' },
  { id: 'haircare',    label: 'Haircare',     sub: 'Oils & masks' },
  { id: 'teas',        label: 'Teas',         sub: 'Wellness brews' },
  { id: 'powders',     label: 'Churnas',      sub: 'Traditional powders' },
  { id: 'personal',    label: 'Personal Care',sub: 'Daily essentials' },
];

export const PRODUCTS = [
  {
    id: 'ashwa', name: 'Ashwagandha', sub: 'Root Tablets · 60ct',
    cat: 'supplements', price: 540, mrp: 720, rating: 4.8, reviews: 1240, stock: 142,
    hue: 32, swatch: '#A87344',
    blurb: 'Adaptogenic root for stress, sleep and steady energy.',
    benefits: ['Reduces cortisol', 'Improves sleep depth', 'Supports stamina'],
    use: 'Take 1 tablet, twice daily after meals.',
    ingredients: 'KSM-66® Ashwagandha root extract 600mg, plant cellulose capsule.'
  },
  {
    id: 'triphala', name: 'Triphala Churna', sub: 'Digestive Powder · 200g',
    cat: 'powders', price: 320, mrp: 380, rating: 4.7, reviews: 812, stock: 88,
    hue: 24, swatch: '#7A4A2B',
    blurb: 'Three-fruit blend for gentle daily detox.',
    benefits: ['Supports digestion', 'Mild laxative', 'Antioxidant'],
    use: '1 tsp with warm water before bed.',
    ingredients: 'Amalaki, Bibhitaki, Haritaki (equal parts).'
  },
  {
    id: 'bhringraj', name: 'Bhringraj Hair Oil', sub: 'Scalp & Roots · 200ml',
    cat: 'haircare', price: 480, mrp: 600, rating: 4.9, reviews: 2104, stock: 220,
    hue: 88, swatch: '#3D5B3A',
    blurb: 'Cooling scalp oil. Sesame-base, hand-pressed.',
    benefits: ['Soothes scalp', 'Promotes growth', 'Calms dandruff'],
    use: 'Warm, massage scalp 20 min, wash off.',
    ingredients: 'Bhringraj, Amla, Brahmi, Sesame oil.'
  },
  {
    id: 'kumkumadi', name: 'Kumkumadi Tailam', sub: 'Night Face Oil · 30ml',
    cat: 'skincare', price: 1240, mrp: 1480, rating: 4.9, reviews: 3402, stock: 64,
    hue: 18, swatch: '#C26A3C',
    blurb: 'Saffron-infused night oil for luminous skin.',
    benefits: ['Brightens', 'Fades pigmentation', 'Restores glow'],
    use: '3–4 drops at night, massage upward.',
    ingredients: 'Saffron, Manjistha, Vetiver, Sesame oil.'
  },
  {
    id: 'brahmi', name: 'Brahmi Capsules', sub: 'Mind & Memory · 90ct',
    cat: 'supplements', price: 460, mrp: 580, rating: 4.6, reviews: 540, stock: 96,
    hue: 95, swatch: '#506E45',
    blurb: 'Cognitive herb for focus and calm clarity.',
    benefits: ['Sharpens focus', 'Eases anxiety', 'Supports memory'],
    use: '1 capsule, twice daily.',
    ingredients: 'Brahmi (Bacopa monnieri) extract 500mg.'
  },
  {
    id: 'tulsi', name: 'Tulsi Green Tea', sub: 'Loose Leaf · 100g',
    cat: 'teas', price: 280, mrp: 320, rating: 4.7, reviews: 1689, stock: 310,
    hue: 92, swatch: '#6B8458',
    blurb: 'Holy basil and Darjeeling green. Bright, herbal.',
    benefits: ['Antioxidant', 'Calms nerves', 'Boosts immunity'],
    use: '1 tsp in hot water, 3 min steep.',
    ingredients: 'Tulsi (3 varieties), Darjeeling green tea.'
  },
  {
    id: 'neem', name: 'Neem Face Wash', sub: 'Clarifying Gel · 150ml',
    cat: 'skincare', price: 240, mrp: 280, rating: 4.5, reviews: 920, stock: 180,
    hue: 100, swatch: '#577B49',
    blurb: 'Gentle daily wash for breakout-prone skin.',
    benefits: ['Clears pores', 'Soothes redness', 'Sulphate-free'],
    use: 'Massage onto damp skin, rinse.',
    ingredients: 'Neem, Tulsi, Aloe vera, mild surfactants.'
  },
  {
    id: 'chyawan', name: 'Chyawanprash', sub: 'Daily Tonic · 500g',
    cat: 'supplements', price: 620, mrp: 740, rating: 4.8, reviews: 2310, stock: 0,
    hue: 22, swatch: '#5C3520',
    blurb: 'Classic 40-herb jam for immunity. With wild amla.',
    benefits: ['Immune support', 'Builds ojas', 'All-season'],
    use: '1 tsp morning, plain or with milk.',
    ingredients: 'Amla, Ashwagandha, Pippali, ghee, 37 more herbs.'
  },
  {
    id: 'mahanara', name: 'Mahanarayan Oil', sub: 'Joint & Body · 200ml',
    cat: 'oils', price: 580, mrp: 720, rating: 4.7, reviews: 760, stock: 124,
    hue: 40, swatch: '#A0723E',
    blurb: 'Warming body oil for joints and tired muscles.',
    benefits: ['Eases stiffness', 'Warms tissues', 'Pre-yoga ritual'],
    use: 'Warm, massage onto joints before bath.',
    ingredients: 'Dashamoola, Bala, Ashwagandha in sesame oil.'
  },
  {
    id: 'tooth', name: 'Herbal Toothpowder', sub: 'Mint & Clove · 100g',
    cat: 'personal', price: 180, mrp: 220, rating: 4.4, reviews: 412, stock: 240,
    hue: 72, swatch: '#4F5E3F',
    blurb: 'Traditional dant manjan with clove and neem.',
    benefits: ['Strengthens gums', 'Fresh breath', 'No fluoride'],
    use: 'Dab on wet brush, brush gently.',
    ingredients: 'Neem, Babool, Clove, Mint, rock salt.'
  },
  {
    id: 'amla', name: 'Amla Hair Mask', sub: 'Strength Pack · 200g',
    cat: 'haircare', price: 360, mrp: 440, rating: 4.6, reviews: 530, stock: 78,
    hue: 80, swatch: '#3F5C30',
    blurb: 'Weekly mask to thicken and shine.',
    benefits: ['Adds shine', 'Reduces fall', 'Tames frizz'],
    use: 'Apply to damp hair, leave 30 min.',
    ingredients: 'Amla, Shikakai, Reetha, Bhringraj.'
  },
  {
    id: 'ginger', name: 'Ginger Wellness Tea', sub: 'Spice Blend · 80g',
    cat: 'teas', price: 240, mrp: 280, rating: 4.6, reviews: 388, stock: 195,
    hue: 30, swatch: '#9C5A2E',
    blurb: 'Pungent winter brew with black pepper & tulsi.',
    benefits: ['Warming', 'Aids digestion', 'Soothes throat'],
    use: 'Boil 1 tsp in water 5 min.',
    ingredients: 'Ginger, Tulsi, Black pepper, Cardamom.'
  },
];

export const ORDERS = [
  { id: 'AR-10428', date: '2026-05-26', customer: 'Priya Menon',  email: 'priya.m@gmail.com',    items: [{ p: 'kumkumadi', q: 1 }, { p: 'neem', q: 2 }], total: 1720, status: 'Processing', city: 'Bengaluru', pay: 'UPI' },
  { id: 'AR-10427', date: '2026-05-26', customer: 'Rohan Shah',   email: 'rohan@shah.co.in',     items: [{ p: 'ashwa', q: 2 }],                           total: 1080, status: 'Packed',     city: 'Mumbai',    pay: 'Card' },
  { id: 'AR-10426', date: '2026-05-25', customer: 'Anjali Verma', email: 'anjali.v@yahoo.com',   items: [{ p: 'bhringraj', q: 1 }, { p: 'amla', q: 1 }], total: 840,  status: 'Shipped',    city: 'Pune',      pay: 'UPI' },
  { id: 'AR-10425', date: '2026-05-25', customer: 'Karthik Iyer', email: 'k.iyer@protonmail.com',items: [{ p: 'triphala', q: 1 }, { p: 'chyawan', q: 1 }],total: 940, status: 'Delivered',  city: 'Chennai',   pay: 'COD' },
  { id: 'AR-10424', date: '2026-05-24', customer: 'Meera Kapoor', email: 'meera.k@outlook.com',  items: [{ p: 'tulsi', q: 3 }],                           total: 840,  status: 'Delivered',  city: 'Delhi',     pay: 'UPI' },
  { id: 'AR-10423', date: '2026-05-24', customer: 'Sahil Reddy',  email: 'sahilr@gmail.com',     items: [{ p: 'mahanara', q: 1 }],                        total: 580,  status: 'Cancelled',  city: 'Hyderabad', pay: 'Card' },
  { id: 'AR-10422', date: '2026-05-23', customer: 'Devika Nair',  email: 'devika@nair.in',       items: [{ p: 'kumkumadi', q: 1 }],                       total: 1240, status: 'Delivered',  city: 'Kochi',     pay: 'UPI' },
  { id: 'AR-10421', date: '2026-05-23', customer: 'Aditya Bose',  email: 'a.bose@gmail.com',     items: [{ p: 'brahmi', q: 2 }, { p: 'tulsi', q: 1 }],   total: 1200, status: 'Delivered',  city: 'Kolkata',   pay: 'Card' },
];

export const CUSTOMERS = [
  { id: 'C-2104', name: 'Priya Menon',   email: 'priya.m@gmail.com',     orders: 8,  spent: 11240, joined: '2024-09-12', tier: 'Gold' },
  { id: 'C-2103', name: 'Rohan Shah',    email: 'rohan@shah.co.in',      orders: 3,  spent: 3640,  joined: '2025-11-04', tier: 'Silver' },
  { id: 'C-2102', name: 'Anjali Verma',  email: 'anjali.v@yahoo.com',    orders: 12, spent: 18920, joined: '2024-02-18', tier: 'Gold' },
  { id: 'C-2101', name: 'Karthik Iyer',  email: 'k.iyer@protonmail.com', orders: 5,  spent: 6420,  joined: '2025-06-22', tier: 'Silver' },
  { id: 'C-2100', name: 'Meera Kapoor',  email: 'meera.k@outlook.com',   orders: 2,  spent: 1640,  joined: '2026-01-09', tier: 'Bronze' },
  { id: 'C-2099', name: 'Sahil Reddy',   email: 'sahilr@gmail.com',      orders: 1,  spent: 580,   joined: '2026-04-30', tier: 'Bronze' },
];

export const COUPONS = [
  { id: 'c1', code: 'AYUR20',    off: '20%',  cap: '₹400', uses: 1842, status: 'Active' },
  { id: 'c2', code: 'NEWAGE',    off: '15%',  cap: '₹300', uses: 624,  status: 'Active' },
  { id: 'c3', code: 'MONSOON',   off: '₹150', cap: '—',    uses: 211,  status: 'Paused' },
  { id: 'c4', code: 'WELCOME10', off: '10%',  cap: '₹200', uses: 5108, status: 'Active' },
];

export const REVIEWS = [
  { id: 'R-901', product: 'kumkumadi', author: 'Priya M.',   rating: 5, body: 'Visible glow in two weeks. The saffron is real — you can smell it.', date: '2026-05-21', status: 'Published' },
  { id: 'R-900', product: 'ashwa',     author: 'Rohan S.',   rating: 5, body: 'Sleep has been deeper since I started. Worth the price.', date: '2026-05-19', status: 'Published' },
  { id: 'R-899', product: 'neem',      author: 'Anonymous',  rating: 2, body: 'Made my skin tight. Not for dry types maybe.', date: '2026-05-18', status: 'Pending' },
  { id: 'R-898', product: 'bhringraj', author: 'Devika N.',  rating: 5, body: 'My grandmother used to make this. This one comes close.', date: '2026-05-17', status: 'Published' },
  { id: 'R-897', product: 'triphala',  author: 'Karthik I.', rating: 4, body: 'Bitter but works. Bowel routine is back on track.', date: '2026-05-15', status: 'Pending' },
];

export const SALES_14D = [
  { d: 'May 13', r: 18420, o: 24 }, { d: 'May 14', r: 22180, o: 29 },
  { d: 'May 15', r: 19640, o: 26 }, { d: 'May 16', r: 25120, o: 33 },
  { d: 'May 17', r: 31040, o: 41 }, { d: 'May 18', r: 28760, o: 37 },
  { d: 'May 19', r: 26340, o: 35 }, { d: 'May 20', r: 30180, o: 40 },
  { d: 'May 21', r: 34520, o: 46 }, { d: 'May 22', r: 38140, o: 49 },
  { d: 'May 23', r: 35280, o: 47 }, { d: 'May 24', r: 41020, o: 53 },
  { d: 'May 25', r: 44260, o: 58 }, { d: 'May 26', r: 47830, o: 61 },
];

export const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');
