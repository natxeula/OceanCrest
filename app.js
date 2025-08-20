// OceanCrest Entertainment - Clean & Simple JavaScript
class OceanCrestApp {
  constructor() {
    this.isLoaded = false;
    this.scrollProgress = 0;
    this.theme = localStorage.getItem("theme") || "light";
    this.init();
  }

  init() {
    // Remove all fancy effects immediately
    this.removeFancyEffects();
    
    // Initialize basic functionality
    this.setupEventListeners();
    this.setupTheme();
    this.setupMobileNavigation();

    // Initialize after DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        this.initializeBasicFeatures(),
      );
    } else {
      this.initializeBasicFeatures();
    }
  }

  removeFancyEffects() {
    // Remove all particle systems and fancy effects
    const effectsToRemove = [
      '.particles',
      '.particle',
      '.particle-connections',
      '.cursor-follower',
      '.cursor-glow',
      '.reactive-bg',
      '.magnetic',
      '.magnetic-field',
      '.hero-parallax',
      'canvas'
    ];

    effectsToRemove.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.remove();
      });
    });

    // Clear any fancy classes from body
    document.body.className = '';
    
    // Stop any running animations
    document.querySelectorAll('*').forEach(el => {
      el.style.animation = 'none';
      el.style.transform = 'none';
      el.style.filter = 'none';
    });

    // Remove any debug panels or controls
    document.querySelectorAll('[style*="position: fixed"]').forEach(el => {
      if (el.style.bottom && el.style.left && el.textContent.includes('Debug')) {
        el.remove();
      }
    });
  }

  setupEventListeners() {
    // Simple scroll events
    window.addEventListener("scroll", () => {
      this.updateScrollProgress();
      this.updateHeaderState();
      this.updateScrollToTop();
    });

    // Page load
    window.addEventListener("load", () => {
      this.hideLoadingScreen();
    });

    // Theme toggle and scroll to top
    document.addEventListener("click", (e) => {
      if (e.target.closest(".theme-toggle")) {
        this.toggleTheme();
      }
      if (e.target.closest(".scroll-to-top")) {
        this.scrollToTop();
      }
    });

    // Simple smooth scrolling for anchor links
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          this.smoothScrollTo(targetElement);
        }
      }
    });
  }

  setupTheme() {
    const body = document.body;
    body.setAttribute("data-theme", this.theme);
    
    // Create theme toggle button if it doesn't exist
    if (!document.querySelector('.theme-toggle')) {
      this.createThemeToggle();
    }
    
    // Create scroll to top button if it doesn't exist
    if (!document.querySelector('.scroll-to-top')) {
      this.createScrollToTop();
    }
  }

  createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = this.theme === 'dark' ? '☀' : '🌙';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    document.body.appendChild(themeToggle);
  }

  createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);
  }

  toggleTheme() {
    this.theme = this.theme === "light" ? "dark" : "light";
    document.body.setAttribute("data-theme", this.theme);
    localStorage.setItem("theme", this.theme);
    
    // Update theme toggle icon
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.innerHTML = this.theme === 'dark' ? '☀' : '🌙';
    }
  }

  setupMobileNavigation() {
    const mobileToggle = document.getElementById("mobileNavToggle");
    const mobileOverlay = document.getElementById("mobileNavOverlay");

    if (mobileToggle && mobileOverlay) {
      mobileToggle.addEventListener("click", () => {
        this.toggleMobileNav();
      });

      mobileOverlay.addEventListener("click", (e) => {
        if (e.target === mobileOverlay) {
          this.closeMobileNav();
        }
      });

      // Close mobile nav when clicking on links
      document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
          this.closeMobileNav();
        });
      });
    }
  }

  toggleMobileNav() {
    const overlay = document.getElementById("mobileNavOverlay");
    const toggle = document.getElementById("mobileNavToggle");
    
    if (overlay && toggle) {
      const isActive = overlay.classList.contains("active");
      
      if (isActive) {
        this.closeMobileNav();
      } else {
        overlay.classList.add("active");
        toggle.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    }
  }

  closeMobileNav() {
    const overlay = document.getElementById("mobileNavOverlay");
    const toggle = document.getElementById("mobileNavToggle");
    
    if (overlay && toggle) {
      overlay.classList.remove("active");
      toggle.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  updateScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.pageYOffset;
    
    this.scrollProgress = Math.max(0, Math.min(100, (scrollTop / documentHeight) * 100));
    
    const progressBar = document.getElementById("scrollProgress");
    if (progressBar) {
      progressBar.style.width = `${this.scrollProgress}%`;
    }
  }

  updateHeaderState() {
    const header = document.querySelector("header");
    if (header) {
      if (window.pageYOffset > 50) {
        header.style.background = "rgba(255, 255, 255, 0.98)";
        header.style.backdropFilter = "blur(8px)";
      } else {
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.backdropFilter = "blur(8px)";
      }
    }
  }

  updateScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (scrollBtn) {
      if (window.pageYOffset > 300) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  smoothScrollTo(element) {
    const headerHeight = document.querySelector('header')?.offsetHeight || 80;
    const elementPosition = element.offsetTop - headerHeight - 20;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }

  initializeBasicFeatures() {
    this.setupCounterAnimations();
    this.hideLoadingScreen();
    
    // Remove any remaining fancy effects that might have been added
    setTimeout(() => {
      this.removeFancyEffects();
    }, 100);
  }

  setupCounterAnimations() {
    // Simple counter animation for stats
    document.querySelectorAll('.stat-number, .live-counter').forEach(counter => {
      const text = counter.textContent;
      const numbers = text.match(/\d+/);
      if (numbers) {
        const target = parseInt(numbers[0]);
        const prefix = text.replace(/\d+/, '');
        this.animateCounter(counter, target, prefix);
      }
    });
  }

  animateCounter(element, target, prefix = '') {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = prefix + target;
        clearInterval(timer);
      } else {
        element.textContent = prefix + Math.floor(current);
      }
    }, 30);
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen");
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add("hidden");
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 500);
      }, 800);
    }
    this.isLoaded = true;
  }

  // Simple notification system
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      background: ${type === 'success' ? '#10b981' : '#3b82f6'};
      color: white;
      border-radius: 4px;
      z-index: 10000;
      font-size: 0.875rem;
      font-weight: 500;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
}

// Initialize the application
const app = new OceanCrestApp();

// Export for global access
window.OceanCrestApp = app;

// Simple error handling
window.addEventListener('error', (e) => {
  console.error('Error:', e.error);
});

// Clean console message
console.log('🎬 OceanCrest Entertainment - Clean & Simple');

// Remove any existing fancy effect intervals/timeouts
setTimeout(() => {
  // Clear any existing intervals that might be running fancy effects
  for (let i = 1; i < 99999; i++) {
    window.clearInterval(i);
    window.clearTimeout(i);
  }
}, 1000);
