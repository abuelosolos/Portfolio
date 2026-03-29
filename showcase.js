// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
  a.addEventListener('click', function(e) {
    var target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 58, behavior: 'smooth' });
  });
});

// Slider init
document.querySelectorAll('.slider-wrap').forEach(function(wrap) {
  var track    = wrap.querySelector('.slider-track');
  var slides   = wrap.querySelectorAll('.slide');
  var prevBtn  = wrap.querySelector('.slider-btn.prev');
  var nextBtn  = wrap.querySelector('.slider-btn.next');
  var dotsWrap = wrap.querySelector('.slider-dots');
  var total    = slides.length;
  var current  = 0;
  var autoTimer;

  // Build dots
  slides.forEach(function(_, i) {
    var dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', function() { goTo(i); });
    dotsWrap.appendChild(dot);
  });

  // Build counter badge
  var counter = document.createElement('div');
  counter.className = 'slider-counter';
  wrap.appendChild(counter);

  function updateUI() {
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    wrap.querySelectorAll('.dot').forEach(function(d, i) {
      d.classList.toggle('active', i === current);
    });
    counter.textContent = (current + 1) + ' / ' + total;
  }

  function goTo(index) {
    current = (index + total) % total;
    updateUI();
    resetAuto();
  }

  prevBtn.addEventListener('click', function() { goTo(current - 1); });
  nextBtn.addEventListener('click', function() { goTo(current + 1); });

  // Keyboard arrows when slider is focused
  wrap.setAttribute('tabindex', '0');
  wrap.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  // Touch swipe
  var touchStartX = 0;
  wrap.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  wrap.addEventListener('touchend', function(e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });

  // Auto-advance every 5s — resetAuto clears before restarting to prevent stacking
  function startAuto() {
    autoTimer = setInterval(function() { goTo(current + 1); }, 5000);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  // Pause on hover, resume cleanly on leave
  wrap.addEventListener('mouseenter', function() { clearInterval(autoTimer); });
  wrap.addEventListener('mouseleave', function() { resetAuto(); });

  updateUI();
  startAuto();
});