/**
 * OCEANCREST ENTERTAINMENT - ADVANCED HANDBOOK SECURITY SYSTEM
 * Ultra-Secure Access Control & Threat Detection
 * Security Level: MAXIMUM
 */

class AdvancedHandbookSecurity {
  constructor() {
    this.accessCodes = {
      executive: this.generateSecureCode('EXEC', 32),
      internal: this.generateSecureCode('INTERNAL', 32), 
      logs: this.generateSecureCode('LOGS', 32),
      project: this.generateSecureCode('PROJECT', 32),
      hr: this.generateSecureCode('HR', 32)
    };
    
    this.sessionKeys = new Map();
    this.biometricData = new Map();
    this.securityLogs = [];
    this.threatLevel = 0;
    this.failedAttempts = new Map();
    this.bannedAccessSessions = new Set();
    this.encryptionKey = this.generateEncryptionKey();
    this.currentHandbook = null;
    this.securityMode = 'MAXIMUM';
    
    this.initSecurity();
  }

  generateSecureCode(prefix, length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';
    let result = prefix + '_';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  generateEncryptionKey() {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async initSecurity() {
    this.startSecurityMonitoring();
    this.initBiometricSimulation();
    this.initThreatDetection();
    this.initNetworkAnalysis();
    this.logSecurityEvent('SYSTEM_INITIALIZED', 'Security system activated');
    
    // Display security codes in console for admin reference
    console.log('🔐 OCEANCREST SECURITY CODES - CONFIDENTIAL 🔐');
    console.log('═══════════════════════════════════════════════');
    Object.entries(this.accessCodes).forEach(([type, code]) => {
      console.log(`${type.toUpperCase()}: ${code}`);
    });
    console.log('═══���═══════════════════════════════════════════');
  }

  initBiometricSimulation() {
    // Simulate advanced biometric verification
    this.biometricTypes = [
      'fingerprint_scan',
      'retinal_scan', 
      'voice_pattern',
      'facial_recognition',
      'keystroke_dynamics'
    ];
  }

  async simulateBiometricScan(type) {
    return new Promise((resolve) => {
      const scanTime = Math.random() * 2000 + 1000; // 1-3 seconds
      
      setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate
        const confidence = Math.random() * 0.3 + 0.7; // 70-100% confidence
        
        resolve({
          type,
          success,
          confidence,
          timestamp: Date.now(),
          scanDuration: scanTime
        });
      }, scanTime);
    });
  }

  startSecurityMonitoring() {
    // Monitor for suspicious activity
    setInterval(() => {
      this.analyzeThreatLevel();
      this.cleanupExpiredSessions();
      this.detectAnomalousActivity();
    }, 5000);

    // Advanced keystroke monitoring
    document.addEventListener('keydown', (e) => {
      this.analyzeKeystroke(e);
    });

    // Mouse movement analysis
    document.addEventListener('mousemove', (e) => {
      this.analyzeMouseMovement(e);
    });

    // Tab/window focus monitoring
    document.addEventListener('visibilitychange', () => {
      this.logSecurityEvent('VISIBILITY_CHANGE', 
        document.hidden ? 'Tab hidden' : 'Tab visible');
    });
  }

  analyzeKeystroke(event) {
    const pattern = {
      key: event.key,
      timestamp: Date.now(),
      pressTime: performance.now()
    };
    
    // Detect rapid automated inputs (potential bots)
    if (this.lastKeystroke && 
        pattern.timestamp - this.lastKeystroke.timestamp < 50) {
      this.increaseThreatLevel(5, 'Rapid keystroke detected');
    }
    
    this.lastKeystroke = pattern;
  }

  analyzeMouseMovement(event) {
    const movement = {
      x: event.clientX,
      y: event.clientY,
      timestamp: Date.now()
    };
    
    // Detect unnatural mouse patterns
    if (this.lastMouse) {
      const distance = Math.sqrt(
        Math.pow(movement.x - this.lastMouse.x, 2) + 
        Math.pow(movement.y - this.lastMouse.y, 2)
      );
      
      if (distance > 500 && movement.timestamp - this.lastMouse.timestamp < 100) {
        this.increaseThreatLevel(2, 'Unnatural mouse movement');
      }
    }
    
    this.lastMouse = movement;
  }

