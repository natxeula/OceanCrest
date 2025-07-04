// OceanCrest Entertainment - Enhanced JavaScript Functionality
class OceanCrestApp {
  constructor() {
    this.isLoaded = false;
    this.scrollProgress = 0;
    this.theme = localStorage.getItem("theme") || "dark";
    this.init();
  }

  init() {
    // Initialize core functionality immediately
    this.setupEventListeners();
    this.setupTheme();
    this.setupMobileNavigation();

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
    // Theme toggle
    document.addEventListener("click", (e) => {
      if (e.target.id === "themeToggle") {
        this.toggleTheme();
      }
    });

    // Scroll events
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollProgress();
          this.updateHeaderState();
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
    window.addEventListener(
      "resize",
      this.debounce(() => {
        this.handleResize();
      }, 250),
    );
  }

  setupTheme() {
    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");

    if (this.theme === "light") {
      body.setAttribute("data-theme", "light");
      if (themeToggle) themeToggle.textContent = "☀️";
    } else {
      body.setAttribute("data-theme", "dark");
      if (themeToggle) themeToggle.textContent = "🌙";
    }
  }

  toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");

    this.theme = this.theme === "light" ? "dark" : "light";

    body.setAttribute("data-theme", this.theme);
    if (themeToggle) {
      themeToggle.textContent = this.theme === "light" ? "☀️" : "🌙";
    }

    localStorage.setItem("theme", this.theme);

