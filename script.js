/**
 * PORTOFOLIO DIGITAL LK 2: REFLEKSI PENGALAMAN BELAJAR MATA KULIAH
 * Script Controller - Sabda Patogi Aditya, S.Kom.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const mainNavbar = document.getElementById('mainNavbar');
  const themeToggle = document.getElementById('themeToggle');
  const viewSwitchBtn = document.getElementById('viewSwitchBtn');
  const btnPrintLk2 = document.getElementById('btnPrintLk2');
  const btnCopyLmsLink = document.getElementById('btnCopyLmsLink');
  const btnCopyInline = document.getElementById('btnCopyInline');
  const portfolioShareUrl = document.getElementById('portfolioShareUrl');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  // Mobile Drawer Elements
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerToggleModeBtn = document.getElementById('drawerToggleModeBtn');
  const drawerToggleText = document.getElementById('drawerToggleText');
  const drawerCopyLmsBtn = document.getElementById('drawerCopyLmsBtn');
  const drawerPrintBtn = document.getElementById('drawerPrintBtn');
  const drawerNavItems = document.querySelectorAll('.drawer-nav-item');

  // Modal Elements
  const pdfModal = document.getElementById('pdfModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDocTitle = document.getElementById('modalDocTitle');
  const pdfIframe = document.getElementById('pdfIframe');
  const modalDownloadBtn = document.getElementById('modalDownloadBtn');
  const modalDirectOpenBtn = document.getElementById('modalDirectOpenBtn');

  // --- 1. Scroll Progress Bar & Navbar Elevation ---
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = scrolled + '%';
    }

    if (mainNavbar) {
      if (winScroll > 30) {
        mainNavbar.classList.add('scrolled');
      } else {
        mainNavbar.classList.remove('scrolled');
      }
    }
  });

  // --- 2. Dynamic ScrollSpy for Nav Links ---
  const sections = document.querySelectorAll('section[id], div[id="pertemuan"]');
  const navLinks = document.querySelectorAll('.nav-links .nav-item');

  function updateActiveNavOnScroll() {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 180;

    sections.forEach(sec => {
      const secTop = sec.offsetTop;
      const secHeight = sec.offsetHeight;
      if (scrollPosition >= secTop && scrollPosition < secTop + secHeight) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSectionId) {
          link.classList.add('active');
        }
      });

      drawerNavItems.forEach(dLink => {
        dLink.classList.remove('active');
        if (dLink.getAttribute('href') === '#' + currentSectionId) {
          dLink.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveNavOnScroll);
  updateActiveNavOnScroll(); // initial check

  // --- 3. Theme Toggle (Light / Dark) ---
  const currentTheme = localStorage.getItem('theme') || 'theme-light';
  document.body.className = currentTheme;

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.contains('theme-dark');
      const newTheme = isDark ? 'theme-light' : 'theme-dark';
      document.body.className = newTheme;
      localStorage.setItem('theme', newTheme);
      showToast(isDark ? 'Mode Terang diaktifkan' : 'Mode Gelap diaktifkan');
    });
  }

  // --- 4. View Switcher (Interactive Web vs Formal LK 2) ---
  function toggleViewMode(forceMode = null) {
    const currentMode = viewSwitchBtn ? viewSwitchBtn.getAttribute('data-mode') : 'interactive';
    const targetMode = forceMode || (currentMode === 'interactive' ? 'formal' : 'interactive');

    const interactiveOpt = viewSwitchBtn ? viewSwitchBtn.querySelector('.opt-interactive') : null;
    const formalOpt = viewSwitchBtn ? viewSwitchBtn.querySelector('.opt-formal') : null;

    if (targetMode === 'formal') {
      document.body.classList.add('mode-formal');
      if (viewSwitchBtn) viewSwitchBtn.setAttribute('data-mode', 'formal');
      if (interactiveOpt) interactiveOpt.classList.remove('active');
      if (formalOpt) formalOpt.classList.add('active');
      if (drawerToggleText) drawerToggleText.textContent = 'Kembali ke Web Interaktif';
      showToast('Tampilan beralih ke Format Resmi LK 2 (Standar Cetak LPTK)');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.body.classList.remove('mode-formal');
      if (viewSwitchBtn) viewSwitchBtn.setAttribute('data-mode', 'interactive');
      if (formalOpt) formalOpt.classList.remove('active');
      if (interactiveOpt) interactiveOpt.classList.add('active');
      if (drawerToggleText) drawerToggleText.textContent = 'Buka Format Resmi LK 2';
      showToast('Tampilan beralih ke Portofolio Interaktif');
    }
  }

  if (viewSwitchBtn) {
    viewSwitchBtn.addEventListener('click', () => toggleViewMode());
  }

  if (drawerToggleModeBtn) {
    drawerToggleModeBtn.addEventListener('click', () => {
      toggleViewMode();
      closeDrawer();
    });
  }

  // --- 5. Mobile Drawer Menu Logic ---
  function openDrawer() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.add('active');
      drawerOverlay.classList.add('active');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      drawerOverlay.setAttribute('aria-hidden', 'false');
      if (hamburgerBtn) {
        hamburgerBtn.classList.add('active');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
      }
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.remove('active');
      drawerOverlay.classList.remove('active');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      drawerOverlay.setAttribute('aria-hidden', 'true');
      if (hamburgerBtn) {
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
      document.body.style.overflow = '';
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      if (mobileDrawer && mobileDrawer.classList.contains('active')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', closeDrawer);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  drawerNavItems.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // --- 6. Print LK 2 Document ---
  function printDocument() {
    window.print();
  }

  if (btnPrintLk2) btnPrintLk2.addEventListener('click', printDocument);
  if (drawerPrintBtn) {
    drawerPrintBtn.addEventListener('click', () => {
      closeDrawer();
      printDocument();
    });
  }

  // --- 7. Copy LMS Share Link ---
  function copyLinkToClipboard(url) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(() => {
        showToast('Tautan Portofolio LK 2 berhasil disalin! Siap ditempel ke LMS.');
      }).catch(() => {
        fallbackCopy(url);
      });
    } else {
      fallbackCopy(url);
    }
  }

  function fallbackCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast('Tautan Portofolio LK 2 berhasil disalin!');
  }

  if (btnCopyLmsLink) {
    btnCopyLmsLink.addEventListener('click', () => {
      const url = portfolioShareUrl ? portfolioShareUrl.value : window.location.href;
      copyLinkToClipboard(url);
    });
  }

  if (btnCopyInline) {
    btnCopyInline.addEventListener('click', () => {
      const url = portfolioShareUrl ? portfolioShareUrl.value : window.location.href;
      copyLinkToClipboard(url);
    });
  }

  if (drawerCopyLmsBtn) {
    drawerCopyLmsBtn.addEventListener('click', () => {
      const url = portfolioShareUrl ? portfolioShareUrl.value : window.location.href;
      copyLinkToClipboard(url);
      closeDrawer();
    });
  }

  // Toast Function
  let toastTimer;
  function showToast(msg) {
    if (!toastNotification) return;
    if (toastMessage) toastMessage.textContent = msg;
    toastNotification.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3500);
  }

  // --- 8. 4C Reflection Tab Switching ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // --- 9. Artifact Category Filter ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const artifactCards = document.querySelectorAll('.artifact-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      artifactCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 10. PDF Preview Modal Controller ---
  const previewButtons = document.querySelectorAll('.btn-preview-pdf');

  previewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filePath = btn.getAttribute('data-file');
      const fileTitle = btn.getAttribute('data-title') || 'Dokumen Artefak';

      if (modalDocTitle) modalDocTitle.textContent = fileTitle;
      if (pdfIframe) pdfIframe.src = filePath;
      if (modalDownloadBtn) modalDownloadBtn.href = filePath;
      if (modalDirectOpenBtn) modalDirectOpenBtn.href = filePath;

      if (pdfModal) {
        pdfModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (pdfModal) {
      pdfModal.classList.remove('active');
      if (pdfIframe) pdfIframe.src = '';
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (pdfModal) {
    pdfModal.addEventListener('click', (e) => {
      if (e.target === pdfModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pdfModal && pdfModal.classList.contains('active')) {
      closeModal();
    }
  });
});
