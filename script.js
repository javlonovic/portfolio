/* ============================================================
   ABDULBASIT ZIYAYEV — Portfolio JS
   Custom cursor · Canvas particles · Typewriter · Counters
   Scroll reveals · Skill bars · Nav scroll · Marquee clone
============================================================ */

// ── Cursor ───────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .pc, .wc, .sg').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    cursorFollower.style.opacity = '0';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorFollower.style.opacity = '1';
  });
});

// ── Navbar scroll ────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile Menu ──────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.m-link').forEach(l => {
  l.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ── Canvas Particles ─────────────────────────────────────
const canvas = document.getElementById('heroCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.2 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,229,160,${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,229,160,${0.08 * (1 - dist/100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(loop);
  }
  loop();
}

// ── Typewriter ───────────────────────────────────────────
const roles = [
  'Full Stack Developer',
  'Python / Django Engineer',
  'Vue.js & Flutter Builder',
  'SaaS Product Creator',
  'Open to Big Tech Roles'
];
const roleEl = document.getElementById('roleText');
if (roleEl) {
  let ri = 0, ci = 0, deleting = false;
  function type() {
    const current = roles[ri];
    if (!deleting) {
      roleEl.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) { deleting = true; setTimeout(type, 2200); return; }
    } else {
      roleEl.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(type, deleting ? 40 : 80);
  }
  setTimeout(type, 1400);
}

// ── Counter Animation ────────────────────────────────────
function animateCount(el) {
  const target = +el.dataset.target;
  const dur = 1600;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

// ── Marquee Clone (seamless) ─────────────────────────────
const mInner = document.getElementById('marqueeInner');
if (mInner) {
  const clone = mInner.cloneNode(true);
  mInner.parentNode.appendChild(clone);
}

// ── Intersection Observer — Reveals + Skill bars + Counters ──
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    // stagger siblings
    const siblings = el.parentNode.querySelectorAll('.reveal');
    let delay = 0;
    siblings.forEach((s, idx) => { if (s === el) delay = idx * 80; });
    setTimeout(() => el.classList.add('visible'), delay);

    // Skill bars
    el.querySelectorAll('.si-fill').forEach(bar => {
      setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, delay + 200);
    });
    // Counters
    el.querySelectorAll('.hc-n').forEach(c => animateCount(c));

    revealObs.unobserve(el);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// Also observe hero counters separately (not reveal class)
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.hc-n').forEach(c => animateCount(c));
    counterObs.unobserve(entry.target);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.hero-counters').forEach(el => counterObs.observe(el));

// ── Active nav on scroll ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) cur = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === `#${cur}`);
  });
});

// ── Smooth scroll for anchor links ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Notification ─────────────────────────────────────────
function showNotification(msg, type = 'success') {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  const n = document.createElement('div');
  n.className = 'notification';
  n.style.cssText = `
    position:fixed;top:24px;right:24px;z-index:10000;
    background:${type==='success'?'var(--accent)':'#ef4444'};
    color:${type==='success'?'var(--bg)':'#fff'};
    font-family:var(--font-m);font-size:0.82rem;letter-spacing:0.04em;
    padding:0.9rem 1.5rem;border-radius:8px;
    box-shadow:0 8px 24px rgba(0,0,0,0.3);
    transform:translateX(120%);transition:transform 0.3s var(--ease);
  `;
  n.textContent = msg;
  document.body.appendChild(n);
  setTimeout(() => n.style.transform = 'translateX(0)', 50);
  setTimeout(() => { n.style.transform = 'translateX(120%)'; setTimeout(() => n.remove(), 300); }, 4000);
}

console.log('%c[ AZ ] Portfolio loaded ✓', 'color:#00e5a0;font-family:monospace;font-size:14px;font-weight:bold;');
