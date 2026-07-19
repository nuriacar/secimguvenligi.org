(function () {
  var html = document.documentElement;
  var stored = localStorage.getItem('mode');
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var mode = stored === 'dark' || stored === 'light' ? stored : (prefersDark ? 'dark' : 'light');
  html.setAttribute('data-mode', mode);
  updateIcon(mode);

  var btn = document.getElementById('mode-toggle');
  if (btn) {
    btn.addEventListener('click', function () {
      var current = html.getAttribute('data-mode');
      var next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-mode', next);
      localStorage.setItem('mode', next);
      updateIcon(next);
    });
  }

  function updateIcon(m) {
    if (!btn) return;
    btn.innerHTML = m === 'dark' ? '&#9788;' : '&#9790;';
    btn.setAttribute('aria-label', m === 'dark' ? 'Açık tema' : 'Koyu tema');
    btn.setAttribute('aria-pressed', m === 'dark' ? 'true' : 'false');
  }
})();

(function () {
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  var timer = null;
  var index = null;

  async function loadIndex() {
    if (index) return true;
    try {
      var res = await fetch('/search-index.json');
      var pages = await res.json();
      index = pages;
      return true;
    } catch (e) {
      return false;
    }
  }

  function normalize(s) {
    return s.replace(/[çÇ]/g, 'c').replace(/[ğĞ]/g, 'g').replace(/[ıİ]/g, 'i').replace(/[öÖ]/g, 'o').replace(/[şŞ]/g, 's').replace(/[üÜ]/g, 'u').toLowerCase();
  }

  function excerpt(text, q) {
    var n = normalize(text);
    var nq = normalize(q);
    var idx = n.indexOf(nq);
    if (idx === -1) {
      var words = normalize(q).split(/\s+/);
      for (var w = 0; w < words.length; w++) {
        idx = n.indexOf(words[w]);
        if (idx !== -1) break;
      }
    }
    if (idx === -1) return text.slice(0, 120) + '...';
    var start = Math.max(0, idx - 40);
    var end = Math.min(text.length, idx + q.length + 80);
    return (start > 0 ? '...' : '') + text.slice(start, end) + (end < text.length ? '...' : '');
  }

  async function search(q) {
    if (!q || q.length < 2) {
      results.style.display = 'none';
      results.innerHTML = '';
      return;
    }
    var ok = await loadIndex();
    if (!ok) {
      results.innerHTML = '<div class="search-result-empty">Arama dizini yüklenemedi.</div>';
      results.style.display = 'block';
      return;
    }
    var nq = normalize(q);
    var terms = nq.split(/\s+/).filter(function(t) { return t.length > 0; });
    var scored = [];
    for (var i = 0; i < index.length; i++) {
      var p = index[i];
      var nt = normalize(p.title + ' ' + p.content);
      var score = 0;
      var matchCount = 0;
      for (var t = 0; t < terms.length; t++) {
        var found = false;
        if (normalize(p.title).indexOf(terms[t]) !== -1) { score += 10; found = true; }
        var ci = nt.indexOf(terms[t]);
        if (ci !== -1) {
          score += 3;
          found = true;
          var occurrences = nt.split(terms[t]).length - 1;
          score += Math.min(occurrences, 10);
        }
        if (found) matchCount++;
      }
      if (matchCount < terms.length) score = 0;
      if (score > 0) scored.push({ page: p, score: score });
    }
    scored.sort(function (a, b) { return b.score - a.score; });
    if (scored.length === 0 && terms.length > 1) {
      for (var i = 0; i < index.length; i++) {
        var p = index[i];
        var nt = normalize(p.title + ' ' + p.content);
        var score = 0;
        for (var t = 0; t < terms.length; t++) {
          if (normalize(p.title).indexOf(terms[t]) !== -1) { score += 10; }
          var ci = nt.indexOf(terms[t]);
          if (ci !== -1) {
            score += 3;
            score += Math.min(nt.split(terms[t]).length - 1, 10);
          }
        }
        if (score > 0) scored.push({ page: p, score: score });
      }
      scored.sort(function (a, b) { return b.score - a.score; });
    }
    results.innerHTML = '';
    if (scored.length === 0) {
      results.innerHTML = '<div class="search-result-empty">Sonuç bulunamadı.</div>';
    } else {
      var shown = 0;
      for (var i = 0; i < scored.length && shown < 8; i++) {
        var p = scored[i].page;
        var a = document.createElement('a');
        a.href = p.url;
        a.className = 'search-result-item';
        var titleDiv = document.createElement('div');
        titleDiv.className = 'search-result-title';
        titleDiv.textContent = p.title;
        var excerptDiv = document.createElement('div');
        excerptDiv.className = 'search-result-excerpt';
        excerptDiv.textContent = excerpt(p.content, q);
        a.appendChild(titleDiv);
        a.appendChild(excerptDiv);
        a.addEventListener('click', function () {
          results.style.display = 'none';
          input.value = '';
        });
        results.appendChild(a);
        shown++;
      }
    }
    results.style.display = 'block';
  }

  if (input) {
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        search(input.value.trim());
      }, 200);
    });

    document.addEventListener('click', function (e) {
      var wrapper = document.getElementById('search-wrapper');
      if (wrapper && !wrapper.contains(e.target)) {
        results.style.display = 'none';
      }
    });

    input.addEventListener('focus', function () {
      if (input.value.trim().length >= 2) {
        search(input.value.trim());
      }
    });
  }
})();

