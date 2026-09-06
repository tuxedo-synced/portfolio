// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal, .stagger');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== NAVBAR SCROLL STYLE =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(0, 10, 22, 0.95)';
  } else {
    navbar.style.background = 'rgba(0, 15, 31, 0.7)';
  }
});

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAs.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--cyan)';
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ===== EMAILJS CONTACT FORM =====
const form   = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Disable button & show loading state
  const btn = form.querySelector('.btn-send');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  emailjs.send('service_09nvkqh', 'template_y71xy2i', {
    from_name : name,
    reply_to  : email,
    subject   : subject,
    message   : message
  }, 'bi1MeJkvcC4v07woGEHHd')

  .then(() => {
    // Success
    status.style.display    = 'block';
    status.style.background = 'rgba(0,229,255,0.1)';
    status.style.border     = '1px solid rgba(0,229,255,0.25)';
    status.style.color      = 'var(--cyan)';
    status.textContent      = '✅ Message sent! I\'ll get back to you soon.';
    form.reset();
    btn.disabled    = false;
    btn.innerHTML   = '<i class="fas fa-paper-plane"></i> Send Message';
    setTimeout(() => { status.style.display = 'none'; }, 5000);
  })

  .catch((err) => {
    console.error('Status:', err.status, '| Reason:', err.text);
    status.style.display    = 'block';
    status.style.background = 'rgba(255,50,50,0.1)';
    status.style.border     = '1px solid rgba(255,50,50,0.3)';
    status.style.color      = '#ff6b6b';
    status.textContent      = '❌ Failed to send. Please try again.';
    btn.disabled  = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
  });

});