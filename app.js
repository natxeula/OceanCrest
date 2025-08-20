// OceanCrest Entertainment - Modern Interactive JavaScript
class OceanCrestApp {
  constructor() {
    this.isLoaded = false;
    this.scrollProgress = 0;
    this.theme = localStorage.getItem("theme") || "dark";
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches || 
                        localStorage.getItem("reducedMotion") === "true";
    
    // Interactive elements
    this.particles = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.cursorFollower = null;
    this.cursorGlow = null;
    this.reactiveBackground = null;
    
    // Performance tracking
    this.fps = 0;
    this.lastTime = 0;
    this.frameCount = 0;
    this.debugPanel = null;
    
    this.init();
  }

  init() {
    // Initialize core functionality immediately
    this.setupEventListeners();
    this.setupTheme();
    this.setupMobileNavigation();
    this.createInteractiveElements();

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
    // Mouse tracking for interactive effects
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.updateCursorEffects();
      this.updateReactiveBackground();
    });

    // Scroll events with throttling
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollProgress();
          this.updateHeaderState();
          this.animateOnScroll();
          this.updateParallax();
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

    // Interactive button effects
    document.addEventListener("click", (e) => {
      // Magnetic buttons
      if (e.target.closest(".btn, .card, .project-card")) {
        this.createRippleEffect(e);
      }
    });

    // Hover effects for interactive elements
    this.setupInteractiveHovers();
  }

  createInteractiveElements() {
    if (this.reducedMotion) return;

    // Create cursor follower
    this.cursorFollower = document.createElement('div');
    this.cursorFollower.className = 'cursor-follower';
    document.body.appendChild(this.cursorFollower);

    // Create cursor glow
    this.cursorGlow = document.createElement('div');
    this.cursorGlow.className = 'cursor-glow';
    document.body.appendChild(this.cursorGlow);

    // Create reactive background
    this.reactiveBackground = document.createElement('div');
    this.reactiveBackground.className = 'reactive-bg';
    document.body.appendChild(this.reactiveBackground);

    // Create particle system
    this.createParticleSystem();

    // Create debug panel
    this.createDebugPanel();

    // Start animation loop
    this.startAnimationLoop();
  }

  createParticleSystem() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    heroSection.appendChild(particlesContainer);

    // Create particle connections canvas
    const connectionsCanvas = document.createElement('canvas');
    connectionsCanvas.className = 'particle-connections';
    connectionsCanvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 3;
    `;
    heroSection.appendChild(connectionsCanvas);

    this.connectionsCanvas = connectionsCanvas;
    this.connectionsCtx = connectionsCanvas.getContext('2d');

    // Create initial particles
    for (let i = 0; i < 80; i++) {
      this.createParticle(particlesContainer);
    }

    // Resize canvas
    this.resizeParticleCanvas();
  }

  createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const sizes = ['small', 'medium', 'large'];
    const sizeClass = sizes[Math.floor(Math.random() * sizes.length)];
    particle.classList.add(sizeClass);
    
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 8 + 6;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;
    
    container.appendChild(particle);
    
    // Store particle data for connections
    this.particles.push({
      element: particle,
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: sizeClass === 'large' ? 8 : sizeClass === 'medium' ? 5 : 3
    });
  }

  resizeParticleCanvas() {
    if (!this.connectionsCanvas) return;
    
    const rect = this.connectionsCanvas.getBoundingClientRect();
    this.connectionsCanvas.width = rect.width;
    this.connectionsCanvas.height = rect.height;
  }

  updateParticleConnections() {
    if (!this.connectionsCtx || this.reducedMotion) return;

    const ctx = this.connectionsCtx;
    const canvas = this.connectionsCanvas;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update particle positions
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Bounce off edges
      if (particle.x <= 0 || particle.x >= 100) particle.vx *= -1;
      if (particle.y <= 0 || particle.y >= 100) particle.vy *= -1;
      
      // Update DOM element position
      particle.element.style.left = particle.x + '%';
      particle.element.style.top = particle.y + '%';
    });

    // Draw connections between nearby particles
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        
        const dx = (p2.x - p1.x) * canvas.width / 100;
        const dy = (p2.y - p1.y) * canvas.height / 100;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const opacity = (150 - distance) / 150 * 0.5;
          
          ctx.beginPath();
          ctx.moveTo(p1.x * canvas.width / 100, p1.y * canvas.height / 100);
          ctx.lineTo(p2.x * canvas.width / 100, p2.y * canvas.height / 100);
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  updateCursorEffects() {
    if (!this.cursorFollower || !this.cursorGlow || this.reducedMotion) return;

    // Update cursor follower
    this.cursorFollower.style.left = this.mouseX - 10 + 'px';
    this.cursorFollower.style.top = this.mouseY - 10 + 'px';

    // Update cursor glow with delay
    setTimeout(() => {
      if (this.cursorGlow) {
        this.cursorGlow.style.left = this.mouseX - 30 + 'px';
        this.cursorGlow.style.top = this.mouseY - 30 + 'px';
      }
    }, 100);
  }

  updateReactiveBackground() {
    if (!this.reactiveBackground || this.reducedMotion) return;

    const x = (this.mouseX / window.innerWidth) * 100;
    const y = (this.mouseY / window.innerHeight) * 100;
    
    this.reactiveBackground.style.setProperty('--mouse-x', x + '%');
    this.reactiveBackground.style.setProperty('--mouse-y', y + '%');
  }

  setupInteractiveHovers() {
    // Magnetic effect for buttons and cards
    document.querySelectorAll('.btn, .card, .project-card, .contact-item').forEach(element => {
      element.addEventListener('mouseenter', () => {
        if (!this.reducedMotion) {
          element.classList.add('magnetic');
          this.createHoverGlow(element);
        }
      });

      element.addEventListener('mouseleave', () => {
        element.classList.remove('magnetic');
        this.removeHoverGlow(element);
      });

      element.addEventListener('mousemove', (e) => {
        if (this.reducedMotion) return;
        
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = 100;
        
        if (distance < maxDistance) {
          const strength = (maxDistance - distance) / maxDistance;
          const moveX = x * strength * 0.3;
          const moveY = y * strength * 0.3;
          
          element.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + strength * 0.05})`;
        }
      });
    });

    // Enhanced navigation link effects
    document.querySelectorAll('.desktop-nav a, .mobile-nav-link').forEach(link => {
      link.addEventListener('mouseenter', () => {
        this.createLinkRipple(link);
      });
    });
  }

  createHoverGlow(element) {
    const glow = document.createElement('div');
    glow.className = 'hover-glow';
    glow.style.cssText = `
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3));
      border-radius: inherit;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.appendChild(glow);
    
    setTimeout(() => {
      glow.style.opacity = '1';
    }, 10);
  }

  removeHoverGlow(element) {
    const glow = element.querySelector('.hover-glow');
    if (glow) {
      glow.style.opacity = '0';
      setTimeout(() => {
        if (glow.parentNode) {
          glow.parentNode.removeChild(glow);
        }
      }, 300);
    }
    element.style.transform = '';
  }

  createRippleEffect(event) {
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
      background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 1000;
      animation: ripple 0.8s ease-out;
    `;

    event.target.style.position = 'relative';
    event.target.appendChild(ripple);

    // Add ripple animation if not exists
    if (!document.querySelector('#ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = `
        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 800);
  }

  createLinkRipple(link) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent);
      pointer-events: none;
      animation: linkRipple 0.6s ease-out;
      border-radius: inherit;
    `;

    link.style.position = 'relative';
    link.appendChild(ripple);

    // Add link ripple animation if not exists
    if (!document.querySelector('#link-ripple-style')) {
      const style = document.createElement('style');
      style.id = 'link-ripple-style';
      style.textContent = `
        @keyframes linkRipple {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `;
      document.head.appendChild(style);
    }

    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  startAnimationLoop() {
    if (this.reducedMotion) return;

    const animate = (currentTime) => {
      // Calculate FPS
      if (currentTime - this.lastTime >= 1000) {
        this.fps = this.frameCount;
        this.frameCount = 0;
        this.lastTime = currentTime;
        this.updateDebugPanel();
      }
      this.frameCount++;

      // Update particle connections
      this.updateParticleConnections();

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  createDebugPanel() {
    this.debugPanel = document.createElement('div');
    this.debugPanel.style.cssText = `
      position: fixed;
      bottom: 1rem;
      left: 1rem;
      background: rgba(17, 17, 24, 0.9);
      color: #cbd5e1;
      padding: 0.75rem;
      border-radius: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      z-index: 10000;
      backdrop-filter: blur(10px);
      border: 1px solid #1e293b;
      opacity: 0.7;
      transition: opacity 0.3s ease;
      pointer-events: none;
      min-width: 200px;
    `;

    document.body.appendChild(this.debugPanel);
    this.updateDebugPanel();
  }

  updateDebugPanel() {
    if (!this.debugPanel) return;

    const scroll = Math.round(this.scrollProgress);
    const mousePos = `${this.mouseX}, ${this.mouseY}`;
    
    this.debugPanel.innerHTML = `
      <div>Mouse: ${mousePos}</div>
      <div>FPS: ${this.fps}</div>
      <div>Scroll: ${scroll}%</div>
      <div>Theme: ${this.theme}</div>
      <div>Particles: ${this.particles.length}</div>
    `;
  }

  setupTheme() {
    const body = document.body;
    body.setAttribute("data-theme", this.theme);
    body.setAttribute("data-motion", this.reducedMotion ? "reduced" : "full");
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
      if (window.pageYOffset > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }

  updateParallax() {
    if (this.reducedMotion) return;

    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-parallax');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }

  animateOnScroll() {
    if (this.reducedMotion) return;

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
  }

  initializeEnhancedFeatures() {
    this.setupIntersectionObserver();
    this.setupCounterAnimations();
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
          if (entry.target.classList.contains('stat-number') || entry.target.classList.contains('live-counter')) {
            this.animateCounter(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe elements with fade-in class
    document.querySelectorAll('.card, .project-card, .contact-item, .stat-item').forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }

  setupCounterAnimations() {
    document.querySelectorAll('.stat-number, .live-counter').forEach(counter => {
      const text = counter.textContent;
      const numbers = text.match(/\d+/);
      if (numbers) {
        counter.setAttribute('data-target', numbers[0]);
        counter.textContent = text.replace(/\d+/, '0');
      }
    });
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target')) || 0;
    const text = element.textContent;
    const prefix = text.replace(/\d+/, '');
    const duration = 2000;
    const increment = target / (duration / 50);
    let current = 0;
    
    const animate = () => {
      if (current < target) {
        current = Math.min(current + increment, target);
        element.textContent = prefix + Math.floor(current);
        setTimeout(animate, 50);
      } else {
        element.textContent = text.replace(/\d+/, target.toString());
      }
    };
    
    animate();
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen");
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add("hidden");
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 800);
      }, 1500);
    }
    this.isLoaded = true;
  }

  handleResize() {
    this.resizeParticleCanvas();
    this.updateReactiveBackground();
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
    window.removeEventListener('mousemove', this.updateCursorEffects);
    
    // Clean up interactive elements
    if (this.cursorFollower) this.cursorFollower.remove();
    if (this.cursorGlow) this.cursorGlow.remove();
    if (this.reactiveBackground) this.reactiveBackground.remove();
    if (this.debugPanel) this.debugPanel.remove();
  }
}

// Initialize the application
const app = new OceanCrestApp();

// Export for global access
window.OceanCrestApp = app;

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
    app.measurePerformance();
    console.log('%c🚀 OceanCrest Interactive System Online', 'color: #6366f1; font-size: 16px; font-weight: bold;');
  });
}

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
