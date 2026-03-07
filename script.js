/* =============================================
   DARK MODE
   ============================================= */
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

if (localStorage.getItem('theme') === 'dark' ||
  (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  html.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
});

/* =============================================
   MOBILE MENU
   ============================================= */
const mobileBtn  = document.getElementById('mobile-btn');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

mobileBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
});

document.addEventListener('click', e => {
  if (!mobileBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
    menuOpen = false;
    mobileMenu.classList.remove('open');
  }
});

/* =============================================
   SCROLL SPY & NAV HIGHLIGHT
   ============================================= */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        const active = link.dataset.section === id;
        link.classList.toggle('active', active);
        link.style.color = active ? '#00D4AA' : '';
      });
    }
  });
}, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }).observe
  && sections.forEach(s =>
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const active = link.dataset.section === id;
            link.classList.toggle('active', active);
            link.style.color = active ? '#00D4AA' : '';
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }).observe(s)
  );

/* =============================================
   SCROLL REVEAL
   ============================================= */
new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' })
  .observe && document.querySelectorAll('.reveal').forEach(el =>
    new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }).observe(el)
  );

/* =============================================
   NAV SCROLL GLASS EFFECT
   ============================================= */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  nav.style.paddingTop    = window.scrollY > 20 ? '8px'  : '16px';
  nav.style.paddingBottom = window.scrollY > 20 ? '8px'  : '16px';
});

/* =============================================
   SCOPE CURSOR
   ============================================= */
const cur = document.getElementById('cursor');
if (cur) {
  let curX = window.innerWidth  / 2;
  let curY = window.innerHeight / 2;
  let aimX = curX, aimY = curY;

  document.addEventListener('mousemove', e => { aimX = e.clientX; aimY = e.clientY; });

  (function moveCursor() {
    curX += (aimX - curX) * 0.18;
    curY += (aimY - curY) * 0.18;
    cur.style.left = curX + 'px';
    cur.style.top  = curY + 'px';
    requestAnimationFrame(moveCursor);
  })();

  document.querySelectorAll('a, button, .project-card, .flip-card').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cur.classList.remove('hovered'));
  });

  document.addEventListener('mousedown', () => cur.classList.add('clicking'));
  document.addEventListener('mouseup',   () => cur.classList.remove('clicking'));
}

/* =============================================
   SKILL FILTER
   ============================================= */
function filterSkills(cat) {
  document.querySelectorAll('.skill-filter-btn').forEach(b => {
    const on = b.dataset.filter === cat;
    b.classList.toggle('bg-accent',        on);
    b.classList.toggle('text-zinc-900',    on);
    b.classList.toggle('border-0',         on);
    b.classList.toggle('active-filter',    on);
    b.classList.toggle('border',           !on);
    b.classList.toggle('border-zinc-200',  !on);
  });

  document.querySelectorAll('.skill-card').forEach(card => {
    const show = cat === 'all' || card.dataset.cat === cat;
    card.style.opacity       = show ? '1'    : '0.2';
    card.style.pointerEvents = show ? ''     : 'none';
  });
}

/* =============================================
   PROJECT FILTER
   ============================================= */
function filterProjects(btn, category) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  let visibleCount = 0;
  document.querySelectorAll('#projects-grid .project-card:not(.cta-card)').forEach(card => {
    const match = category === 'all' || card.dataset.category === category;
    if (match) {
      card.classList.remove('hidden-card');
      card.style.animationDelay = `${visibleCount * 60}ms`;
      card.classList.remove('fade-in');
      void card.offsetWidth;
      card.classList.add('fade-in');
      visibleCount++;
    } else {
      card.classList.add('hidden-card');
      card.classList.remove('fade-in');
    }
  });

  const emptyState = document.getElementById('empty-state');
  if (emptyState) emptyState.classList.toggle('hidden', visibleCount > 0);
}

/* =============================================
   CONTACT FORM
   ============================================= */
function sendMessage() {
  const btn = document.getElementById('send-btn');
  if (!btn) return;
  btn.innerHTML = '<span>Sending...</span>';
  btn.disabled  = true;

  setTimeout(() => {
    btn.innerHTML = '<span>Sent! ✓</span>';
    btn.classList.replace('bg-accent', 'bg-green-500');
    setTimeout(() => {
      btn.innerHTML = '<span>Send Message</span><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>';
      btn.disabled  = false;
      btn.classList.replace('bg-green-500', 'bg-accent');
    }, 2500);
  }, 1200);
}

