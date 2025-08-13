// OceanCrest Entertainment - Cyberpunk Enhanced JavaScript
class OceanCrestApp {
  constructor() {
    this.isLoaded = false;
    this.scrollProgress = 0;
    this.theme = localStorage.getItem("theme") || "dark";
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches || 
                        localStorage.getItem("reducedMotion") === "true";
    this.particles = [];
    this.glitchInterval = null;
    this.init();
  }

  init() {
    // Initialize core functionality immediately
    this.setupEventListeners();
    this.setupTheme();
    this.setupMobileNavigation();
    this.createParticleSystem();
    this.initGlitchEffects();

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

    // Enhanced hover effects for cyberpunk elements
    this.setupCyberpunkEffects();
  }

  setupCyberpunkEffects() {
    // Card hover effects with glitch
    document.querySelectorAll('.card, .project-card, .stat-item, .contact-item').forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        if (!this.reducedMotion) {
          e.target.style.transform = 'translateY(-15px)';
          this.addRandomGlitch(e.target);
        }
      });
      
      card.addEventListener('mouseleave', (e) => {
        e.target.style.transform = '';
        this.removeGlitch(e.target);
      });
    });

    // Button cyber effects
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mouseenter', (e) => {
        if (!this.reducedMotion) {
          e.target.style.transform = 'translateY(-5px)';
          this.createEnergyPulse(e.target);
        }
      });
      
      btn.addEventListener('mouseleave', (e) => {
        e.target.style.transform = '';
      });

      btn.addEventListener('click', (e) => {
        this.createClickRipple(e);
      });
    });

    // Navigation link effects
    document.querySelectorAll('.desktop-nav a, .mobile-nav-link').forEach(link => {
      link.addEventListener('mouseenter', (e) => {
        this.createHoverScan(e.target);
      });
    });
  }

  createEnergyPulse(element) {
    const pulse = document.createElement('div');
    pulse.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, rgba(0, 255, 255, 0.3), rgba(255, 0, 128, 0.3));
      opacity: 0;
      pointer-events: none;
      animation: energyPulse 0.6s ease-out;
      clip-path: inherit;
    `;

    element.style.position = 'relative';
    element.appendChild(pulse);

    // Add energy pulse animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes energyPulse {
        0% { opacity: 0; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.05); }
        100% { opacity: 0; transform: scale(1.2); }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      if (pulse.parentNode) {
        pulse.parentNode.removeChild(pulse);
      }
    }, 600);
  }

  createClickRipple(event) {
    const ripple = document.createElement('div');
    const rect = event.target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(0, 255, 255, 0.6) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      animation: cyberpunkRipple 0.8s ease-out;
    `;

    event.target.style.position = 'relative';
    event.target.appendChild(ripple);

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes cyberpunkRipple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 800);
  }

  createHoverScan(element) {
    const scanner = document.createElement('div');
    scanner.style.cssText = `
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.4), transparent);
      pointer-events: none;
      animation: scanLine 0.8s ease-out;
      clip-path: inherit;
    `;

    element.style.position = 'relative';
    element.appendChild(scanner);

    // Add scan animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes scanLine {
        0% { left: -100%; }
        100% { left: 100%; }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      if (scanner.parentNode) {
        scanner.parentNode.removeChild(scanner);
      }
    }, 800);
  }

  initGlitchEffects() {
    if (this.reducedMotion) return;

    // Add glitch effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      heroTitle.classList.add('glitch');
      this.startRandomGlitches();
    }

    // Add periodic glitch to logo
    const logo = document.querySelector('.logo');
    if (logo) {
      setInterval(() => {
        this.addTemporaryGlitch(logo, 200);
      }, 8000 + Math.random() * 4000);
    }
  }

  startRandomGlitches() {
    this.glitchInterval = setInterval(() => {
      const glitchTargets = document.querySelectorAll('.card-title, .section-title, .project-title');
      if (glitchTargets.length > 0) {
        const randomTarget = glitchTargets[Math.floor(Math.random() * glitchTargets.length)];
        this.addTemporaryGlitch(randomTarget, 150);
      }
    }, 10000 + Math.random() * 15000);
  }

  addTemporaryGlitch(element, duration = 300) {
    element.classList.add('glitch');
    element.setAttribute('data-text', element.textContent);
    
    setTimeout(() => {
      element.classList.remove('glitch');
      element.removeAttribute('data-text');
    }, duration);
  }

  addRandomGlitch(element) {
    if (Math.random() > 0.7) { // 30% chance
      this.addTemporaryGlitch(element, 100);
    }
  }

  removeGlitch(element) {
    element.classList.remove('glitch');
    element.removeAttribute('data-text');
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
    themeToggle.innerHTML = this.theme === 'dark' ? 'LGT' : 'DRK';
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
    
    // Update theme toggle text
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.innerHTML = this.theme === 'dark' ? 'LGT' : 'DRK';
      this.createEnergyPulse(themeToggle);
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
        this.createEnergyPulse(toggle);
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

    // Create cyber particles
    for (let i = 0; i < 60; i++) {
      setTimeout(() => {
        this.createCyberParticle(particlesContainer);
      }, i * 150);
    }

    // Continue creating particles
    this.particleInterval = setInterval(() => {
      if (this.particles.length < 60) {
        this.createCyberParticle(particlesContainer);
      }
    }, 800);
  }

  createCyberParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const colors = ['#00ffff', '#ff0080', '#8b00ff', '#00ff41', '#ffff00'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 4 + 1;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 10 + 15;
    const opacity = Math.random() * 0.8 + 0.2;
    
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      background: ${color};
      opacity: ${opacity};
      animation-duration: ${animationDuration}s;
      animation-delay: ${Math.random() * 5}s;
      box-shadow: 0 0 10px ${color};
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
        header.style.background = "rgba(10, 10, 10, 0.98)";
        header.style.backdropFilter = "blur(25px)";
        header.style.boxShadow = "0 0 30px rgba(0, 255, 255, 0.4)";
      } else {
        header.style.background = "rgba(10, 10, 10, 0.95)";
        header.style.backdropFilter = "blur(20px)";
        header.style.boxShadow = "0 0 20px rgba(0, 255, 255, 0.3)";
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
    
    // Add cyberpunk effect
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (scrollBtn) {
      this.createEnergyPulse(scrollBtn);
    }
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
        
        // Add random glitch effect on reveal
        if (Math.random() > 0.8) {
          setTimeout(() => {
            this.addTemporaryGlitch(element.querySelector('.card-title') || element, 100);
          }, Math.random() * 1000);
        }
      }
    });
  }

  initializeEnhancedFeatures() {
    this.setupIntersectionObserver();
    this.setupCounterAnimations();
    this.setupCyberpunkInteractions();
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
          
          // Cyberpunk reveal effect
          setTimeout(() => {
            this.createRevealScan(entry.target);
          }, Math.random() * 500);
        }
      });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.card, .stat-item, .project-card, .contact-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(50px)';
      el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      observer.observe(el);
    });
  }

  createRevealScan(element) {
    const scanner = document.createElement('div');
    scanner.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, transparent 0%, rgba(0, 255, 255, 0.3) 50%, transparent 100%);
      pointer-events: none;
      animation: revealScan 1s ease-out;
      clip-path: inherit;
    `;

    element.style.position = 'relative';
    element.appendChild(scanner);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes revealScan {
        0% { transform: translateY(-100%); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateY(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      if (scanner.parentNode) {
        scanner.parentNode.removeChild(scanner);
      }
    }, 1000);
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
        this.addTemporaryGlitch(element, 200);
      }
    };
    
    animate();
  }

  setupCyberpunkInteractions() {
    // Add cyber sound effects (visual feedback)
    document.addEventListener('click', (e) => {
      if (e.target.closest('.btn, .card, .mobile-nav-link, .desktop-nav a')) {
        this.createClickFeedback(e);
      }
    });

    // Add typing effect to inputs
    document.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('focus', (e) => {
        e.target.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.5)';
        e.target.style.borderColor = 'var(--accent-neon)';
      });
      
      input.addEventListener('blur', (e) => {
        e.target.style.boxShadow = '';
        e.target.style.borderColor = '';
      });
    });
  }

  createClickFeedback(event) {
    // Create visual click feedback
    const feedback = document.createElement('div');
    feedback.style.cssText = `
      position: fixed;
      left: ${event.clientX - 5}px;
      top: ${event.clientY - 5}px;
      width: 10px;
      height: 10px;
      background: var(--accent-neon);
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      animation: clickExpand 0.4s ease-out;
      box-shadow: 0 0 20px var(--accent-neon);
    `;

    document.body.appendChild(feedback);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes clickExpand {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      document.body.removeChild(feedback);
    }, 400);
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen");
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add("hidden");
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 1000);
      }, 1500);
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

  // Cleanup
  destroy() {
    if (this.particleInterval) {
      clearInterval(this.particleInterval);
    }
    
    if (this.glitchInterval) {
      clearInterval(this.glitchInterval);
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

// Cyber Easter Eggs
document.addEventListener('keydown', (e) => {
  // Konami code for special effects
  if (e.code === 'KeyC' && e.ctrlKey && e.shiftKey) {
    app.addTemporaryGlitch(document.body, 2000);
  }
});

// Performance optimization
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Non-critical initialization
    console.log('%c🔮 OCEANCREST CYBERPUNK SYSTEM ONLINE 🔮', 'color: #00ffff; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px #00ffff;');
    console.log('%c⚡ All systems operational ⚡', 'color: #ff0080; font-size: 12px;');
  });
}