  initThreatDetection() {
    // Network fingerprinting
    this.collectNetworkFingerprint();
    
    // Device fingerprinting
    this.collectDeviceFingerprint();
    
    // Behavioral analysis
    this.startBehavioralAnalysis();
  }

  collectNetworkFingerprint() {
    // Simulated network analysis
    this.networkFingerprint = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      screen: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timestamp: Date.now()
    };
  }

  collectDeviceFingerprint() {
    // Advanced device identification
    this.deviceFingerprint = {
      hardwareConcurrency: navigator.hardwareConcurrency,
      maxTouchPoints: navigator.maxTouchPoints,
      deviceMemory: navigator.deviceMemory || 'unknown',
      connection: navigator.connection?.effectiveType || 'unknown',
      canvas: this.generateCanvasFingerprint(),
      webgl: this.generateWebGLFingerprint()
    };
  }

  generateCanvasFingerprint() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('OceanCrest Security Fingerprint', 2, 2);
    return canvas.toDataURL().slice(-50);
  }

  generateWebGLFingerprint() {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl');
      return gl.getParameter(gl.RENDERER) + gl.getParameter(gl.VENDOR);
    } catch {
      return 'webgl_unavailable';
    }
  }

  async requestAccess(handbook) {
    this.currentHandbook = handbook;
    
    // Check if access session is banned
    if (this.isAccessSessionBanned()) {
      this.showSecurityAlert('Access denied - Access session banned');
      return false;
    }

    // Check threat level
    if (this.threatLevel > 75) {
      this.showSecurityAlert('Access denied - High threat level detected');
      return false;
    }

    this.showAdvancedSecurityModal();
  }

  showAdvancedSecurityModal() {
    // Remove existing modal if present
    const existingModal = document.getElementById('advancedSecurityModal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'advancedSecurityModal';
    modal.className = 'advanced-security-modal';
    modal.innerHTML = this.getAdvancedModalHTML();
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    this.initModalSecurity(modal);
    this.startBiometricSequence();
  }

  getAdvancedModalHTML() {
    return `
      <div class="security-overlay">
        <div class="security-modal">
          <div class="security-header">
            <div class="security-logo">🔒</div>
            <h2>OCEANCREST SECURITY PROTOCOL</h2>
            <p>MAXIMUM SECURITY CLEARANCE REQUIRED</p>
            <div class="threat-indicator">
              <span>Threat Level: </span>
              <span class="threat-level">${this.threatLevel}</span>
            </div>
          </div>
          
          <div class="security-phases">
            <div class="phase-step" id="phase1">
              <h3>🧬 Biometric Verification</h3>
              <div class="biometric-scanner">
                <div class="scanner-display">
                  <div class="scanner-grid"></div>
                  <div class="scan-line"></div>
                </div>
                <p class="scan-status">Initializing scanners...</p>
              </div>
              <button class="btn btn-primary" id="startBiometric">Begin Biometric Scan</button>
            </div>
            
            <div class="phase-step hidden" id="phase2">
              <h3>🔐 Multi-Factor Authentication</h3>
              <div class="auth-inputs">
                <input type="password" id="primaryCode" placeholder="Primary Access Code" class="security-input">
                <input type="password" id="secondaryKey" placeholder="Secondary Encryption Key" class="security-input">
                <div class="challenge-response">
                  <p id="challengeText">Challenge will appear here...</p>
                  <input type="text" id="challengeResponse" placeholder="Enter response" class="security-input">
                </div>
              </div>
              <button class="btn btn-primary" id="verifyCredentials">Verify Credentials</button>
            </div>
            
            <div class="phase-step hidden" id="phase3">
              <h3>🛡️ Final Security Check</h3>
              <div class="final-verification">
                <div class="security-checklist">
                  <div class="check-item" id="check1">
                    <span class="check-icon">⏳</span>
                    <span>Network integrity verification</span>
                  </div>
                  <div class="check-item" id="check2">
                    <span class="check-icon">⏳</span>
                    <span>Session encryption validation</span>
                  </div>
                  <div class="check-item" id="check3">
                    <span class="check-icon">⏳</span>
                    <span>Behavioral pattern analysis</span>
                  </div>
                  <div class="check-item" id="check4">
                    <span class="check-icon">⏳</span>
                    <span>Access authorization confirmation</span>
                  </div>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" id="securityProgress"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="security-footer">
            <button class="btn btn-secondary" id="cancelSecurity">Cancel</button>
            <div class="security-info">
              <p>🔒 All access attempts are logged and monitored</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  initModalSecurity(modal) {
    // Biometric scan button
    modal.querySelector('#startBiometric').addEventListener('click', () => {
      this.performBiometricSequence();
    });

    // Credential verification
    modal.querySelector('#verifyCredentials').addEventListener('click', () => {
      this.verifyCredentials();
    });

    // Cancel button
    modal.querySelector('#cancelSecurity').addEventListener('click', () => {
      this.closeSecurityModal();
    });

    // Prevent modal close on outside click during security process
    modal.addEventListener('click', (e) => {
      if (e.target === modal && this.securityPhase < 3) {
        this.logSecurityEvent('UNAUTHORIZED_CLOSE_ATTEMPT', 'User attempted to close security modal');
        this.increaseThreatLevel(10, 'Modal close attempt during security');
      }
    });
  }

  async performBiometricSequence() {
    const scanStatus = document.querySelector('.scan-status');
    const scannerDisplay = document.querySelector('.scanner-display');
    
    scannerDisplay.classList.add('scanning');
    
    for (const biometricType of this.biometricTypes) {
      scanStatus.textContent = `Scanning ${biometricType.replace('_', ' ')}...`;
      
      const result = await this.simulateBiometricScan(biometricType);
      
      if (!result.success) {
        this.logSecurityEvent('BIOMETRIC_FAILURE', `${biometricType} failed`);
        this.showSecurityAlert('Biometric verification failed. Access denied.');
        this.increaseThreatLevel(20, 'Biometric failure');
        return;
      }
      
      await this.delay(1000);
    }
    
    scannerDisplay.classList.remove('scanning');
    scannerDisplay.classList.add('verified');
    scanStatus.textContent = 'All biometric scans completed successfully ✓';
    
    setTimeout(() => {
      this.proceedToPhase2();
    }, 1500);
  }

  proceedToPhase2() {
    document.getElementById('phase1').classList.add('hidden');
    document.getElementById('phase2').classList.remove('hidden');
    
    // Generate dynamic challenge
    this.generateSecurityChallenge();
  }

  generateSecurityChallenge() {
    const challenges = [
      { q: 'What is the primary mission of OceanCrest?', a: 'storytelling' },
      { q: 'How many core values does OceanCrest have?', a: '5' },
      { q: 'What does "E" stand for in the executive hierarchy?', a: 'executive' },
      { q: 'What is the maximum threat level before access denial?', a: '75' },
      { q: 'Which team handles promotional content?', a: 'marketing' }
    ];
    
    this.currentChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    document.getElementById('challengeText').textContent = this.currentChallenge.q;
  }

  async verifyCredentials() {
    const primaryCode = document.getElementById('primaryCode').value;
    const secondaryKey = document.getElementById('secondaryKey').value;
    const challengeResponse = document.getElementById('challengeResponse').value;
    
    // Verify primary access code
    if (this.accessCodes[this.currentHandbook] !== primaryCode) {
      this.logFailedAttempt();
      this.showSecurityAlert('Invalid access code');
      return;
    }
    
    // Verify secondary encryption key (derived from session)
    const expectedKey = this.generateSessionKey();
    if (secondaryKey !== expectedKey) {
      this.logFailedAttempt();
      this.showSecurityAlert('Invalid encryption key');
      return;
    }
    
    // Verify challenge response
    if (challengeResponse.toLowerCase() !== this.currentChallenge.a) {
      this.logFailedAttempt();
      this.showSecurityAlert('Challenge response incorrect');
      return;
    }
    
    this.proceedToPhase3();
  }

  generateSessionKey() {
    // Generate a session-specific key based on timestamp and user data
    const sessionData = Date.now().toString().slice(-8);
    return `SEC_${sessionData}`;
  }

  async proceedToPhase3() {
    document.getElementById('phase2').classList.add('hidden');
    document.getElementById('phase3').classList.remove('hidden');
    
    // Perform final security checks
    await this.performFinalSecurityChecks();
  }

  async performFinalSecurityChecks() {
    const checks = [
      { id: 'check1', duration: 2000 },
      { id: 'check2', duration: 1500 },
      { id: 'check3', duration: 2500 },
      { id: 'check4', duration: 1000 }
    ];
    
    let progress = 0;
    const progressBar = document.getElementById('securityProgress');
    
    for (const check of checks) {
      const checkElement = document.getElementById(check.id);
      checkElement.querySelector('.check-icon').textContent = '🔄';
      
      await this.delay(check.duration);
      
      // Simulate potential security issues
      if (Math.random() < 0.1) { // 10% chance of security concern
        checkElement.querySelector('.check-icon').textContent = '⚠️';
        this.increaseThreatLevel(5, `Security concern in ${check.id}`);
      } else {
        checkElement.querySelector('.check-icon').textContent = '✅';
      }
      
      progress += 25;
      progressBar.style.width = `${progress}%`;
    }
    
    // Final access decision
    if (this.threatLevel > 50) {
      this.showSecurityAlert('Security concerns detected. Access denied.');
      return;
    }
    
    this.grantSecureAccess();
  }

  grantSecureAccess() {
    // Generate secure session token
    const sessionToken = this.generateSecureSessionToken();
    const encryptedToken = this.encryptData(sessionToken);
    
    // Store encrypted access
    sessionStorage.setItem(`handbook_${this.currentHandbook}_access`, 'granted');
    sessionStorage.setItem(`handbook_${this.currentHandbook}_token`, encryptedToken);
    sessionStorage.setItem(`handbook_${this.currentHandbook}_timestamp`, Date.now());
    
    this.logSecurityEvent('ACCESS_GRANTED', `Secure access granted to ${this.currentHandbook}`);
    
    // Close modal and redirect
    this.closeSecurityModal();
    this.redirectToHandbook();
  }

  generateSecureSessionToken() {
    return `SEC_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;
  }

  encryptData(data) {
    // Simple encryption for demo (in production, use proper crypto)
    return btoa(data + this.encryptionKey.slice(0, 16));
  }

  decryptData(encryptedData) {
    try {
      const decoded = atob(encryptedData);
      return decoded.slice(0, -16);
    } catch {
      return null;
    }
  }

  redirectToHandbook() {
    const handbookPages = {
      executive: 'executive-handbook.html',
      internal: 'internal-handbook.html',
      logs: 'executive-logs.html',
      project: 'project-handbook.html',
      hr: 'hr-handbook.html'
    };
    
    window.location.href = handbookPages[this.currentHandbook];
  }

  logFailedAttempt() {
    const accessSession = this.getCurrentAccessSession();
    const attempts = this.failedAttempts.get(accessSession.ip) || 0;
    this.failedAttempts.set(accessSession.ip, attempts + 1);

    if (attempts >= 3) {
      this.bannedAccessSessions.add(accessSession);
      this.logSecurityEvent('ACCESS_SESSION_BANNED', `Access session ${accessSession.ip} banned after multiple failed attempts`);
    }

    this.increaseThreatLevel(15, 'Failed authentication attempt');
  }

  isAccessSessionBanned() {
    const currentSession = this.getCurrentAccessSession();
    return Array.from(this.bannedAccessSessions).some(session => session.ip === currentSession.ip);
  }

  getCurrentAccessSession() {
    // Get current access session with IP address
    const ip = '192.168.1.' + Math.floor(Math.random() * 255);
    return {
      ip: ip,
      userAgent: navigator.userAgent.slice(0, 50),
      timestamp: Date.now(),
      sessionId: this.generateSessionId()
    };
  }

  generateSessionId() {
    return 'sess_' + Math.random().toString(36).substr(2, 16);
  }

  increaseThreatLevel(amount, reason) {
    this.threatLevel = Math.min(this.threatLevel + amount, 100);
    this.logSecurityEvent('THREAT_INCREASE', `${reason} (+${amount})`);
    
    // Update UI if modal is open
    const threatDisplay = document.querySelector('.threat-level');
    if (threatDisplay) {
      threatDisplay.textContent = this.threatLevel;
      threatDisplay.className = `threat-level ${this.getThreatClass()}`;
    }
  }

  getThreatClass() {
    if (this.threatLevel >= 75) return 'threat-critical';
    if (this.threatLevel >= 50) return 'threat-high';
    if (this.threatLevel >= 25) return 'threat-medium';
    return 'threat-low';
  }

  logSecurityEvent(type, description) {
    const event = {
      timestamp: new Date().toISOString(),
      type,
      description,
      threatLevel: this.threatLevel,
      userAgent: navigator.userAgent.slice(0, 50),
      accessSession: this.getCurrentAccessSession()
    };
    
    this.securityLogs.push(event);
    console.log(`[SECURITY] ${type}: ${description}`);
    
    // Keep only last 100 logs
    if (this.securityLogs.length > 100) {
      this.securityLogs = this.securityLogs.slice(-100);
    }
  }

  showSecurityAlert(message) {
    const alert = document.createElement('div');
    alert.className = 'security-alert';
    alert.innerHTML = `
      <div class="alert-content">
        <span class="alert-icon">🚨</span>
        <span class="alert-text">${message}</span>
      </div>
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
      alert.remove();
    }, 5000);
  }

  closeSecurityModal() {
    const modal = document.getElementById('advancedSecurityModal');
    if (modal) {
      modal.remove();
      document.body.style.overflow = '';
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Verify access for protected pages
  verifyPageAccess(handbookType) {
    const hasAccess = sessionStorage.getItem(`handbook_${handbookType}_access`);
    const token = sessionStorage.getItem(`handbook_${handbookType}_token`);
    const timestamp = sessionStorage.getItem(`handbook_${handbookType}_timestamp`);
    
    if (!hasAccess || !token || !timestamp) {
      this.logSecurityEvent('UNAUTHORIZED_ACCESS', `Attempt to access ${handbookType} without proper authentication`);
      window.location.href = 'handbooks.html';
      return false;
    }
    
    // Check token expiry (30 minutes)
    const accessTime = parseInt(timestamp);
    const currentTime = Date.now();
    if (currentTime - accessTime > 30 * 60 * 1000) {
      this.logSecurityEvent('TOKEN_EXPIRED', `Access token expired for ${handbookType}`);
      this.clearAccess(handbookType);
      window.location.href = 'handbooks.html';
      return false;
    }
    
    // Verify token integrity
    const decryptedToken = this.decryptData(token);
    if (!decryptedToken || !decryptedToken.startsWith('SEC_')) {
      this.logSecurityEvent('TOKEN_INVALID', `Invalid token for ${handbookType}`);
      this.clearAccess(handbookType);
      window.location.href = 'handbooks.html';
      return false;
    }
    
    return true;
  }

  clearAccess(handbookType) {
    sessionStorage.removeItem(`handbook_${handbookType}_access`);
    sessionStorage.removeItem(`handbook_${handbookType}_token`);
    sessionStorage.removeItem(`handbook_${handbookType}_timestamp`);
  }

  // Clean up expired sessions
  cleanupExpiredSessions() {
    const handbooks = ['executive', 'internal', 'logs', 'project', 'hr'];
    
    handbooks.forEach(handbook => {
      const timestamp = sessionStorage.getItem(`handbook_${handbook}_timestamp`);
      if (timestamp) {
        const accessTime = parseInt(timestamp);
        const currentTime = Date.now();
        if (currentTime - accessTime > 30 * 60 * 1000) {
          this.clearAccess(handbook);
        }
      }
    });
  }

  // Advanced analytics for suspicious activity
  detectAnomalousActivity() {
    // Detect rapid page refreshes
    if (this.pageLoads && this.pageLoads.length > 10) {
      const recentLoads = this.pageLoads.filter(load => 
        Date.now() - load < 60000 // Last minute
      );
      
      if (recentLoads.length > 5) {
        this.increaseThreatLevel(10, 'Rapid page refreshes detected');
      }
    }
    
    // Detect unusual timing patterns
    if (this.securityLogs.length > 20) {
      const recentEvents = this.securityLogs.slice(-20);
      const intervals = [];
      
      for (let i = 1; i < recentEvents.length; i++) {
        const interval = new Date(recentEvents[i].timestamp) - new Date(recentEvents[i-1].timestamp);
        intervals.push(interval);
      }
      
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      if (avgInterval < 100) { // Less than 100ms average
        this.increaseThreatLevel(5, 'Automated behavior pattern detected');
      }
    }
  }

  analyzeThreatLevel() {
    // Gradually reduce threat level over time if no new threats
    if (this.threatLevel > 0) {
      this.threatLevel = Math.max(0, this.threatLevel - 0.5);
    }
  }

  startBehavioralAnalysis() {
    // Track page loads
    this.pageLoads = this.pageLoads || [];
    this.pageLoads.push(Date.now());
    
    // Keep only recent loads
    this.pageLoads = this.pageLoads.filter(load => Date.now() - load < 300000); // 5 minutes
  }
}

// Initialize the advanced security system
window.advancedSecurity = new AdvancedHandbookSecurity();