/* =============================================
   HERO ANIMATIONS
   ============================================= */
document.querySelectorAll('[style*="opacity:0"]').forEach((el, i) => {
  setTimeout(() => { el.style.animationPlayState = 'running'; }, i * 100);
});

/* =============================================
   TYPING ANIMATION
   ============================================= */
(function () {
  const WORDS = [
    'Web Developer',
    'IoT Engineer',
    'Smart Farm Builder',
    'Full-Stack Dev',
    'Backend Architect',
    'Laravel Craftsman',
    'API Designer',
  ];
  const TYPE_SPEED   = 75;
  const DELETE_SPEED = 38;
  const PAUSE_AFTER  = 1800;
  const PAUSE_BEFORE = 280;

  const el = document.getElementById('typingTarget');
  if (!el) return;

  let wordIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    const word = WORDS[wordIdx];
    el.textContent = word.substring(0, charIdx);

    if (!deleting && charIdx === word.length) {
      setTimeout(() => { deleting = true; tick(); }, PAUSE_AFTER);
      return;
    }
    if (deleting && charIdx === 0) {
      deleting = false;
      wordIdx  = (wordIdx + 1) % WORDS.length;
      el.classList.add('typing-glitch');
      el.addEventListener('animationend', () => el.classList.remove('typing-glitch'), { once: true });
      setTimeout(tick, PAUSE_BEFORE);
      return;
    }
    charIdx += deleting ? -1 : 1;
    setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED);
  }
  setTimeout(tick, 1200);
})();

/* =============================================
   COUNTER ANIMATION (hero stats)
   ============================================= */
(function () {
  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const start    = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const current  = Math.floor(easeOutQuart(progress) * target);
      el.textContent = current + (progress === 1 ? suffix : '');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(c => io.observe(c));
})();

/* =============================================
   FLIP CARD + PHOTO SWITCHER
   ============================================= */
