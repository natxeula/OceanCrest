// OceanCrest Entertainment - Modern Enhanced JavaScript
class OceanCrestApp {
  constructor() {
    this.isLoaded = false;
    this.scrollProgress = 0;
    this.theme = localStorage.getItem("theme") || "light";
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches || 
                        localStorage.getItem("reducedMotion") === "true";
    this.particles = [];
    this.init();
  }

  init() {
    // Initialize core functionality immediately
    this.setupEventListeners();
    this.setupTheme();
    this.setupMobileNavigation();
    this.createParticleSystem();

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

    // Theme toggle
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

    // Enhanced hover effects
    this.setupHoverEffects();
  }

  setupHoverEffects() {
    // Card hover effects
    document.querySelectorAll('.card, .project-card, .stat-item, .contact-item').forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        if (!this.reducedMotion) {
          e.target.style.transform = 'translateY(-8px) scale(1.02)';
        }
      });
      
      card.addEventListener('mouseleave', (e) => {
        e.target.style.transform = '';
      });
    });

    // Button hover effects
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mouseenter', (e) => {
        if (!this.reducedMotion) {
          e.target.style.transform = 'translateY(-2px)';
        }
      });
      
      btn.addEventListener('mouseleave', (e) => {
        e.target.style.transform = '';
      });
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
    themeToggle.innerHTML = this.theme === 'dark' ? '☀️' : '🌙';
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
      themeToggle.innerHTML = this.theme === 'dark' ? '☀️' : '🌙';
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

  createParticleSystem() {
    if (this.reducedMotion) return;

    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    heroSection.appendChild(particlesContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        this.createParticle(particlesContainer);
      }, i * 200);
    }

    // Continue creating particles
    this.particleInterval = setInterval(() => {
      if (this.particles.length < 50) {
        this.createParticle(particlesContainer);
      }
    }, 1000);
  }

  createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 6 + 2;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 10 + 10;
    const opacity = Math.random() * 0.3 + 0.1;
    
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      opacity: ${opacity};
      animation-duration: ${animationDuration}s;
      animation-delay: ${Math.random() * 5}s;
    `;
    
    container.appendChild(particle);
    this.particles.push(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
        this.particles = this.particles.filter(p => p !== particle);
      }
    }, animationDuration * 1000);
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
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.backdropFilter = "blur(20px)";
      } else {
        header.style.background = "rgba(255, 255, 255, 0.9)";
        header.style.backdropFilter = "blur(10px)";
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

    const elements = document.querySelectorAll('.card, .stat-item, .project-card');
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
    this.setupParallaxEffects();
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
        }
      });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.card, .stat-item, .project-card, .contact-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s ease';
      observer.observe(el);
    });
  }

  setupCounterAnimations() {
    document.querySelectorAll('.stat-number').forEach(counter => {
      counter.setAttribute('data-target', counter.textContent);
      counter.textContent = '0';
    });
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const start = parseInt(element.textContent);
    const increment = (target - start) / (duration / 16);
    
    const animate = () => {
      const current = parseInt(element.textContent);
      if (current < target) {
        element.textContent = Math.min(current + increment, target);
        requestAnimationFrame(animate);
      } else {
        element.textContent = target;
      }
    };
    
    animate();
  }

  setupParallaxEffects() {
    if (this.reducedMotion) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      
      if (hero) {
        const speed = scrolled * 0.5;
        hero.style.transform = `translateY(${speed}px)`;
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
      }, 1000);
    }
    this.isLoaded = true;
  }

  handleResize() {
    // Adjust particle system
    if (!this.reducedMotion && this.particles.length > 0) {
      this.particles.forEach(particle => {
        particle.style.left = Math.random() * 100 + '%';
      });
    }
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

  // Form handling
  handleContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.showNotification('Message sent successfully!', 'success');
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
      background: ${type === 'success' ? '#10b981' : '#3b82f6'};
      color: white;
      border-radius: 8px;
      z-index: 10000;
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
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Search functionality
  setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', this.debounce((e) => {
        this.performSearch(e.target.value);
      }, 300));
    }
  }

  performSearch(query) {
    // Implementation for search functionality
    console.log('Searching for:', query);
  }

  // Accessibility improvements
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
      background: var(--accent-primary);
      color: white;
      padding: 8px;
      text-decoration: none;
      z-index: 10000;
      border-radius: 4px;
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
    if (this.particleInterval) {
      clearInterval(this.particleInterval);
    }
    
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
    app.setupAccessibility();
    app.measurePerformance();
    app.handleContactForm();
    app.setupSearch();
  });
}
