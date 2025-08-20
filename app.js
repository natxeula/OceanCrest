// OceanCrest Entertainment - Professional Enhanced JavaScript
class OceanCrestApp {
  constructor() {
    this.isLoaded = false;
    this.scrollProgress = 0;
    this.theme = localStorage.getItem("theme") || "dark";
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches || 
                        localStorage.getItem("reducedMotion") === "true";
    this.init();
  }

  init() {
    // Initialize core functionality immediately
    this.setupEventListeners();
    this.setupTheme();
    this.setupMobileNavigation();
    this.setupProfessionalInteractions();

    // Initialize enhanced features after DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        this.initializeEnhancedFeatures(),
      );
    } else {
      this.initializeEnhancedFeatures();
    }
  }

  setupEventListeners() {
    // Scroll events with throttling
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollProgress();
          this.updateHeaderState();
          this.updateScrollToTop();
          this.animateOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Page load
    window.addEventListener("load", () => {
      this.hideLoadingScreen();
    });

    // Resize events
    window.addEventListener("resize", this.debounce(() => {
      this.handleResize();
    }, 250));

    // Theme toggle and scroll to top
    document.addEventListener("click", (e) => {
      if (e.target.closest(".theme-toggle")) {
        this.toggleTheme();
      }
      if (e.target.closest(".scroll-to-top")) {
        this.scrollToTop();
      }
    });

    // Smooth scrolling for anchor links
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

  setupProfessionalInteractions() {
    // Sophisticated hover effects for cards
    document.querySelectorAll('.card, .project-card, .stat-item, .contact-item').forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        if (!this.reducedMotion) {
          e.target.style.transform = 'translateY(-8px)';
          this.addSubtleGlow(e.target);
        }
      });
      
      card.addEventListener('mouseleave', (e) => {
        e.target.style.transform = '';
        this.removeSubtleGlow(e.target);
      });
    });

    // Professional button effects
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mouseenter', (e) => {
        if (!this.reducedMotion) {
          e.target.style.transform = 'translateY(-3px)';
          this.createElegantRipple(e.target);
        }
      });
      
      btn.addEventListener('mouseleave', (e) => {
        e.target.style.transform = '';
      });

      btn.addEventListener('click', (e) => {
        this.createClickFeedback(e);
      });
    });

    // Navigation hover effects
    document.querySelectorAll('.desktop-nav a, .mobile-nav-link').forEach(link => {
      link.addEventListener('mouseenter', (e) => {
        this.createUnderlineAnimation(e.target);
      });
    });

    // Parallax effect for hero section
    if (!this.reducedMotion) {
      this.setupParallaxEffect();
    }
  }

  addSubtleGlow(element) {
    element.style.boxShadow = '0 15px 40px rgba(212, 175, 55, 0.15)';
    element.style.borderColor = 'var(--accent-gold)';
  }

  removeSubtleGlow(element) {
    element.style.boxShadow = '';
    element.style.borderColor = '';
  }

  createElegantRipple(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, rgba(212, 175, 55, 0.1), rgba(192, 192, 192, 0.1));
      opacity: 0;
      pointer-events: none;
      animation: elegantRipple 0.8s ease-out;
      border-radius: inherit;
    `;

    element.style.position = 'relative';
    element.appendChild(ripple);

    // Add elegant ripple animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes elegantRipple {
        0% { opacity: 0; transform: scale(0.9); }
        50% { opacity: 1; transform: scale(1.02); }
        100% { opacity: 0; transform: scale(1.05); }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 800);
  }

  createClickFeedback(event) {
    const feedback = document.createElement('div');
    const rect = event.target.getBoundingClientRect();
    const size = 40;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    feedback.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      animation: professionalRipple 0.6s ease-out;
    `;

    event.target.style.position = 'relative';
    event.target.appendChild(feedback);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes professionalRipple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(3); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.parentNode.removeChild(feedback);
      }
    }, 600);
  }

  createUnderlineAnimation(element) {
    // Professional underline effect is handled by CSS
    // This could be expanded for more complex animations
  }

  setupParallaxEffect() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      
      if (hero) {
        // Subtle parallax effect
        const speed = scrolled * 0.3;
        hero.style.transform = `translateY(${speed}px)`;
      }
    });
  }

  setupTheme() {
    const body = document.body;
    body.setAttribute("data-theme", this.theme);
    body.setAttribute("data-motion", this.reducedMotion ? "reduced" : "full");
    
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
      this.createElegantRipple(themeToggle);
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
    
    this.scrollProgress = (scrollTop / documentHeight) * 100;
    
    const progressBar = document.getElementById("scrollProgress");
    if (progressBar) {
      progressBar.style.width = `${this.scrollProgress}%`;
    }
  }

  updateHeaderState() {
    const header = document.querySelector("header");
    if (header) {
      if (window.pageYOffset > 100) {
        header.style.background = "rgba(26, 26, 26, 0.98)";
        header.style.backdropFilter = "blur(25px)";
        header.style.borderBottom = "1px solid var(--accent-gold)";
      } else {
        header.style.background = "rgba(26, 26, 26, 0.95)";
        header.style.backdropFilter = "blur(20px)";
        header.style.borderBottom = "1px solid var(--border-color)";
      }
    }
  }

  updateScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (scrollBtn) {
      if (window.pageYOffset > 500) {
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
    const headerHeight = document.querySelector('header').offsetHeight;
    const elementPosition = element.offsetTop - headerHeight - 20;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }

  animateOnScroll() {
    if (this.reducedMotion) return;

    const elements = document.querySelectorAll('.card, .stat-item, .project-card, .contact-item');
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }

  initializeEnhancedFeatures() {
    this.setupIntersectionObserver();
    this.setupCounterAnimations();
    this.setupAccessibility();
    this.hideLoadingScreen();
  }

  setupIntersectionObserver() {
    if (this.reducedMotion) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // Counter animation
          if (entry.target.classList.contains('stat-number')) {
            this.animateCounter(entry.target);
          }
          
          // Subtle reveal effect
          setTimeout(() => {
            this.createRevealEffect(entry.target);
          }, Math.random() * 300);
        }
      });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.card, .stat-item, .project-card, .contact-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      observer.observe(el);
    });
  }

  createRevealEffect(element) {
    const reveal = document.createElement('div');
    reveal.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent);
      pointer-events: none;
      animation: professionalReveal 1.2s ease-out;
      border-radius: inherit;
    `;

    element.style.position = 'relative';
    element.appendChild(reveal);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes professionalReveal {
        0% { transform: translateX(-100%); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      if (reveal.parentNode) {
        reveal.parentNode.removeChild(reveal);
      }
    }, 1200);
  }

  setupCounterAnimations() {
    document.querySelectorAll('.stat-number').forEach(counter => {
      counter.setAttribute('data-target', counter.textContent.replace(/[^0-9]/g, ''));
      counter.textContent = counter.textContent.replace(/[0-9]/g, '0');
    });
  }

  animateCounter(element) {
    const targetText = element.getAttribute('data-target');
    const prefix = element.textContent.replace(/[0-9]/g, '');
    const target = parseInt(targetText) || 0;
    const duration = 2000;
    const increment = target / (duration / 50);
    let current = 0;
    
    const animate = () => {
      if (current < target) {
        current = Math.min(current + increment, target);
        element.textContent = prefix + Math.floor(current);
        setTimeout(animate, 50);
      } else {
        element.textContent = element.textContent.replace(/[0-9]+/, targetText);
      }
    };
    
    animate();
  }

  setupAccessibility() {
    // Skip to main content
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--accent-gold);
      color: var(--primary-bg);
      padding: 8px 16px;
      text-decoration: none;
      z-index: 10000;
      border-radius: 4px;
      font-weight: 500;
      transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Enhanced keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileNav();
      }
    });
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen");
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add("hidden");
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 800);
      }, 1200);
    }
    this.isLoaded = true;
  }

  handleResize() {
    // Handle responsive adjustments
    this.updateHeaderState();
  }

  // Form handling for professional interactions
  handleContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.showNotification('Thank you for your message. We will respond shortly.', 'success');
      });
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 2rem;
      background: ${type === 'success' ? 'var(--accent-gold)' : 'var(--secondary-bg)'};
      color: ${type === 'success' ? 'var(--primary-bg)' : 'var(--text-primary)'};
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      box-shadow: var(--shadow-secondary);
      font-weight: 500;
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
    }, 4000);
  }

  // Utility functions
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Performance monitoring
  measurePerformance() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
        }, 0);
      });
    }
  }

  // Cleanup
  destroy() {
    // Remove event listeners
    window.removeEventListener('scroll', this.updateScrollProgress);
    window.removeEventListener('resize', this.handleResize);
  }
}

// Initialize the application
const app = new OceanCrestApp();

// Export for global access
window.OceanCrestApp = app;

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Enhanced error handling
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

// Performance optimization
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Non-critical initialization
    app.handleContactForm();
    app.measurePerformance();
    console.log('%c🎬 OceanCrest Entertainment - Professional System Initialized', 'color: #d4af37; font-size: 14px; font-weight: bold;');
  });
}