(function () {
  const PHOTOS = [
    'assets/img/DSC03541.JPEG',
    'assets/img/DSC03539.JPEG',
    'assets/img/DSC03538.JPEG',
  ];

  const FALLBACK = `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 340">
      <rect fill="#1a1d25" width="240" height="340"/>
      <circle cx="120" cy="140" r="60" fill="#00D4AA" opacity=".15"/>
      <ellipse cx="120" cy="300" rx="80" ry="50" fill="#00D4AA" opacity=".08"/>
    </svg>`
  )}`;

  let current   = 0;
  let isFlipped = false;
  let grabbed   = false;
  let tx = 0, ty = 0, lx = 0, ly = 0;

  const scene    = document.getElementById('scene');
  const tiltWrap = document.getElementById('tiltWrap');
  const flipCard = document.getElementById('flipCard');
  const flipLabel = document.getElementById('flipLabel');
  const glare    = document.getElementById('glare');
  const bcEl     = document.getElementById('backBarcode');
  const swEl     = document.getElementById('switcher');

  if (!scene || !flipCard) return;

  /* Barcode */
  if (bcEl) {
    [2,1,3,1,2,1,1,2,3,2,1,3,1,2,1,1,2,3,1,2].forEach((w, i) => {
      const s = document.createElement('span');
      s.style.cssText = `width:${w}px;height:${8 + Math.random() * 14}px;opacity:${i%2===0?.6:.3}`;
      bcEl.appendChild(s);
    });
  }

  /* Switcher dots */
  if (swEl) {
    PHOTOS.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'switcher-dot' + (i === 0 ? ' on' : '');
      d.addEventListener('click', e => { e.stopPropagation(); switchPhoto(i); });
      swEl.appendChild(d);
    });
  }

  function loadPhotos(src) {
    ['frontPhoto', 'backMiniPhoto'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.src = src;
      el.onerror = () => { el.src = FALLBACK; };
    });
  }

  function switchPhoto(idx) {
    if (idx === current) return;
    current = idx;
    const fp = document.getElementById('frontPhoto');
    if (!fp) return;
    fp.style.opacity   = '0';
    fp.style.transform = 'scale(1.06)';
    setTimeout(() => {
      loadPhotos(PHOTOS[idx]);
      fp.style.transition = 'opacity .4s ease, transform .4s ease';
      fp.style.opacity    = '1';
      fp.style.transform  = '';
    }, 200);
    document.querySelectorAll('.switcher-dot').forEach((d, i) => d.classList.toggle('on', i === idx));
  }

  loadPhotos(PHOTOS[0]);

  /* Flip */
  flipCard.addEventListener('click', () => {
    isFlipped = !isFlipped;
    flipCard.classList.toggle('flipped', isFlipped);
    if (flipLabel) flipLabel.textContent = isFlipped ? 'tap to flip back' : 'tap card to flip';
  });

  /* 3D Tilt */
  function lerp(a, b, t) { return a + (b - a) * t; }

  (function raf() {
    lx = lerp(lx, tx, 0.1);
    ly = lerp(ly, ty, 0.1);
    if (!grabbed) tiltWrap.style.transform = `rotateX(${ly}deg) rotateY(${lx}deg)`;
    requestAnimationFrame(raf);
  })();

  scene.addEventListener('mousemove', e => {
    const r  = scene.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
    const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
    tx = dx * 20; ty = -dy * 12;
    if (glare) {
      glare.style.setProperty('--gx', `${(dx * .5 + .5) * 100}%`);
      glare.style.setProperty('--gy', `${(dy * .5 + .5) * 100}%`);
    }
  });

  scene.addEventListener('mouseleave', () => { tx = 0; ty = 0; });

  scene.addEventListener('mousedown', () => {
    grabbed = true;
    tiltWrap.classList.replace('idle', 'held');
  });
  window.addEventListener('mouseup', () => {
    if (!grabbed) return;
    grabbed = false;
    tiltWrap.classList.replace('held', 'idle');
  });

  scene.addEventListener('touchmove', e => {
    const t  = e.touches[0];
    const r  = scene.getBoundingClientRect();
    const dx = (t.clientX - r.left - r.width  / 2) / (r.width  / 2);
    const dy = (t.clientY - r.top  - r.height / 2) / (r.height / 2);
    tx = dx * 20; ty = -dy * 12;
  }, { passive: true });
  scene.addEventListener('touchend', () => { tx = 0; ty = 0; });

  setInterval(() => {
    if (!grabbed) switchPhoto((current + 1) % PHOTOS.length);
  }, 4500);
})();

/* =============================================
   MUSIC PLAYER
   ============================================= */
(function () {
  const audio    = new Audio();
  const playlist = [];
  let trackIdx   = 0;
  let isPlaying  = false;

  const $ = id => document.getElementById(id);

  const playBtn        = $('playBtn');
  const playIcon       = $('playIcon');
  const pauseIcon      = $('pauseIcon');
  const prevBtn        = $('prevBtn');
  const nextBtn        = $('nextBtn');
  const musicTitle     = $('musicTitle');
  const musicArtist    = $('musicArtist');
  const musicBars      = $('musicBars');
  const musicFill      = $('musicFill');
  const musicProgress  = $('musicProgress');
  const musicTime      = $('musicTime');
  const playlistToggle = $('playlistToggle');
  const playlistDrop   = $('playlistDropdown');
  const playlistList   = $('playlistList');
  const playlistCount  = $('playlistCount');
  const musicUpload    = $('musicUpload');
  const minimizeBtn    = $('minimizeBtn');
  const musicPlayer    = $('musicPlayer');

  if (!playBtn) return;

  function fmt(s) {
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  }

  function loadTrack(idx) {
    if (!playlist.length) return;
    const t = playlist[idx];
    audio.src = t.url;
    if (musicTitle)  musicTitle.textContent  = t.name;
    if (musicArtist) musicArtist.textContent = t.artist || 'Local File';
    renderList();
  }

  function togglePlay() {
    if (!playlist.length) return;
    isPlaying ? audio.pause() : audio.play();
  }

  audio.addEventListener('play', () => {
    isPlaying = true;
    if (playIcon)  playIcon.style.display  = 'none';
    if (pauseIcon) pauseIcon.style.display = '';
    if (musicBars) musicBars.classList.add('playing');
  });

  audio.addEventListener('pause', () => {
    isPlaying = false;
    if (playIcon)  playIcon.style.display  = '';
    if (pauseIcon) pauseIcon.style.display = 'none';
    if (musicBars) musicBars.classList.remove('playing');
  });

  audio.addEventListener('ended', () => nextTrack());

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    if (musicFill) musicFill.style.width = pct + '%';
    if (musicTime) musicTime.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`;
  });

  if (musicProgress) {
    musicProgress.addEventListener('click', e => {
      const r = musicProgress.getBoundingClientRect();
      audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
    });
  }

  function prevTrack() {
    trackIdx = (trackIdx - 1 + playlist.length) % playlist.length;
    loadTrack(trackIdx);
    if (isPlaying) audio.play();
  }
  function nextTrack() {
    trackIdx = (trackIdx + 1) % playlist.length;
    loadTrack(trackIdx);
    if (isPlaying) audio.play();
  }

  playBtn.addEventListener('click', togglePlay);
  if (prevBtn) prevBtn.addEventListener('click', prevTrack);
  if (nextBtn) nextBtn.addEventListener('click', nextTrack);

  if (playlistToggle && playlistDrop) {
    playlistToggle.addEventListener('click', e => {
      e.stopPropagation();
      const open = playlistDrop.classList.toggle('open');
      playlistToggle.classList.toggle('open', open);
    });
    document.addEventListener('click', e => {
      if (!playlistDrop.contains(e.target) && e.target !== playlistToggle) {
        playlistDrop.classList.remove('open');
        playlistToggle.classList.remove('open');
      }
    });
  }

  /* Minimize */
  if (minimizeBtn && musicPlayer) {
    minimizeBtn.addEventListener('click', () => {
      musicPlayer.classList.toggle('minimized');
      const isMin = musicPlayer.classList.contains('minimized');
      minimizeBtn.querySelector('svg path').setAttribute('d',
        isMin
          ? 'M4 8h16v2H4V8zm4 5h8v2H8v-2z'
          : 'M19 13H5v-2h14v2z'
      );
    });
  }

  function renderList() {
    if (!playlistList) return;
    playlistList.innerHTML = '';
    if (!playlist.length) {
      playlistList.innerHTML = '<div class="playlist-empty">NO TRACKS YET</div>';
      if (playlistCount) playlistCount.textContent = '0 tracks';
      return;
    }
    if (playlistCount) playlistCount.textContent = `${playlist.length} track${playlist.length > 1 ? 's' : ''}`;
    playlist.forEach((t, i) => {
      const item = document.createElement('div');
      item.className = 'playlist-item' + (i === trackIdx ? ' active' : '');
      item.innerHTML = `
        <span class="playlist-item-num">${i === trackIdx ? '♪' : i + 1}</span>
        <div class="playlist-item-info">
          <div class="playlist-item-name">${t.name}</div>
        </div>
        <span class="playlist-item-dur">${t.dur || '--:--'}</span>`;
      item.addEventListener('click', () => {
        trackIdx = i;
        loadTrack(i);
        audio.play();
        if (playlistDrop) playlistDrop.classList.remove('open');
      });
      playlistList.appendChild(item);
    });
  }

  if (musicUpload) {
    musicUpload.addEventListener('change', e => {
      Array.from(e.target.files).forEach(file => {
        const url = URL.createObjectURL(file);
        const name = file.name.replace(/\.[^/.]+$/, '');
        const tmp  = new Audio(url);
        tmp.addEventListener('loadedmetadata', () => {
          const dur = `${Math.floor(tmp.duration / 60)}:${String(Math.floor(tmp.duration % 60)).padStart(2, '0')}`;
          playlist.push({ url, name, artist: 'Local File', dur });
          if (playlist.length === 1) loadTrack(0);
          else renderList();
        });
      });
      e.target.value = '';
    });
  }

  renderList();
})();

