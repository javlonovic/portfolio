// ── Article data ─────────────────────────────────────────
const ARTICLES = {
  1: {
    title: '10 JavaScript Tips Every Developer Should Know',
    category: 'JavaScript',
    date: 'December 15, 2024',
    readTime: '5',
    views: '1.2K',
    likes: '89',
    image: 'https://static.vecteezy.com/system/resources/previews/051/336/397/non_2x/javascript-transparent-logo-free-png.png',
    tags: ['ES6+', 'Performance', 'Best Practices', 'JavaScript'],
    content: `
<p>JavaScript continues to evolve, and staying up-to-date with the latest features and best practices is crucial for every developer. Here are 10 essential tips that will immediately level up your code quality.</p>
<h2>1. Use Destructuring Assignment</h2>
<p>Destructuring makes your code dramatically cleaner when extracting values from objects and arrays.</p>
<pre><code class="language-javascript">// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Object destructuring with rename + default
const { name: devName = 'Anonymous', role = 'dev' } = user;

// Nested destructuring
const { address: { city, country } } = person;</code></pre>
<h2>2. Master Template Literals</h2>
<p>Template literals aren't just string interpolation — they support tagged templates for powerful DSLs.</p>
<pre><code class="language-javascript">const greet = (name, role) => \`Hello, \${name}! You're a \${role}.\`;

// Multi-line without backslashes
const html = \`
  &lt;div class="card"&gt;
    &lt;h2&gt;\${title}&lt;/h2&gt;
    &lt;p&gt;\${description}&lt;/p&gt;
  &lt;/div&gt;
\`;</code></pre>
<h2>3. Arrow Functions — Know When Not to Use Them</h2>
<blockquote>Arrow functions don't have their own <code>this</code>. This is a feature, not a bug — but only when you understand it.</blockquote>
<pre><code class="language-javascript">// Great for array methods
const doubled = [1,2,3].map(n => n * 2);

// Avoid for object methods needing 'this'
const obj = {
  name: 'Dev',
  // Bad: 'this' will be outer scope
  greet: () => console.log(this.name),
  // Good: regular function
  greetProperly() { console.log(this.name); }
};</code></pre>
<h2>4. Leverage Powerful Array Methods</h2>
<pre><code class="language-javascript">const devs = [
  { name: 'Alice', lang: 'Python', yoe: 4 },
  { name: 'Bob',   lang: 'JS',     yoe: 2 },
  { name: 'Carol', lang: 'Python', yoe: 6 }
];

const seniorPythonDevs = devs
  .filter(d => d.lang === 'Python' && d.yoe > 3)
  .map(d => d.name)
  .sort();
// → ['Alice', 'Carol']</code></pre>
<h2>5. Async/Await Over Promise Chains</h2>
<pre><code class="language-javascript">async function fetchUserData(userId) {
  try {
    const res   = await fetch(\`/api/users/\${userId}\`);
    const user  = await res.json();
    const posts = await fetch(\`/api/posts?user=\${user.id}\`).then(r => r.json());
    return { user, posts };
  } catch (err) {
    console.error('Fetch failed:', err);
    throw err;
  }
}</code></pre>
<h2>6. Optional Chaining &amp; Nullish Coalescing</h2>
<pre><code class="language-javascript">// Optional chaining
const city    = user?.address?.city;
const method  = obj?.doSomething?.();
const element = arr?.[0];

// Nullish coalescing (only triggers on null/undefined, not 0 or '')
const port = config.port ?? 3000;
const name = user.name ?? 'Guest';</code></pre>
<h2>7. Memoisation for Performance</h2>
<pre><code class="language-javascript">function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n) => n ** 3);
expensiveCalc(10); // calculates
expensiveCalc(10); // returns cached</code></pre>
<h2>8. Module Syntax</h2>
<pre><code class="language-javascript">// utils.js
export const debounce = (fn, ms) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

// main.js
import { debounce, clamp } from './utils.js';</code></pre>
<h2>9. Custom Error Classes</h2>
<pre><code class="language-javascript">class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
  }
}

// Usage
throw new APIError('User not found', 404);
// catch (err) { if (err instanceof APIError) ... }</code></pre>
<h2>10. Write Self-Documenting Code</h2>
<pre><code class="language-javascript">// Bad
function calc(x, y, z) {
  return x > 0 && y > 0 && z > 0 ? x * y * z : 0;
}

// Good
function calculateVolume(width, height, depth) {
  const allPositive = [width, height, depth].every(d => d > 0);
  return allPositive ? width * height * depth : 0;
}</code></pre>
<h2>Conclusion</h2>
<p>These patterns aren't just syntax sugar — they represent idiomatic, modern JavaScript. Adopt them incrementally and your codebase will become significantly more readable and maintainable.</p>
    `
  },
  2: {
    title: 'Mastering React Hooks: A Complete Guide',
    category: 'React',
    date: 'December 12, 2024',
    readTime: '8',
    views: '2.1K',
    likes: '156',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThFGBTwrc-m2PX_3YlVq-RcE25W8wv96dBTw&s',
    tags: ['React', 'Hooks', 'useState', 'useEffect', 'Custom Hooks'],
    content: `
<p>React Hooks changed everything. They let us write stateful, side-effect-driven code in plain functions — no classes, no lifecycle method confusion. This guide covers the essential hooks and patterns you'll use every day.</p>
<h2>useState — The Foundation</h2>
<pre><code class="language-jsx">function Counter() {
  const [count, setCount] = useState(0);

  // Functional update — safe when new state depends on old
  const increment = () => setCount(prev => prev + 1);

  return &lt;button onClick={increment}&gt;Count: {count}&lt;/button&gt;;
}</code></pre>
<h2>useEffect — Side Effects Done Right</h2>
<p>The dependency array is the key to mastering <code>useEffect</code>. Get it wrong and you'll have infinite loops or stale closures.</p>
<pre><code class="language-jsx">function UserProfile({ userId }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false; // cleanup pattern

    async function load() {
      setLoading(true);
      const res  = await fetch(\`/api/users/\${userId}\`);
      const data = await res.json();
      if (!cancelled) { setUser(data); setLoading(false); }
    }

    load();
    return () => { cancelled = true; }; // cleanup
  }, [userId]); // re-runs only when userId changes

  if (loading) return &lt;Spinner /&gt;;
  return &lt;div&gt;{user?.name}&lt;/div&gt;;
}</code></pre>
<h2>useReducer — Complex State</h2>
<pre><code class="language-jsx">function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': return { ...state, count: state.count + 1 };
    case 'RESET':     return { count: 0, step: state.step };
    default: throw new Error(\`Unknown action: \${action.type}\`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });
  return (
    &lt;div&gt;
      &lt;button onClick={() => dispatch({ type: 'INCREMENT' })}&gt;+&lt;/button&gt;
      &lt;button onClick={() => dispatch({ type: 'RESET' })}&gt;Reset&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
<h2>Custom Hooks — The Real Power</h2>
<p>Extract repeated logic into reusable hooks. This is where React becomes truly composable.</p>
<pre><code class="language-jsx">// useLocalStorage
function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initialValue; }
    catch { return initialValue; }
  });

  const setValue = (value) => {
    setStored(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [stored, setValue];
}

// useDebounce
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// Usage
function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery    = useDebounce(query, 300);
  useEffect(() => { if (debouncedQuery) fetchResults(debouncedQuery); }, [debouncedQuery]);
  return &lt;input value={query} onChange={e => setQuery(e.target.value)} /&gt;;
}</code></pre>
<h2>useMemo &amp; useCallback</h2>
<pre><code class="language-jsx">function ExpensiveList({ items, onSelect }) {
  // Only recompute when items changes
  const sortedItems = useMemo(
    () => [...items].sort((a, b) => a.name.localeCompare(b.name)),
    [items]
  );

  // Stable reference — won't cause child re-renders
  const handleSelect = useCallback(
    (id) => onSelect(id),
    [onSelect]
  );

  return sortedItems.map(item =>
    &lt;Item key={item.id} item={item} onSelect={handleSelect} /&gt;
  );
}</code></pre>
<h2>Conclusion</h2>
<p>Hooks unlock the full power of functional React. Start with <code>useState</code> and <code>useEffect</code>, extract custom hooks aggressively, and reach for <code>useReducer</code> when state logic grows complex. The composition model hooks enable is what makes modern React so elegant.</p>
    `
  },
  3: {
    title: 'Building Scalable APIs with Node.js',
    category: 'Node.js',
    date: 'December 8, 2024',
    readTime: '12',
    views: '1.8K',
    likes: '134',
    image: 'https://static.vecteezy.com/system/resources/previews/060/194/950/non_2x/node-js-framework-3d-icon-transparent-background-free-png.png',
    tags: ['Node.js', 'Express', 'API Design', 'Scalability', 'Backend'],
    content: `
<p>Node.js has become the backbone of countless production APIs. But spinning up an Express server is the easy part — building something that scales, stays secure, and remains maintainable takes intentional architecture.</p>
<h2>Project Structure</h2>
<pre><code class="language-bash">src/
  routes/      # Route definitions
  controllers/ # Request handlers
  services/    # Business logic
  models/      # Data layer
  middleware/  # Auth, logging, error handling
  utils/       # Helpers
  config/      # Env, DB config</code></pre>
<h2>Security Foundations</h2>
<pre><code class="language-javascript">import express    from 'express';
import helmet     from 'helmet';
import cors       from 'cors';
import rateLimit  from 'express-rate-limit';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') }));
app.use(express.json({ limit: '10mb' }));

// Rate limiting — protect against brute force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: { error: 'Too many requests, slow down.' }
});
app.use('/api/', limiter);</code></pre>
<h2>Structured Error Handling</h2>
<pre><code class="language-javascript">// Custom error class
class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
  }
}

// Global error middleware
export function errorHandler(err, req, res, next) {
  const { statusCode = 500, message, code = 'INTERNAL_ERROR' } = err;
  
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    error: { code, message: err.isOperational ? message : 'Something went wrong.' }
  });
}</code></pre>
<h2>Request Validation</h2>
<pre><code class="language-javascript">import { z } from 'zod';

const CreateUserSchema = z.object({
  name:  z.string().min(2).max(50),
  email: z.string().email(),
  role:  z.enum(['admin', 'user']).default('user'),
});

export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }
    req.validated = result.data;
    next();
  };
}</code></pre>
<h2>JWT Authentication Middleware</h2>
<pre><code class="language-javascript">import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided.' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
}</code></pre>
<h2>Database Queries</h2>
<pre><code class="language-javascript">// Always parameterise — never interpolate
const getUserById = async (id) => {
  const [rows] = await pool.query(
    'SELECT id, name, email, role FROM users WHERE id = ? AND deleted_at IS NULL',
    [id]
  );
  return rows[0] ?? null;
};

// Pagination helper
const paginate = async (query, params, { page = 1, limit = 20 } = {}) => {
  const offset = (page - 1) * limit;
  const [rows]  = await pool.query(query + ' LIMIT ? OFFSET ?', [...params, limit, offset]);
  const [[{ total }]] = await pool.query('SELECT FOUND_ROWS() as total');
  return { data: rows, meta: { page, limit, total, pages: Math.ceil(total / limit) } };
};</code></pre>
<h2>Conclusion</h2>
<p>Scalable APIs are built on consistent patterns: proper error handling, input validation, security middleware, and clean separation of concerns. These foundations let your team move fast without breaking things as the codebase grows.</p>
    `
  },
  4: {
    title: 'Modern CSS Grid Layouts Made Simple',
    category: 'CSS',
    date: 'December 5, 2024',
    readTime: '6',
    views: '950',
    likes: '67',
    image: 'https://static.vecteezy.com/system/resources/previews/051/336/376/non_2x/css-programming-transparent-logo-free-png.png',
    tags: ['CSS Grid', 'Layout', 'Responsive', 'Web Design'],
    content: `
<p>CSS Grid is one of the most powerful layout systems the web has ever had. Yet many developers still reach for flexbox for everything or rely on heavy grid frameworks. Let's fix that.</p>
<h2>The Mental Model</h2>
<p>Think of Grid as a table you define explicitly. You set up tracks (rows and columns), then place items in them — or let the browser auto-place them.</p>
<pre><code class="language-css">.grid {
  display: grid;
  /* 3 equal columns */
  grid-template-columns: repeat(3, 1fr);
  /* Named rows */
  grid-template-rows: auto 1fr auto;
  gap: 1.5rem;
}</code></pre>
<h2>Named Grid Areas — The Most Readable Layout</h2>
<pre><code class="language-css">.layout {
  display: grid;
  grid-template-areas:
    "header  header  header"
    "sidebar main    main"
    "footer  footer  footer";
  grid-template-columns: 250px 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 1rem;
}

.header  { grid-area: header;  }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main;    }
.footer  { grid-area: footer;  }</code></pre>
<h2>Responsive Without Media Queries</h2>
<pre><code class="language-css">/* Auto-fill: as many columns as fit at 280px min */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* auto-fit collapses empty tracks — better for centered items */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}</code></pre>
<h2>Spanning Items Across Tracks</h2>
<pre><code class="language-css">.hero {
  grid-column: 1 / -1; /* full width */
  grid-row: 1 / 3;     /* spans 2 rows */
}

/* Named lines */
.container {
  grid-template-columns: [start] 1fr [center] 1fr [end];
}
.wide-item {
  grid-column: start / end;
}</code></pre>
<h2>Layered Layouts with Grid</h2>
<pre><code class="language-css">/* Place multiple items in the same cell — like absolute positioning but in flow */
.stacked {
  display: grid;
}
.stacked > * {
  grid-area: 1 / 1; /* all children overlap */
}
.stacked .overlay {
  z-index: 1;
  background: rgba(0,0,0,0.5);
  display: grid;
  place-items: center;
}</code></pre>
<h2>Grid + Subgrid (Modern Browsers)</h2>
<pre><code class="language-css">/* Cards that align content across rows */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1.5rem;
}
.card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid; /* inherit parent rows */
}
/* Now all card titles/descriptions/footers align! */</code></pre>
<h2>Conclusion</h2>
<p>CSS Grid shines for two-dimensional layouts, named area templates, and responsive designs that would otherwise require complex media queries. Combine it with Flexbox for one-dimensional component internals and you'll rarely need a CSS framework again.</p>
    `
  }
};