(function () {
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      var isOpen = links.classList.contains('open');
      toggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
      toggle.setAttribute('aria-label', isOpen ? 'Menüyü kapa' : 'Menüyü aç/kapa');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('open');
        toggle.innerHTML = '&#9776;';
        toggle.setAttribute('aria-label', 'Menüyü aç/kapa');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        links.classList.remove('open');
        toggle.innerHTML = '&#9776;';
        toggle.setAttribute('aria-label', 'Menüyü aç/kapa');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }
})();

(function () {
  var btn = document.getElementById('easy-read-toggle');
  var html = document.documentElement;
  if (btn) {
    var stored = localStorage.getItem('easy-read');
    if (stored === 'true') {
      html.setAttribute('data-easy-read', '');
      btn.textContent = 'Normal Görünüm';
      btn.setAttribute('aria-pressed', 'true');
    }
    btn.addEventListener('click', function () {
      var on = html.hasAttribute('data-easy-read');
      if (on) {
        html.removeAttribute('data-easy-read');
        btn.textContent = 'Kolay Okuma';
        btn.setAttribute('aria-pressed', 'false');
        localStorage.setItem('easy-read', 'false');
      } else {
        html.setAttribute('data-easy-read', '');
        btn.textContent = 'Normal Görünüm';
        btn.setAttribute('aria-pressed', 'true');
        localStorage.setItem('easy-read', 'true');
      }
    });
  }
})();

(function () {
  var html = document.documentElement;
  var btnShrink = document.getElementById('font-shrink');
  var btnReset = document.getElementById('font-reset');
  var btnGrow = document.getElementById('font-grow');
  function setFontSize(size) {
    html.removeAttribute('data-font-size');
    if (size !== 'normal') html.setAttribute('data-font-size', size);
    localStorage.setItem('font-size', size);
    if (btnShrink && btnReset && btnGrow) {
      [btnShrink, btnReset, btnGrow].forEach(function (b) {
        b.className = 'font-btn';
        b.setAttribute('aria-pressed', 'false');
      });
      var active = size === 'small' ? btnShrink : size === 'large' ? btnGrow : btnReset;
      active.className = 'font-btn font-btn-active';
      active.setAttribute('aria-pressed', 'true');
    }
  }
  if (btnShrink && btnReset && btnGrow) {
    var stored = localStorage.getItem('font-size') || 'normal';
    setFontSize(stored);
    btnShrink.addEventListener('click', function () { setFontSize('small'); });
    btnReset.addEventListener('click', function () { setFontSize('normal'); });
    btnGrow.addEventListener('click', function () { setFontSize('large'); });
  }
})();

(function () {
  var btn = document.getElementById('contrast-toggle');
  var html = document.documentElement;
  if (btn) {
    var stored = localStorage.getItem('high-contrast');
    if (stored === 'true') {
      html.setAttribute('data-high-contrast', '');
      btn.className = 'contrast-btn contrast-btn-active';
      btn.setAttribute('aria-pressed', 'true');
    }
    btn.addEventListener('click', function () {
      var on = html.hasAttribute('data-high-contrast');
      if (on) {
        html.removeAttribute('data-high-contrast');
        btn.className = 'contrast-btn';
        btn.setAttribute('aria-pressed', 'false');
        localStorage.setItem('high-contrast', 'false');
      } else {
        html.setAttribute('data-high-contrast', '');
        btn.className = 'contrast-btn contrast-btn-active';
        btn.setAttribute('aria-pressed', 'true');
        localStorage.setItem('high-contrast', 'true');
      }
    });
  }

  var searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      return false;
    });
  }

  document.querySelectorAll('[data-action="print"]').forEach(function (el) {
    el.addEventListener('click', function () {
      window.print();
    });
  });
})();