/* =============================================
   VISITOR COUNTER — SUPABASE
   ============================================= */
(function () {
  const SUPABASE_URL = 'https://zgmjxteuaiwuahijgrrm.supabase.co';
  const ANON_KEY     = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnbWp4dGV1YWl3dWFoaWpncnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MDkyMDEsImV4cCI6MjA4ODI4NTIwMX0.YVJx8yuyK-VxFtmd6FuwUo8UNYLahGA5yqOZGPMpRWY';

  const HEADERS = {
    'apikey':        ANON_KEY,
    'Authorization': `Bearer ${ANON_KEY}`,
    'Content-Type':  'application/json',
  };

  const digitEl    = document.getElementById('vcDigit');
  const SESSION_KEY = 'vc_counted';

  /* ── Format angka: 1234 → 1.234 ── */
  function fmt(n) {
    return Number(n).toLocaleString('id-ID');
  }

  /* ── Animasi hitung naik ── */
  function animateCount(el, from, to, duration) {
    if (!el) return;
    el.textContent = fmt(from);
    const start = performance.now();
    function ease(t) { return 1 - Math.pow(1 - t, 3); }
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = fmt(Math.round(from + (to - from) * ease(p)));
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = fmt(to);
    }
    requestAnimationFrame(step);
  }

  /* ── Tampilkan angka dari cache dulu (instant, tidak kosong) ── */
  const cached = parseInt(localStorage.getItem('vc_count') || '0', 10);
  if (cached && digitEl) digitEl.textContent = fmt(cached);

  /* ── Tentukan: increment atau hanya read ── */
  const isNewSession = !sessionStorage.getItem(SESSION_KEY);

  if (isNewSession) {
    /* Kunjungan baru → increment */
    fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_visitor`, {
      method:  'POST',
      headers: HEADERS,
      body:    JSON.stringify({}),
    })
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(data => {
        const raw = Array.isArray(data) ? data[0] : data;
        const num = typeof raw === 'object' ? (raw.count ?? raw) : raw;
        const n   = parseInt(num, 10);
        if (isNaN(n)) throw new Error('Invalid count: ' + JSON.stringify(data));

        localStorage.setItem('vc_count', n);
        sessionStorage.setItem(SESSION_KEY, '1');
        animateCount(digitEl, cached || 0, n, 1600);
      })
      .catch(err => {
        console.warn('[VisitorCounter] increment failed:', err);
        /* Fallback: ambil count tanpa increment */
        readCount();
      });
  } else {
    /* Sudah dihitung di tab ini → hanya baca count terbaru */
    readCount();
  }

  /* ── Baca count tanpa increment ── */
  function readCount() {
    fetch(`${SUPABASE_URL}/rest/v1/visitors?id=eq.1&select=count`, {
      headers: HEADERS,
    })
      .then(r => r.json())
      .then(data => {
        const n = parseInt(data[0]?.count, 10);
        if (isNaN(n)) throw new Error('No data');
        localStorage.setItem('vc_count', n);
        animateCount(digitEl, cached || 0, n, 1000);
      })
      .catch(() => {
        /* Tetap tampilkan dari cache kalau fetch gagal */
        if (digitEl && cached) animateCount(digitEl, 0, cached, 800);
        else if (digitEl)      digitEl.textContent = '—';
      });
  }

  /* ── Supabase Realtime — sync ke semua user ── */
  if (window.supabase) {
    window.supabase
      .createClient(SUPABASE_URL, ANON_KEY)
      .channel('visitor-count')
      .on('postgres_changes', {
        event:  'UPDATE',
        schema: 'public',
        table:  'visitors',
        filter: 'id=eq.1',
      }, payload => {
        const newCount = parseInt(payload.new.count, 10);
        const oldCount = parseInt(
          (digitEl?.textContent || '0').replace(/\./g, '').replace(/,/g, ''),
          10
        ) || 0;
        if (!isNaN(newCount)) {
          localStorage.setItem('vc_count', newCount);
          animateCount(digitEl, oldCount, newCount, 800);
        }
      })
      .subscribe();
  }
})();

(function () {

  /* ════════════════════════════════════════════
     DATA FOTO — ganti src & info sesuai kebutuhan
  ═════════════════════════════════════════════ */
  const PHOTOS = [
    { src: 'assets/img/DSC03541.JPEG', title: 'Deep in the Code',        caption: 'Late night debugging session',          cat: 'coding', size: 'h-lg'   },
    { src: 'assets/img/DSC03542.JPEG', title: 'ESP32 Wiring',            caption: 'Setting up sensor nodes for farm',      cat: 'iot',    size: 'h-md'   },
    { src: 'assets/img/DSC03543.JPEG', title: 'Team Hackathon',          caption: 'Building solutions under pressure',     cat: 'event',  size: 'h-wide' },
    { src: 'assets/img/DSC03538.JPEG', title: 'Smart Farm Deploy',       caption: 'Installing MQTT sensors on field',      cat: 'farm',   size: 'h-sm'   },
    { src: 'assets/img/DSC03539.JPEG', title: 'Coffee & Code',           caption: 'My daily ritual before shipping',       cat: 'life',   size: 'h-sq'   },
    { src: 'assets/img/DSC03541.JPEG', title: 'Dashboard Live',          caption: 'Real-time monitoring system online',    cat: 'iot',    size: 'h-md'   },
    { src: 'assets/img/DSC03542.JPEG', title: 'Tech Conference',         caption: 'Presenting IoT project to judges',      cat: 'event',  size: 'h-lg'   },
    { src: 'assets/img/DSC03543.JPEG', title: 'API Design Session',      caption: 'Whiteboarding backend architecture',    cat: 'coding', size: 'h-wide' },
    { src: 'assets/img/DSC03538.JPEG', title: 'Soil Sensor Test',        caption: 'Calibrating moisture detection unit',   cat: 'farm',   size: 'h-sm'   },
    { src: 'assets/img/DSC03539.JPEG', title: 'Team Photo',              caption: 'After a successful product launch',     cat: 'life',   size: 'h-md'   },
    { src: 'assets/img/DSC03541.JPEG', title: 'PCB Assembly',            caption: 'Hand-soldering custom IoT boards',      cat: 'iot',    size: 'h-sq'   },
    { src: 'assets/img/DSC03542.JPEG', title: 'Code Review',             caption: 'PR review with the team remotely',      cat: 'coding', size: 'h-sm'   },
    { src: 'assets/img/DSC03543.JPEG', title: 'Workshop Facilitator',    caption: 'Teaching web dev basics to juniors',    cat: 'event',  size: 'h-lg'   },
    { src: 'assets/img/DSC03538.JPEG', title: 'Harvest Day',             caption: 'Smart farm first successful harvest',   cat: 'farm',   size: 'h-wide' },
    { src: 'assets/img/DSC03539.JPEG', title: 'Workspace Setup',         caption: 'My battle station at home',             cat: 'life',   size: 'h-md'   },
    { src: 'assets/img/DSC03541.JPEG', title: 'Docker Deploy',           caption: 'Containerizing Laravel app to VPS',     cat: 'coding', size: 'h-sq'   },
  ];

  const track      = document.getElementById('galleryTrack');
  const dotsWrap   = document.getElementById('galDots');
  const btnLeft    = document.getElementById('galLeft');
  const btnRight   = document.getElementById('galRight');
  const filterBtns = document.querySelectorAll('.gal-filter');

  // Lightbox
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lbImg');
  const lbTitle   = document.getElementById('lbTitle');
  const lbCaption = document.getElementById('lbCaption');
  const lbCat     = document.getElementById('lbCat');
  const lbCounter = document.getElementById('lbCounter');
  const lbLoader  = document.getElementById('lbLoader');
  const lbClose   = document.getElementById('lbClose');
  const lbBackdrop= document.getElementById('lbBackdrop');
  const lbPrev    = document.getElementById('lbPrev');
  const lbNext    = document.getElementById('lbNext');

  let activeFilter  = 'all';
  let filteredItems = [];
  let lbIndex       = 0;

  /* ── Placeholder SVG ── */
  const PLACEHOLDER = `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220"><rect fill="#1a1d25" width="300" height="220"/><text x="150" y="115" text-anchor="middle" fill="#00D4AA" opacity=".2" font-size="48">⬜</text></svg>'
  )}`;

  /* ── Build track ── */
  function render() {
    filteredItems = activeFilter === 'all'
      ? PHOTOS.map((p, i) => ({ ...p, idx: i }))
      : PHOTOS.map((p, i) => ({ ...p, idx: i })).filter(p => p.cat === activeFilter);

    track.innerHTML = '';
    dotsWrap.innerHTML = '';

    filteredItems.forEach((photo, i) => {
      /* Item */
      const item = document.createElement('div');
      item.className = `gal-item ${photo.size || 'h-md'}`;
      item.style.animationDelay = `${i * 40}ms`;
      item.innerHTML = `
        <img class="gal-img" src="${photo.src}" alt="${photo.title}"
          loading="lazy"
          onerror="this.src='${PLACEHOLDER}'"/>
        <div class="gal-cat-badge">${photo.cat}</div>
        <div class="gal-overlay">
          <div class="gal-overlay-cat">${photo.cat}</div>
          <div class="gal-overlay-title">${photo.title}</div>
          <div class="gal-overlay-caption">${photo.caption}</div>
        </div>
        <div class="gal-zoom">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
          </svg>
        </div>`;
      item.addEventListener('click', () => openLightbox(i));
      track.appendChild(item);

      /* Dot (one per item) */
      const dot = document.createElement('button');
      dot.className = 'gal-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => scrollToItem(i));
      dotsWrap.appendChild(dot);
    });

    updateArrows();
  }

  /* ── Scroll helpers ── */
  function scrollToItem(idx) {
    const items = track.querySelectorAll('.gal-item');
    if (items[idx]) {
      items[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }

  function scrollBy(dir) {
    const w = track.clientWidth * 0.75;
    track.scrollBy({ left: dir * w, behavior: 'smooth' });
  }

  function updateArrows() {
    btnLeft.classList.toggle('hidden', track.scrollLeft <= 10);
    btnRight.classList.toggle('hidden',
      track.scrollLeft >= track.scrollWidth - track.clientWidth - 10
    );
  }

  /* ── Update active dot on scroll ── */
  track.addEventListener('scroll', () => {
    updateArrows();
    const items = track.querySelectorAll('.gal-item');
    const trackLeft = track.getBoundingClientRect().left;
    let closestIdx = 0;
    let closestDist = Infinity;
    items.forEach((item, i) => {
      const dist = Math.abs(item.getBoundingClientRect().left - trackLeft);
      if (dist < closestDist) { closestDist = dist; closestIdx = i; }
    });
    dotsWrap.querySelectorAll('.gal-dot').forEach((d, i) => d.classList.toggle('active', i === closestIdx));
  }, { passive: true });

  btnLeft.addEventListener('click',  () => scrollBy(-1));
  btnRight.addEventListener('click', () => scrollBy(1));

  /* ── Drag to scroll ── */
  let isDragging = false, dragStartX = 0, dragScrollLeft = 0;
  track.addEventListener('mousedown', e => {
    isDragging = true;
    dragStartX = e.pageX - track.offsetLeft;
    dragScrollLeft = track.scrollLeft;
    track.classList.add('dragging');
  });
  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = dragScrollLeft - (x - dragStartX);
  });
  document.addEventListener('mouseup', () => {
    isDragging = false;
    track.classList.remove('dragging');
  });

  /* ── Filter ── */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      render();
      track.scrollLeft = 0;
    });
  });

  /* ══════════ LIGHTBOX ══════════ */
  function openLightbox(idx) {
    lbIndex = idx;
    showLb(idx);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  function showLb(idx) {
    const photo = filteredItems[idx];
    if (!photo) return;
    lbLoader.classList.add('show');
    lbImg.classList.add('loading');
    lbImg.onload  = () => { lbLoader.classList.remove('show'); lbImg.classList.remove('loading'); };
    lbImg.onerror = () => { lbLoader.classList.remove('show'); lbImg.classList.remove('loading'); };
    lbImg.src           = photo.src;
    lbTitle.textContent   = photo.title;
    lbCaption.textContent = photo.caption;
    lbCat.textContent     = photo.cat;
    lbCounter.textContent = `${idx + 1} / ${filteredItems.length}`;
    lbPrev.style.opacity = idx === 0 ? '0.2' : '1';
    lbNext.style.opacity = idx === filteredItems.length - 1 ? '0.2' : '1';
  }

  lbClose.addEventListener('click',    closeLightbox);
  lbBackdrop.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => { if (lbIndex > 0) showLb(--lbIndex); });
  lbNext.addEventListener('click', () => { if (lbIndex < filteredItems.length - 1) showLb(++lbIndex); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft'  && lbIndex > 0) showLb(--lbIndex);
    if (e.key === 'ArrowRight' && lbIndex < filteredItems.length - 1) showLb(++lbIndex);
  });

  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0 && lbIndex < filteredItems.length - 1) showLb(++lbIndex);
      if (dx > 0 && lbIndex > 0) showLb(--lbIndex);
    }
  });

  /* ── Init ── */
  render();

})();

(function () {
  const preloader = document.getElementById('preloader');
  const bar       = document.getElementById('preBar');

  let p = 0;

  function tick() {
    /* Organic speed: fast start, slow middle, fast end */
    const speed = p < 30 ? 1.8 : p < 75 ? .6 : 1.4;
    p = Math.min(p + speed * (Math.random() * .8 + .6), 100);
    bar.style.width = p + '%';

    if (p < 100) {
      setTimeout(tick, 22 + Math.random() * 28);
    } else {
      const dismiss = () => {
        preloader.classList.add('hide');
        setTimeout(() => preloader.remove(), 750);
      };
      if (document.readyState === 'complete') {
        setTimeout(dismiss, 350);
      } else {
        window.addEventListener('load', () => setTimeout(dismiss, 250), { once: true });
        setTimeout(dismiss, 3500); /* safety */
      }
    }
  }

  tick();
})();

const EMAILJS_PUBLIC_KEY  = 'pf2snRr0nwievjVoE';   // ← Settings → General → Public Key
const EMAILJS_SERVICE_ID  = 'service_2htg16a';   // ← Email Services → Service ID
const EMAILJS_TEMPLATE_ID = 'template_xi5gcbr';  // ← Email Templates → Template ID
/* ════════════════════════════════════════════ */

/* Init EmailJS */
(function () {
  if (window.emailjs) emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
})();

/* ── Toast helper ── */
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  toastMsg.textContent = msg;
  toast.className = `toast ${type} show`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ── Validate ── */
function validateForm() {
  const fields = [
    { id: 'cf-name',    label: 'Name'    },
    { id: 'cf-email',   label: 'Email'   },
    { id: 'cf-subject', label: 'Subject' },
    { id: 'cf-message', label: 'Message' },
  ];
  let valid = true;
  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const empty = !el.value.trim();
    const emailBad = f.id === 'cf-email' && el.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value);
    if (empty || emailBad) {
      el.classList.add('error');
      valid = false;
    } else {
      el.classList.remove('error');
    }
  });
  if (!valid) showToast('Please fill all fields correctly.', 'error');
  return valid;
}

/* ── Send ── */
async function sendMessage() {
  if (!validateForm()) return;

  const btn     = document.getElementById('cf-submit');
  const btnText = document.getElementById('cf-btn-text');
  const btnIcon = document.getElementById('cf-btn-icon');

  /* Loading state */
  btn.disabled = true;
  btnText.textContent = 'Sending...';
  btnIcon.innerHTML = `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="32" stroke-dashoffset="32" style="animation:spin .7s linear infinite;transform-origin:center"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur=".7s" repeatCount="indefinite"/></circle>`;

  const params = {
    from_name:  document.getElementById('cf-name').value.trim(),
    from_email: document.getElementById('cf-email').value.trim(),
    subject:    document.getElementById('cf-subject').value.trim(),
    message:    document.getElementById('cf-message').value.trim(),
  };

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);

    /* Success */
    document.getElementById('contactForm').classList.add('hidden');
    const success = document.getElementById('contactSuccess');
    success.classList.remove('hidden');
    success.classList.add('flex');
    showToast('✓ Message sent successfully!', 'success');

  } catch (err) {
    console.error('[EmailJS]', err);
    showToast('Failed to send. Please try again.', 'error');

    /* Reset button */
    btn.disabled = false;
    btnText.textContent = 'Send Message';
    btnIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>`;
  }
}

/* ── Reset form ── */
function resetContactForm() {
  ['cf-name','cf-email','cf-subject','cf-message'].forEach(id => {
    const el = document.getElementById(id);
    el.value = '';
    el.classList.remove('error');
  });
  const btn = document.getElementById('cf-submit');
  btn.disabled = false;
  document.getElementById('cf-btn-text').textContent = 'Send Message';
  document.getElementById('contactForm').classList.remove('hidden');
  const success = document.getElementById('contactSuccess');
  success.classList.add('hidden');
  success.classList.remove('flex');
}

/* ── Remove error class on input ── */
['cf-name','cf-email','cf-subject','cf-message'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', function () {
    this.classList.remove('error');
  });
});

(function () {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  /* Show/hide + update scroll progress ring */
  window.addEventListener('scroll', () => {
    const scrollY  = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct      = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

    btn.style.setProperty('--scroll-pct', pct + '%');
    btn.classList.toggle('visible', scrollY > 400);
  }, { passive: true });

  /* Smooth scroll to top */
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
