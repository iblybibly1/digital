/* =========================================
   HERO SCROLL — VIDEO SCRUBBING & EXPANSION
   ========================================= */

(function () {
  const wrapper   = document.getElementById('heroScrollWrapper');
  const videoFrame = document.getElementById('videoFrame');
  const video     = document.getElementById('heroVideo');
  const heroText  = document.getElementById('heroText');
  const scrollHint = document.getElementById('scrollHint');
  const progressFill = document.getElementById('videoProgressFill');

  if (!wrapper || !videoFrame || !video) return;

  // --- Config ---
  // The video will go from its natural CSS size (55vw) up to 100vw/100vh
  // borderRadius from 18px → 0px
  // heroText fades out from progress 0 → 0.35
  // scrollHint fades out from progress 0 → 0.2

  let rafId = null;
  let lastProgress = -1;

  function getProgress() {
    const wrapperTop    = wrapper.getBoundingClientRect().top + window.scrollY;
    const wrapperHeight = wrapper.offsetHeight;
    const viewportH     = window.innerHeight;
    const scrollY       = window.scrollY;

    // Scroll range: from when sticky area starts to when it ends
    const scrollStart = wrapperTop;                          // top of wrapper
    const scrollEnd   = wrapperTop + wrapperHeight - viewportH; // last scroll position inside wrapper

    const raw = (scrollY - scrollStart) / (scrollEnd - scrollStart);
    return Math.max(0, Math.min(1, raw));
  }

  function applyProgress(p) {
    if (Math.abs(p - lastProgress) < 0.001) return;
    lastProgress = p;

    // --- VIDEO TIME ---
    if (video.readyState >= 1 && video.duration > 0) {
      const targetTime = p * video.duration;
      // Only seek if meaningfully different (avoids jitter)
      if (Math.abs(video.currentTime - targetTime) > 0.05) {
        video.currentTime = targetTime;
      }
      progressFill.style.width = (p * 100) + '%';
    }

    // --- VIDEO FRAME SCALE ---
    // At p=0: scale(1) — natural CSS size (55vw)
    // At p=1: frame covers entire viewport
    // We calculate the scale needed to fill the screen
    const frameEl = videoFrame;
    const frameW  = frameEl.offsetWidth || frameEl.getBoundingClientRect().width;
    const frameH  = frameEl.offsetHeight || frameEl.getBoundingClientRect().height;
    const vw      = window.innerWidth;
    const vh      = window.innerHeight;

    // scale needed to cover viewport (cover, not contain)
    const scaleToFillW = vw / (frameW || 1);
    const scaleToFillH = vh / (frameH || 1);
    const maxScale     = Math.max(scaleToFillW, scaleToFillH);

    const scale = 1 + (maxScale - 1) * easeInOut(p);
    frameEl.style.transform = `translate(-50%, -50%) scale(${scale})`;
    frameEl.style.left = '50%';
    frameEl.style.top  = '50%';
    frameEl.style.position = 'absolute';

    // --- BORDER RADIUS ---
    const radius = 18 * (1 - easeInOut(p));
    frameEl.style.borderRadius = radius + 'px';

    // --- CORNER & LABEL OPACITY ---
    const decorOpacity = 1 - easeInOut(Math.min(p * 3, 1));
    document.querySelectorAll('.video-corner, .video-label, .video-progress-bar').forEach(el => {
      el.style.opacity = decorOpacity;
    });

    // --- HERO TEXT FADE ---
    const textOpacity  = Math.max(0, 1 - p * 3.5);
    const textTranslate = p * -40;
    heroText.style.opacity   = textOpacity;
    heroText.style.transform = `translateY(calc(-50% + ${textTranslate}px))`;
    heroText.style.pointerEvents = textOpacity < 0.1 ? 'none' : 'auto';

    // --- SCROLL HINT FADE ---
    if (scrollHint) {
      scrollHint.style.opacity = Math.max(0, 1 - p * 6);
    }
  }

  // Ease in-out cubic
  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function onScroll() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      applyProgress(getProgress());
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Apply on load
  applyProgress(getProgress());

  // Re-apply on resize
  window.addEventListener('resize', () => {
    lastProgress = -1; // force redraw
    applyProgress(getProgress());
  });

  // --- Ensure video loads metadata before first interaction ---
  video.addEventListener('loadedmetadata', () => {
    applyProgress(getProgress());
  });

  // Prevent video from auto-playing
  video.pause();

})();
