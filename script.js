// Contact form: build a mailto so it works with no backend
(function () {
  var btn = document.getElementById('cf-send');
  if (!btn) return;
  var note = document.getElementById('cf-note');

  btn.addEventListener('click', function () {
    var name = (document.getElementById('cf-name').value || '').trim();
    var email = (document.getElementById('cf-email').value || '').trim();
    var subject = (document.getElementById('cf-subject').value || '').trim();
    var message = (document.getElementById('cf-message').value || '').trim();

    if (!name || !email || !message) {
      if (note) { note.style.color = '#e0a13a'; note.textContent = 'Please fill in your name, email, and message.'; }
      return;
    }

    var subjectLine = subject ? subject : 'Message from portfolio site';
    var body =
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n\n' +
      message;

    var href = 'mailto:abrar.muhtasim.pathan@gmail.com' +
      '?subject=' + encodeURIComponent(subjectLine) +
      '&body=' + encodeURIComponent(body);

    window.location.href = href;
    if (note) { note.style.color = '#3fb6a8'; note.textContent = 'Opening your email app...'; }
  });
})();

// Year
var yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

// Animate skill bars when they scroll into view
(function () {
  var fills = document.querySelectorAll('.bar-track i');
  if (!fills.length) return;

  // Store target width, then reset to 0 so the transition can run
  fills.forEach(function (el) {
    el.dataset.target = el.style.width;
    el.style.width = '0%';
  });

  if (!('IntersectionObserver' in window)) {
    // Fallback: just show final widths
    fills.forEach(function (el) { el.style.width = el.dataset.target; });
    return;
  }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var el = e.target;
        el.style.width = el.dataset.target;
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.25 });

  fills.forEach(function (el) { obs.observe(el); });
})();

// Mobile nav
var toggle = document.getElementById('navToggle');
var nav = document.getElementById('nav');
if (toggle && nav) {
  toggle.addEventListener('click', function () {
    nav.classList.toggle('open');
    toggle.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.classList.remove('open');
    });
  });
}

// Lightbox for gallery images
(function () {
  var items = document.querySelectorAll('.gal-item');
  if (!items.length) return;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML =
    '<button class="lightbox-close" aria-label="Close">&times;</button>' +
    '<img alt="">' +
    '<div class="lightbox-cap"></div>';
  document.body.appendChild(box);

  var lbImg = box.querySelector('img');
  var lbCap = box.querySelector('.lightbox-cap');

  function open(src, cap) {
    lbImg.src = src;
    lbCap.textContent = cap || '';
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    box.classList.remove('open');
    document.body.style.overflow = '';
  }

  items.forEach(function (it) {
    it.addEventListener('click', function () {
      var img = it.querySelector('img');
      var cap = it.querySelector('.gal-cap');
      open(img.getAttribute('src'), cap ? cap.textContent : img.alt);
    });
  });

  box.addEventListener('click', function (e) {
    if (e.target === box || e.target.classList.contains('lightbox-close')) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();