    // Add theme transition effect
    body.style.transition = "all 0.3s ease";
    setTimeout(() => {
      body.style.transition = "";
    }, 300);
  }

  setupMobileNavigation() {
    // Create mobile navigation elements if they don't exist
    this.createMobileNavElements();

    // Mobile nav toggle functionality
    document.addEventListener("click", (e) => {
      if (e.target.closest(".mobile-nav-toggle")) {
        this.toggleMobileNav();
      }

      // Close mobile nav when clicking overlay or links
      if (
        e.target.classList.contains("mobile-nav-overlay") ||
        (e.target.closest(".mobile-nav-menu a") &&
          !e.target.closest(".mobile-nav-toggle"))
      ) {
        this.closeMobileNav();
      }
    });

    // Close mobile nav on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeMobileNav();
      }
    });

    // Close mobile nav on resize to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        this.closeMobileNav();
      }
    });
  }

  createMobileNavElements() {
    const header = document.querySelector("header");
    if (!header) return;

    // Check if mobile nav already exists
    if (document.querySelector(".mobile-nav-toggle")) return;

    // Create mobile toggle button
    const mobileToggle = document.createElement("button");
    mobileToggle.className = "mobile-nav-toggle";
    mobileToggle.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;

    // Create mobile overlay
    const mobileOverlay = document.createElement("div");
    mobileOverlay.className = "mobile-nav-overlay";

    // Get navigation links
    const navLinks = document.querySelectorAll("nav ul li a");
    const mobileNavMenu = document.createElement("div");
    mobileNavMenu.className = "mobile-nav-menu";

    navLinks.forEach((link) => {
      const mobileLink = link.cloneNode(true);
      mobileNavMenu.appendChild(mobileLink);
    });

    mobileOverlay.appendChild(mobileNavMenu);

    // Add to DOM
    header.querySelector(".header-container").appendChild(mobileToggle);
    document.body.appendChild(mobileOverlay);
  }

  toggleMobileNav() {
    const toggle = document.querySelector(".mobile-nav-toggle");
    const overlay = document.querySelector(".mobile-nav-overlay");

    if (toggle && overlay) {
      const isActive = toggle.classList.contains("active");

      if (isActive) {
        this.closeMobileNav();
      } else {
        this.openMobileNav();
      }
    }
  }

  openMobileNav() {
    const toggle = document.querySelector(".mobile-nav-toggle");
    const overlay = document.querySelector(".mobile-nav-overlay");

    if (toggle && overlay) {
      toggle.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  closeMobileNav() {
    const toggle = document.querySelector(".mobile-nav-toggle");
    const overlay = document.querySelector(".mobile-nav-overlay");

    if (toggle && overlay) {
      toggle.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  initializeEnhancedFeatures() {
    this.setupScrollAnimations();
    this.setupParticles();
    this.setupSmoothScrolling();
    this.setupIntersectionObserver();
    this.setupPageTransitions();
    this.setupInteractiveEffects();
    this.setupTouchInteractions();
    this.setupReactiveFeatures();
    this.isLoaded = true;
  }

  setupReactiveFeatures() {
    this.setupCursorFollower();
    this.setupReactiveBackground();
    this.setupLiveCounters();
    this.setupTypingEffect();
    this.setupReactiveParticles();
    this.setupRealTimeValidation();
    this.setupDynamicTheme();
    this.setupLiveMonitors();
  }

  setupLiveMonitors() {
    // Create live monitor panel
    const monitor = document.createElement("div");
    monitor.style.cssText = `
      position: fixed;
      bottom: 1rem;
      left: 1rem;
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 1rem;
      font-size: 0.8rem;
      color: var(--text-secondary);
      z-index: 1000;
      opacity: 0.7;
      transition: opacity 0.3s ease;
      font-family: 'Courier New', monospace;
      min-width: 200px;
    `;

    monitor.innerHTML = `
      <div>Mouse: <span id="mousePos">0, 0</span></div>
      <div>Scroll: <span id="scrollPos">0%</span></div>
      <div>FPS: <span id="fpsCounter">60</span></div>
      <div>Theme: <span id="themeStatus">${this.theme}</span></div>
    `;

    document.body.appendChild(monitor);

    // Live mouse tracking
    document.addEventListener("mousemove", (e) => {
      const mousePos = document.getElementById("mousePos");
      if (mousePos) {
        mousePos.textContent = `${e.clientX}, ${e.clientY}`;
      }
    });

    // Live scroll tracking
    window.addEventListener("scroll", () => {
      const scrollPos = document.getElementById("scrollPos");
      if (scrollPos) {
        scrollPos.textContent = `${Math.round(this.scrollProgress)}%`;
      }
    });

    // Simple FPS counter
    let lastTime = performance.now();
    let frameCount = 0;
    const updateFPS = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        const fpsCounter = document.getElementById("fpsCounter");
        if (fpsCounter) fpsCounter.textContent = fps;
        frameCount = 0;
        lastTime = now;
      }
      requestAnimationFrame(updateFPS);
    };
    updateFPS();

    // Update theme status
    const originalToggleTheme = this.toggleTheme;
    this.toggleTheme = (...args) => {
      const result = originalToggleTheme.apply(this, args);
      const themeStatus = document.getElementById("themeStatus");
      if (themeStatus) themeStatus.textContent = this.theme;
      return result;
    };

    // Hide monitor on mobile or when typing
    if (window.innerWidth <= 768) {
      monitor.style.display = "none";
    }

    // Hover effects
    monitor.addEventListener("mouseenter", () => {
      monitor.style.opacity = "1";
    });

    monitor.addEventListener("mouseleave", () => {
      monitor.style.opacity = "0.7";
    });
  }

  setupCursorFollower() {
    if (window.innerWidth <= 768) return; // Skip on mobile

    // Create cursor follower elements
    const cursorFollower = document.createElement("div");
    cursorFollower.className = "cursor-follower";

    const cursorGlow = document.createElement("div");
    cursorGlow.className = "cursor-glow";

    document.body.appendChild(cursorFollower);
    document.body.appendChild(cursorGlow);

    let mouseX = 0,
      mouseY = 0;
    let followerX = 0,
      followerY = 0;
    let glowX = 0,
      glowY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth cursor following
    const updateCursor = () => {
      followerX += (mouseX - followerX) * 0.06;
      followerY += (mouseY - followerY) * 0.06;

      glowX += (mouseX - glowX) * 0.03;
      glowY += (mouseY - glowY) * 0.03;

      cursorFollower.style.transform = `translate(${followerX - 10}px, ${followerY - 10}px)`;
      cursorGlow.style.transform = `translate(${glowX - 20}px, ${glowY - 20}px)`;

      requestAnimationFrame(updateCursor);
    };
    updateCursor();

    // Reactive cursor states
    document.addEventListener("mousedown", () => {
      cursorFollower.style.transform += " scale(0.8)";
    });

    document.addEventListener("mouseup", () => {
      cursorFollower.style.transform = cursorFollower.style.transform.replace(
        " scale(0.8)",
        "",
      );
    });
  }

  setupReactiveBackground() {
    const reactiveBackground = document.createElement("div");
    reactiveBackground.className = "reactive-bg";
    document.body.appendChild(reactiveBackground);

    document.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      reactiveBackground.style.setProperty("--mouse-x", `${x}%`);
      reactiveBackground.style.setProperty("--mouse-y", `${y}%`);
    });
  }

  setupLiveCounters() {
    const counters = document.querySelectorAll(".live-counter");

    counters.forEach((counter) => {
      const target = parseInt(
        counter.getAttribute("data-target") || counter.textContent,
      );
      const duration = parseInt(
        counter.getAttribute("data-duration") || "2000",
      );

      const animateCounter = () => {
        let current = 0;
        const increment = target / (duration / 16);

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        updateCounter();
      };

      // Trigger animation when element comes into view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter();
            observer.unobserve(entry.target);
          }
        });
      });
      observer.observe(counter);
    });
  }

  setupTypingEffect() {
    const typingElements = document.querySelectorAll(".typing-text");

    typingElements.forEach((element) => {
      const text = element.getAttribute("data-text") || element.textContent;
      const speed = parseInt(element.getAttribute("data-speed") || "100");

      element.textContent = "";
      element.classList.add("typing-text");

      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, speed);
        } else {
          // Remove cursor after typing
          setTimeout(() => {
            element.classList.remove("typing-text");
          }, 1000);
        }
      };

      // Start typing when element comes into view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            typeWriter();
            observer.unobserve(entry.target);
          }
        });
      });
      observer.observe(element);
    });
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen");
    if (loadingScreen) {
      // Add reactive loading progress
      const loadingText = loadingScreen.querySelector(".loading-text");
      const steps = [
        "Initializing Experience...",
        "Loading Interactive Features...",
        "Setting up Reactive Elements...",
        "Preparing Dynamic Content...",
        "Almost Ready...",
      ];

      let currentStep = 0;
      const updateStep = () => {
        if (currentStep < steps.length && loadingText) {
          loadingText.textContent = steps[currentStep];
          currentStep++;
          setTimeout(updateStep, 200);
        }
      };

      updateStep();

      setTimeout(() => {
        loadingScreen.classList.add("hidden");
        // Remove from DOM after animation
        setTimeout(() => {
          loadingScreen.remove();
        }, 800);
      }, 1200);
    }
  }

  updateScrollProgress() {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    this.scrollProgress = (winScroll / height) * 100;

    const progressBar = document.getElementById("scrollProgress");
    if (progressBar) {
      progressBar.style.width = this.scrollProgress + "%";
    }
  }

  updateHeaderState() {
    const header = document.querySelector("header");
    if (header) {
      const scrolled = window.pageYOffset;
      if (scrolled > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  }

  setupScrollAnimations() {
    const parallaxElements = document.querySelectorAll(".hero-parallax");

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach((element, index) => {
        const rate = scrolled * (0.05 + index * 0.02);
        element.style.transform = `translateY(${rate}px)`;
      });
    });
  }

  setupParticles() {
    const particlesContainer = document.getElementById("particles");
    if (!particlesContainer || window.innerWidth < 768) return;

    const particleCount = Math.min(25, Math.floor(window.innerWidth / 50));
    const fragment = document.createDocumentFragment();
    this.particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle reactive";

      // Random size
      const sizes = ["small", "medium", "large"];
      particle.classList.add(sizes[Math.floor(Math.random() * sizes.length)]);

      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      particle.style.left = x + "%";
      particle.style.top = y + "%";

      // Random animation delay and duration
      particle.style.animationDelay = Math.random() * 8 + "s";
      particle.style.animationDuration = Math.random() * 4 + 6 + "s";

      // Store particle data for reactive behavior
      this.particles.push({
        element: particle,
        x: x,
        y: y,
        originalX: x,
        originalY: y,
      });

      fragment.appendChild(particle);
    }

    particlesContainer.appendChild(fragment);
  }

  setupReactiveParticles() {
    if (!this.particles || window.innerWidth <= 768) return;

    let mouseX = 0,
      mouseY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX / window.innerWidth) * 100;
      mouseY = (e.clientY / window.innerHeight) * 100;

      this.particles.forEach((particle) => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 15) {
          // Within attraction range
          particle.element.classList.add("attracted");
          // Move particle toward mouse
          particle.x += dx * 0.1;
          particle.y += dy * 0.1;
          particle.element.style.left = particle.x + "%";
          particle.element.style.top = particle.y + "%";
        } else {
          particle.element.classList.remove("attracted");
          // Return to original position
          particle.x += (particle.originalX - particle.x) * 0.05;
          particle.y += (particle.originalY - particle.y) * 0.05;
          particle.element.style.left = particle.x + "%";
          particle.element.style.top = particle.y + "%";
        }
      });
    });
  }

  setupRealTimeValidation() {
    const inputs = document.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      const createFeedback = () => {
        const feedback = document.createElement("div");
        feedback.className = "real-time-feedback";
        feedback.style.cssText = `
          font-size: 0.8rem;
          margin-top: 0.5rem;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(-10px);
        `;
        input.parentNode.appendChild(feedback);
        return feedback;
      };

      let feedback = null;

      input.addEventListener("input", () => {
        if (!feedback) feedback = createFeedback();

        const value = input.value;
        let message = "";
        let isValid = true;

        // Real-time validation logic
        if (input.type === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (value && !emailRegex.test(value)) {
            message = "❌ Please enter a valid email address";
            isValid = false;
          } else if (value) {
            message = "✅ Email looks good!";
          }
        } else if (input.required && value.length < 3) {
          message = "⚠️ This field needs at least 3 characters";
          isValid = false;
        } else if (input.required && value.length >= 3) {
          message = "✅ Looking good!";
        }

        feedback.textContent = message;
        feedback.style.opacity = message ? "1" : "0";
        feedback.style.transform = message
          ? "translateY(0)"
          : "translateY(-10px)";
        feedback.style.background = isValid
          ? "linear-gradient(135deg, #238636 0%, #2ea043 100%)"
          : "linear-gradient(135deg, #f85149 0%, #ff6b6b 100%)";
        feedback.style.color = "#ffffff";
      });
    });
  }

  setupDynamicTheme() {
    // Enhanced theme switching with smooth transitions
    const originalToggleTheme = this.toggleTheme.bind(this);

    this.toggleTheme = () => {
      // Add transition effect
      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${
          this.theme === "light"
            ? "radial-gradient(circle, #0d1117 0%, #161b22 100%)"
            : "radial-gradient(circle, #ffffff 0%, #f6f8fa 100%)"
        };
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      `;

      document.body.appendChild(overlay);

      requestAnimationFrame(() => {
        overlay.style.opacity = "1";

        setTimeout(() => {
          originalToggleTheme();

          setTimeout(() => {
            overlay.style.opacity = "0";
            setTimeout(() => overlay.remove(), 300);
          }, 150);
        }, 150);
      });
    };
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");

        // Skip if href is just "#" or empty
        if (!href || href === "#" || href.length <= 1) {
          return;
        }

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight =
            document.querySelector("header")?.offsetHeight || 0;
          const targetPosition = target.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered animation delay
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 100);
        }
      });
    }, observerOptions);

    // Observe all animation elements
    document
      .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")
      .forEach((el) => {
        observer.observe(el);
      });
  }

  setupPageTransitions() {
    // Only apply to specific CTA buttons, not navigation
    const ctaButtons = document.querySelectorAll(".cta-buttons .btn");

    ctaButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const href = button.getAttribute("href");
        if (href && href.endsWith(".html")) {
          e.preventDefault();
          this.performPageTransition(href);
        }
      });
    });
  }

  performPageTransition(url) {
    // Create transition overlay
    const overlay = document.createElement("div");
    overlay.className = "page-transition-overlay";
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
      z-index: 9999;
      transform: translateX(-100%);
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    document.body.appendChild(overlay);

    // Trigger animation
    requestAnimationFrame(() => {
      overlay.style.transform = "translateX(0)";
    });

    // Navigate after animation
    setTimeout(() => {
      window.location.href = url;
    }, 600);
  }

  setupInteractiveEffects() {
    // Enhanced hover effects for cards
    const cards = document.querySelectorAll(
      ".glass-card, .overview-card, .team-member-card, .news-card",
    );

    cards.forEach((card) => {
      card.addEventListener("mouseenter", (e) => {
        this.addTiltEffect(e.target);
      });

      card.addEventListener("mouseleave", (e) => {
        this.removeTiltEffect(e.target);
      });

      card.addEventListener("mousemove", (e) => {
        this.updateTiltEffect(e);
      });
    });

    // Enhanced button interactions
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        button.style.transform = "translateY(-1px) scale(1.01)";
      });

      button.addEventListener("mouseleave", () => {
        button.style.transform = "";
      });
    });

    // Parallax effect for hero elements
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll(".parallax-element");

      parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.1;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }

  setupTouchInteractions() {
    // Touch-friendly interactions for mobile
    if ("ontouchstart" in window) {
      const cards = document.querySelectorAll(".glass-card, .overview-card");

      cards.forEach((card) => {
        card.addEventListener("touchstart", () => {
          card.style.transform = "scale(0.98)";
        });

        card.addEventListener("touchend", () => {
          card.style.transform = "";
        });
      });

      // Swipe gestures for mobile navigation
      let touchStartX = 0;
      let touchEndX = 0;

      document.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });

      document.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        this.handleSwipeGesture();
      });
    }
  }

  addTiltEffect(element) {
    element.style.transition = "transform 0.1s ease-out";
  }

  removeTiltEffect(element) {
    element.style.transform = "";
    element.style.transition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  }

  updateTiltEffect(e) {
    if (window.innerWidth <= 768) return; // Disable on mobile

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
  }

  handleSwipeGesture() {
    const swipeThreshold = 100;
    const swipeDistance = Math.abs(touchEndX - touchStartX);

    if (swipeDistance > swipeThreshold) {
      if (touchEndX < touchStartX) {
        // Swipe left - could trigger next page or close menu
        this.closeMobileNav();
      } else {
        // Swipe right - could trigger previous page or open menu
        if (!document.querySelector(".mobile-nav-overlay.active")) {
          this.openMobileNav();
        }
      }
    }
  }

  handleResize() {
    // Recreate particles on resize if needed
    if (this.isLoaded) {
      const particlesContainer = document.getElementById("particles");
      if (particlesContainer) {
        particlesContainer.innerHTML = "";
        this.setupParticles();
      }
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

  // Public API for external usage
  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      const targetPosition = section.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }

  getCurrentTheme() {
    return this.theme;
  }

  getScrollProgress() {
    return this.scrollProgress;
  }
}

// Job Application Form Handler
class JobApplicationForm {
  constructor() {
    this.currentSection = 1;
    this.totalSections = 3;
    this.formData = {};
    this.init();
  }

  init() {
    this.setupFormEventListeners();
    this.updateProgressBar();
  }

  setupFormEventListeners() {
    const form = document.getElementById("jobApplicationForm");
    if (!form) return;

    // Form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitApplication();
    });

    // Section navigation
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("next-section")) {
        this.nextSection();
      } else if (e.target.classList.contains("prev-section")) {
        this.prevSection();
      }
    });

    // Dynamic field handling
    const positionSelect = document.getElementById("position");
    if (positionSelect) {
      positionSelect.addEventListener("change", (e) => {
        const otherGroup = document.getElementById("otherPositionGroup");
        if (otherGroup) {
          otherGroup.style.display =
            e.target.value === "other" ? "block" : "none";
        }
      });
    }

    // Real-time validation
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input));
      input.addEventListener("input", () => this.clearFieldError(input));
    });

    // Smooth scroll to form
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("scroll-to-form")) {
        e.preventDefault();
        this.scrollToForm();
      }
    });
  }

  scrollToForm() {
    const formSection = document.getElementById("application-form");
    if (formSection) {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      const targetPosition = formSection.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }

  nextSection() {
    if (!this.validateCurrentSection()) return;

    if (this.currentSection < this.totalSections) {
      this.hideSection(this.currentSection);
      this.currentSection++;
      this.showSection(this.currentSection);
      this.updateProgressBar();
    }
  }

  prevSection() {
    if (this.currentSection > 1) {
      this.hideSection(this.currentSection);
      this.currentSection--;
      this.showSection(this.currentSection);
      this.updateProgressBar();
    }
  }

  showSection(sectionNumber) {
    const section = document.querySelector(`[data-section="${sectionNumber}"]`);
    if (section) {
      section.classList.add("active");
    }
  }

  hideSection(sectionNumber) {
    const section = document.querySelector(`[data-section="${sectionNumber}"]`);
    if (section) {
      section.classList.remove("active");
    }
  }

  updateProgressBar() {
    const progressBar = document.getElementById("formProgress");
    if (progressBar) {
      const percentage = (this.currentSection / this.totalSections) * 100;
      progressBar.style.width = `${percentage}%`;
    }
  }

  validateCurrentSection() {
    const currentSectionElement = document.querySelector(
      `[data-section="${this.currentSection}"]`,
    );
    if (!currentSectionElement) return true;

    const requiredFields = currentSectionElement.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = "";

    // Required field validation
    if (field.hasAttribute("required") && !value) {
      isValid = false;
      errorMessage = "This field is required";
    }

    // Email validation
    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = "Please enter a valid email address";
      }
    }

    // URL validation
    if (field.type === "url" && value) {
      try {
        new URL(value);
      } catch {
        isValid = false;
        errorMessage = "Please enter a valid URL (including https://)";
      }
    }

    // Phone validation
    if (field.type === "tel" && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = "Please enter a valid phone number";
      }
    }

    this.showFieldError(field, isValid ? "" : errorMessage);
    return isValid;
  }

  showFieldError(field, message) {
    const errorElement = document.getElementById(`${field.name}-error`);
    const formGroup = field.closest(".form-group");

    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.toggle("visible", !!message);
    }

    if (formGroup) {
      formGroup.classList.toggle("error", !!message);
    }
  }

  clearFieldError(field) {
    const errorElement = document.getElementById(`${field.name}-error`);
    const formGroup = field.closest(".form-group");

    if (errorElement) {
      errorElement.classList.remove("visible");
    }

    if (formGroup) {
      formGroup.classList.remove("error");
    }
  }

  collectFormData() {
    const form = document.getElementById("jobApplicationForm");
    if (!form) return {};

    const formData = new FormData(form);
    const data = {};

    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    // Add metadata with server-compatible naming
    data.applicationId = this.generateId();
    data.submittedAt = new Date().toISOString();

    // Ensure required fields are present and not empty
    const requiredFields = [
      "preferredName",
      "discordUser",
      "team",
      "specificRole",
      "generalDetails",
    ];
    for (const field of requiredFields) {
      if (!data[field] || data[field].toString().trim() === "") {
        console.error(`Missing required field: ${field}`);
        throw new Error(`Missing required field: ${field}`);
      }
    }

    return data;
  }

  generateId() {
    return "app_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
  }

  saveApplication(applicationData) {
    try {
      const existingApplications = JSON.parse(
        localStorage.getItem("oceancrest_applications") || "[]",
      );
      existingApplications.push(applicationData);
      localStorage.setItem(
        "oceancrest_applications",
        JSON.stringify(existingApplications),
      );
      return true;
    } catch (error) {
      console.error("Error saving application:", error);
      return false;
    }
  }

  async submitApplication() {
    // Final validation
    if (!this.validateCurrentSection()) return;

    let applicationData;

    try {
      applicationData = this.collectFormData();
    } catch (error) {
      alert(error.message);
      return;
    }

    // Show loading state
    const submitButton = document.querySelector('button[type="submit"]');
    const originalText = submitButton ? submitButton.textContent : "";
    if (submitButton) {
      submitButton.textContent = "Submitting...";
      submitButton.disabled = true;
    }

    try {
      // First, try to submit to server
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Application submitted to server:", result);

        // Also save to localStorage as backup
        this.saveApplication(applicationData);

        this.showSuccessMessage();
        this.sendNotificationEmail(applicationData);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }
    } catch (error) {
      console.error("❌ Server submission failed:", error.message);

      // Fallback: save to localStorage only
      if (this.saveApplication(applicationData)) {
        console.log("💾 Application saved to localStorage as fallback");
        this.showSuccessMessage();
        this.sendNotificationEmail(applicationData);

        // Show warning about offline submission
        setTimeout(() => {
          alert(
            "⚠️ Application saved locally. It will be synced when connection is restored.",
          );
        }, 1000);
      } else {
        alert("Error submitting application. Please try again.");
      }
    } finally {
      // Restore button state
      if (submitButton) {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    }
  }

  sendNotificationEmail(data) {
    // In a real application, this would send to your backend
    // For now, we'll just simulate the notification
    console.log("New application submitted:", data);

    // You could integrate with services like EmailJS, Formspree, etc.
    // Example with mailto (opens user's email client):
    const subject = encodeURIComponent(
      "New Job Application - OceanCrest Entertainment",
    );
    const body = encodeURIComponent(`
New job application received:

Email: ${data.email}
Position: ${data.position}
${data.appliedTeam ? `Applied Team: ${data.appliedTeam}` : ""}
Experience: ${data.experience}

Please review the application in the admin panel.
    `);

    // Uncomment to auto-open email client:
    // window.open(`mailto:hr@oceancrest.studio?subject=${subject}&body=${body}`);
  }

  showSuccessMessage() {
    // Hide all form sections
    for (let i = 1; i <= this.totalSections; i++) {
      this.hideSection(i);
    }

    // Show success message
    const successElement = document.getElementById("formSuccess");
    if (successElement) {
      successElement.style.display = "block";
    }

    // Update progress bar to 100%
    const progressBar = document.getElementById("formProgress");
    if (progressBar) {
      progressBar.style.width = "100%";
    }
  }
}

// Global function to reset form
function resetApplicationForm() {
  const form = document.getElementById("jobApplicationForm");
  if (form) {
    form.reset();

    // Reset form state
    if (window.jobApplicationForm) {
      window.jobApplicationForm.currentSection = 1;

      // Hide all sections except first
      for (let i = 2; i <= window.jobApplicationForm.totalSections; i++) {
        window.jobApplicationForm.hideSection(i);
      }

      // Show first section
      window.jobApplicationForm.showSection(1);
      window.jobApplicationForm.updateProgressBar();

      // Hide success message
      const successElement = document.getElementById("formSuccess");
      if (successElement) {
        successElement.style.display = "none";
      }

      // Clear any error states
      const errorElements = form.querySelectorAll(".error-message");
      errorElements.forEach((el) => el.classList.remove("visible"));

      const errorGroups = form.querySelectorAll(".form-group.error");
      errorGroups.forEach((group) => group.classList.remove("error"));
    }
  }
}

// Initialize the application
const oceanCrestApp = new OceanCrestApp();

// Initialize job application form if on careers page
let jobApplicationForm;
if (document.getElementById("jobApplicationForm")) {
  document.addEventListener("DOMContentLoaded", () => {
    jobApplicationForm = new JobApplicationForm();
    window.jobApplicationForm = jobApplicationForm;
  });
}

// Export for external usage
window.OceanCrest = {
  app: oceanCrestApp,
  scrollToSection: (id) => oceanCrestApp.scrollToSection(id),
  getCurrentTheme: () => oceanCrestApp.getCurrentTheme(),
  getScrollProgress: () => oceanCrestApp.getScrollProgress(),
};

// Progressive Web App Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);

        // Listen for service worker messages
        navigator.serviceWorker.addEventListener("message", (event) => {
          if (event.data && event.data.type === "NETWORK_STATUS") {
            const isOnline = event.data.online;
            console.log(
              `Service Worker reports: ${isOnline ? "ONLINE" : "OFFLINE"}`,
            );

            // Update any global online indicators
            updateGlobalOnlineStatus(isOnline);
          }
        });
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Global function to update online status indicators
function updateGlobalOnlineStatus(isOnline) {
  // Update any global status elements
  const statusElements = document.querySelectorAll(".network-status");
  statusElements.forEach((element) => {
    element.classList.toggle("online", isOnline);
    element.classList.toggle("offline", !isOnline);
  });

  // If applications manager exists, notify it
  if (window.applicationsManager) {
    window.applicationsManager.handleNetworkStatusChange(isOnline, Date.now());
  }
}