// ── Load Article ─────────────────────────────────────────
function getArticleId() {
  return new URLSearchParams(window.location.search).get('id') || '1';
}

function loadArticle() {
  const id = getArticleId();
  const article = ARTICLES[id];
  if (!article) { window.location.href = 'articles.html'; return; }

  document.title = `${article.title} — Abdulbasit Ziyayev`;
  document.getElementById('page-title').textContent = document.title;
  document.getElementById('breadcrumb-title').textContent = article.title.length > 40 ? article.title.slice(0,40) + '…' : article.title;
  document.getElementById('header-category').textContent = article.category;
  document.getElementById('header-title').textContent = article.title;
  document.getElementById('header-date').textContent = article.date;
  document.getElementById('header-read-time').textContent = article.readTime;
  document.getElementById('header-views').textContent = article.views;
  document.getElementById('header-likes').textContent = article.likes;

  const img = document.getElementById('featured-image');
  img.src = article.image;
  img.alt = article.title;

  document.getElementById('article-body').innerHTML = article.content;

  document.getElementById('article-tags').innerHTML =
    article.tags.map(t => `<span class="tag-item">${t}</span>`).join('');

  buildTOC();
  buildRelated(id);

  if (typeof Prism !== 'undefined') Prism.highlightAll();
}

// ── Table of Contents ────────────────────────────────────
function buildTOC() {
  const headings = document.querySelectorAll('.article-body h2');
  const list = document.getElementById('toc-list');
  if (!headings.length) { document.querySelector('.toc-card').style.display = 'none'; return; }

  headings.forEach((h, i) => {
    h.id = `section-${i}`;
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#section-${i}`;
    a.textContent = h.textContent;
    a.addEventListener('click', e => {
      e.preventDefault();
      h.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    li.appendChild(a);
    list.appendChild(li);
  });

  const tocLinks = list.querySelectorAll('a');
  window.addEventListener('scroll', () => {
    let active = '';
    headings.forEach(h => { if (window.scrollY >= h.offsetTop - 160) active = h.id; });
    tocLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${active}`));
  });
}

// ── Related Articles ──────────────────────────────────────
function buildRelated(currentId) {
  const grid = document.getElementById('related-grid');
  const others = Object.entries(ARTICLES).filter(([id]) => id !== currentId).slice(0, 3);
  grid.innerHTML = others.map(([id, a]) => `
    <a href="article-detail.html?id=${id}" class="rel-card">
      <img src="${a.image}" alt="${a.title}">
      <div class="rel-card-body">
        <span class="rel-cat">${a.category}</span>
        <div class="rel-title">${a.title}</div>
      </div>
    </a>
  `).join('');
}

// ── Read Progress Bar ─────────────────────────────────────
window.addEventListener('scroll', () => {
  const bar = document.getElementById('readProgress');
  if (!bar) return;
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  bar.style.width = ((scrollTop / (scrollHeight - clientHeight)) * 100) + '%';
});

// ── Sidebar Actions ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadArticle();

  // Like
  const likeBtn = document.getElementById('like-btn');
  likeBtn?.addEventListener('click', () => {
    const liked = likeBtn.classList.toggle('liked');
    likeBtn.innerHTML = liked ? '<i class="fas fa-heart"></i> Liked' : '<i class="far fa-heart"></i> Like';
    showNotification(liked ? 'Article liked!' : 'Like removed');
  });

  // Bookmark
  const bookmarkBtn = document.getElementById('bookmark-btn');
  bookmarkBtn?.addEventListener('click', () => {
    const saved = bookmarkBtn.classList.toggle('liked');
    bookmarkBtn.innerHTML = saved ? '<i class="fas fa-bookmark"></i> Saved' : '<i class="far fa-bookmark"></i> Save';
    showNotification(saved ? 'Article saved!' : 'Removed from saved');
  });

  // Share sidebar
  document.getElementById('share-sidebar-btn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
    showNotification('Link copied!');
  });

  // Share buttons
  document.querySelectorAll('.shr-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const platform = btn.dataset.platform;
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.getElementById('header-title').textContent);
      if (platform === 'twitter') window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
      else if (platform === 'linkedin') window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
      else if (platform === 'copy') {
        navigator.clipboard.writeText(window.location.href);
        btn.classList.add('copy-done');
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => { btn.classList.remove('copy-done'); btn.innerHTML = '<i class="fas fa-link"></i> Copy Link'; }, 2500);
        showNotification('Link copied to clipboard!');
      }
    });
  });
});
