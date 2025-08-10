/**
 * OCEANCREST ENTERTAINMENT - SIMPLIFIED TEAM SECURITY SYSTEM
 * Team Member Authentication with IP Logging
 */

class TeamSecuritySystem {
  constructor() {
    this.teamMembers = [
      'natxeula',
      'future',
      'mr80',
      'kat',
      'puzzles',
      'muelio',
      'fortune',
      'adjective',
      'Tempest',
      'Plushie',
      '0r4n',
      'MV',
      'yeah_no',
      'fork'
    ];

    // Executive-level access (restricted to executive team only)
    this.executiveMembers = [
      'natxeula',
      'future',
      'mr80',
      'kat',
      'puzzles',
      'muelio',
      'fortune',
      'adjective'
    ];
    
    this.accessCodes = {
      executive: 'industrializablecurrents',
      internal: 'staffcrest',
      logs: 'firedrialist'
    };
    
    this.currentHandbook = null;
    this.authorizedAccessSessions = new Map(); // teamMember -> AccessSession
    this.accessLogs = [];
    this.bannedAccessSessions = new Set();
    
    this.init();
  }

  init() {
    this.loadStoredData();
    this.logToFile('SYSTEM_INIT', 'Team security system initialized');
    console.log('🔐 OCEANCREST TEAM SECURITY ACTIVE 🔐');
    console.log('Team Members:', this.teamMembers);
  }

  loadStoredData() {
    // Load from localStorage (simulating file system)
    const storedSessions = localStorage.getItem('oceancrest_authorized_access_sessions');
    const storedBanned = localStorage.getItem('oceancrest_banned_access_sessions');
    const storedLogs = localStorage.getItem('oceancrest_access_logs');

    if (storedSessions) {
      this.authorizedAccessSessions = new Map(JSON.parse(storedSessions));
    }
    if (storedBanned) {
      this.bannedAccessSessions = new Set(JSON.parse(storedBanned));
    }
    if (storedLogs) {
      this.accessLogs = JSON.parse(storedLogs);
    }
  }

  saveToFile(filename, data) {
    // Simulate writing to text files by storing in localStorage
    localStorage.setItem(filename, JSON.stringify(data));
    
    // Also create downloadable file for admin
    if (filename === 'oceancrest_access_logs') {
      this.createDownloadableLog();
    }
  }

  createDownloadableLog() {
    const logContent = this.accessLogs.map(log =>
      `[${log.timestamp}] ${log.type}: ${log.description} (Access Session IP: ${log.accessSession ? log.accessSession.ip : log.ip})`
    ).join('\n');

    // Store for potential download
    localStorage.setItem('oceancrest_log_content', logContent);
  }

  logToFile(type, description, teamMember = null) {
    const currentAccessSession = this.getCurrentAccessSession();
    const logEntry = {
      timestamp: new Date().toISOString(),
      type,
      description,
      accessSession: currentAccessSession,
      teamMember: teamMember || 'unknown',
      userAgent: navigator.userAgent.slice(0, 50)
    };
    
    this.accessLogs.push(logEntry);
    
    // Keep only last 500 entries
    if (this.accessLogs.length > 500) {
      this.accessLogs = this.accessLogs.slice(-500);
    }
    
    this.saveToFile('oceancrest_access_logs', this.accessLogs);
    console.log(`[SECURITY LOG] ${type}: ${description}`);
  }

  getSimulatedIP() {
    // Simulate IP address (in real implementation this would be server-side)
    let ip = localStorage.getItem('simulated_ip');
    if (!ip) {
      ip = `192.168.1.${Math.floor(Math.random() * 255)}`;
      localStorage.setItem('simulated_ip', ip);
    }
    return ip;
  }

  checkIPAccess(teamMember) {
    const currentIP = this.getSimulatedIP();
    
    // Check if IP is banned
    if (this.bannedIPs.has(currentIP)) {
      this.logToFile('ACCESS_DENIED', `Banned IP attempted access`, teamMember);
      return { allowed: false, reason: 'IP_BANNED' };
    }
    
    // Check if team member has an authorized IP
    if (this.authorizedIPs.has(teamMember.toLowerCase())) {
      const authorizedIP = this.authorizedIPs.get(teamMember.toLowerCase());
      
      if (authorizedIP !== currentIP) {
        // Different IP detected - ban this IP and deny access
        this.bannedIPs.add(currentIP);
        this.saveToFile('oceancrest_banned_ips', Array.from(this.bannedIPs));
        this.logToFile('IP_MISMATCH_BANNED', `Unauthorized IP ${currentIP} banned. Expected: ${authorizedIP}`, teamMember);
        return { allowed: false, reason: 'IP_MISMATCH' };
      }
    } else {
      // First time login - register this IP
      this.authorizedIPs.set(teamMember.toLowerCase(), currentIP);
      this.saveToFile('oceancrest_authorized_ips', Array.from(this.authorizedIPs.entries()));
      this.logToFile('IP_REGISTERED', `New IP registered for team member`, teamMember);
    }
    
    return { allowed: true };
  }

  requestAccess(handbook) {
    this.currentHandbook = handbook;
    
    // Check if handbook is available
    const availableHandbooks = ['executive', 'internal', 'logs'];
    if (!availableHandbooks.includes(handbook)) {
      this.showAlert('This handbook is coming soon!', 'info');
      return;
    }

    this.showTeamLoginModal();
  }

  showTeamLoginModal() {
    // Remove existing modal if present
    const existingModal = document.getElementById('teamLoginModal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'teamLoginModal';
    modal.className = 'team-login-modal';
    modal.innerHTML = this.getTeamLoginHTML();
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    this.initModalEvents(modal);

    // Update placeholder for executive access
    const nameInput = modal.querySelector('#teamMemberName');
    if (this.currentHandbook === 'executive' || this.currentHandbook === 'logs') {
      nameInput.placeholder = 'Executive access only (natxeula, future, mr80, kat, puzzles, muelio, fortune, adjective)';
    }
  }

  getTeamLoginHTML() {
    return `
      <div class="security-overlay">
        <div class="team-login-form">
          <div class="login-header">
            <div class="security-logo">🔒</div>
            <h2>OCEANCREST TEAM ACCESS</h2>
            <p>Enter your team member name to access handbook</p>
            <div class="handbook-info">
              <span>Accessing: <strong>${this.currentHandbook.toUpperCase()} HANDBOOK</strong></span>
            </div>
          </div>
          
          <div class="login-content">
            <div class="input-section">
              <label for="teamMemberName">Team Member Name:</label>
              <input
                type="text"
                id="teamMemberName"
                class="team-input"
                placeholder="Enter your team member name"
                autocomplete="off"
              >
              <div class="team-suggestions" id="teamSuggestions"></div>
            </div>
            
            <div class="access-code-section">
              <label for="accessCode">Access Code:</label>
              <input 
                type="password" 
                id="accessCode" 
                class="team-input" 
                placeholder="Enter handbook access code"
              >
            </div>
            
            <div class="security-info">
              <p>📋 Your access will be tracked for security</p>
              <p>⚠️ Session will be monitored for team verification</p>
            </div>
            
            <div class="login-buttons">
              <button class="btn btn-primary" id="teamLogin">Access Handbook</button>
              <button class="btn btn-secondary" id="cancelLogin">Cancel</button>
            </div>
            
            <div class="security-notice">
              <p>🔐 All access attempts are logged for security</p>
              <p>🚫 Unauthorized access attempts are tracked</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  initModalEvents(modal) {
    const teamInput = modal.querySelector('#teamMemberName');
    const codeInput = modal.querySelector('#accessCode');
    const loginBtn = modal.querySelector('#teamLogin');
    const cancelBtn = modal.querySelector('#cancelLogin');
    const suggestions = modal.querySelector('#teamSuggestions');

    // Team member suggestions
    teamInput.addEventListener('input', (e) => {
      this.showTeamSuggestions(e.target.value, suggestions);
    });

    // Login button
    loginBtn.addEventListener('click', () => {
      this.attemptTeamLogin(teamInput.value, codeInput.value);
    });

    // Cancel button
    cancelBtn.addEventListener('click', () => {
      this.closeModal();
    });

    // Enter key support
    modal.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.attemptTeamLogin(teamInput.value, codeInput.value);
      }
    });

    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    });

    // Focus first input
    teamInput.focus();
  }

  showTeamSuggestions(input, suggestionsEl) {
    if (!input || input.length < 2) {
      suggestionsEl.innerHTML = '';
      return;
    }

    const matches = this.teamMembers.filter(member => 
      member.toLowerCase().includes(input.toLowerCase())
    );

    if (matches.length > 0) {
      suggestionsEl.innerHTML = matches.slice(0, 5).map(member => 
        `<div class="suggestion-item" onclick="selectTeamMember('${member}')">${member}</div>`
      ).join('');
    } else {
      suggestionsEl.innerHTML = '<div class="no-suggestions">No matching team members</div>';
    }
  }

  attemptTeamLogin(teamMember, accessCode) {
    // Validate inputs
    if (!teamMember || !accessCode) {
      this.showAlert('Please enter both team member name and access code', 'error');
      return;
    }

    // Check if team member exists
    const memberExists = this.teamMembers.some(member =>
      member.toLowerCase() === teamMember.toLowerCase()
    );

    if (!memberExists) {
      this.logToFile('INVALID_TEAM_MEMBER', `Unknown team member attempted access: ${teamMember}`);
      this.showAlert('Invalid team member name', 'error');
      return;
    }

    // Check executive access for executive handbooks and logs
    if ((this.currentHandbook === 'executive' || this.currentHandbook === 'logs')) {
      const hasExecutiveAccess = this.executiveMembers.some(member =>
        member.toLowerCase() === teamMember.toLowerCase()
      );

      if (!hasExecutiveAccess) {
        this.logToFile('EXECUTIVE_ACCESS_DENIED', `Non-executive member attempted executive access: ${teamMember}`);
        this.showAlert('Executive access required. You do not have permission to access this handbook.', 'error');
        return;
      }
    }

    // Check access code
    if (this.accessCodes[this.currentHandbook] !== accessCode) {
      this.logToFile('INVALID_ACCESS_CODE', `Wrong access code for ${this.currentHandbook}`, teamMember);
      this.showAlert('Invalid access code', 'error');
      return;
    }

    // Check IP access
    const ipCheck = this.checkIPAccess(teamMember);
    if (!ipCheck.allowed) {
      let message = 'Access denied';
      if (ipCheck.reason === 'IP_BANNED') {
        message = 'Your access has been restricted for security reasons';
      } else if (ipCheck.reason === 'IP_MISMATCH') {
        message = `Access denied: Security verification failed. Your access has been restricted.`;
      }
      this.showAlert(message, 'error');
      return;
    }

    // Success - grant access
    this.grantAccess(teamMember);
  }

  grantAccess(teamMember) {
    // Generate secure session
    const sessionToken = `TEAM_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;
    
    // Store access
    sessionStorage.setItem(`handbook_${this.currentHandbook}_access`, 'granted');
    sessionStorage.setItem(`handbook_${this.currentHandbook}_team_member`, teamMember);
    sessionStorage.setItem(`handbook_${this.currentHandbook}_session`, sessionToken);
    sessionStorage.setItem(`handbook_${this.currentHandbook}_timestamp`, Date.now());

    this.logToFile('ACCESS_GRANTED', `Handbook access granted`, teamMember);
    
    this.showAlert(`Welcome ${teamMember}! Redirecting to handbook...`, 'success');
    
    setTimeout(() => {
      this.closeModal();
      this.redirectToHandbook();
    }, 2000);
  }

  redirectToHandbook() {
    const handbookPages = {
      executive: 'executive-handbook.html',
      internal: 'internal-handbook.html', 
      logs: 'executive-logs.html'
    };
    
    window.location.href = handbookPages[this.currentHandbook];
  }

  verifyPageAccess(handbookType) {
    const hasAccess = sessionStorage.getItem(`handbook_${handbookType}_access`);
    const teamMember = sessionStorage.getItem(`handbook_${handbookType}_team_member`);
    const timestamp = sessionStorage.getItem(`handbook_${handbookType}_timestamp`);
    
    if (!hasAccess || !teamMember || !timestamp) {
      this.logToFile('UNAUTHORIZED_ACCESS', `Attempt to access ${handbookType} without authentication`);
      window.location.href = 'handbooks.html';
      return false;
    }
    
    // Check session expiry (2 hours)
    const accessTime = parseInt(timestamp);
    const currentTime = Date.now();
    if (currentTime - accessTime > 2 * 60 * 60 * 1000) {
      this.logToFile('SESSION_EXPIRED', `Session expired for ${handbookType}`, teamMember);
      this.clearAccess(handbookType);
      window.location.href = 'handbooks.html';
      return false;
    }

    // Verify IP still matches
    const ipCheck = this.checkIPAccess(teamMember);
    if (!ipCheck.allowed) {
      this.logToFile('IP_VERIFICATION_FAILED', `IP verification failed for active session`, teamMember);
      this.clearAccess(handbookType);
      window.location.href = 'handbooks.html';
      return false;
    }
    
    return true;
  }

  clearAccess(handbookType) {
    sessionStorage.removeItem(`handbook_${handbookType}_access`);
    sessionStorage.removeItem(`handbook_${handbookType}_team_member`);
    sessionStorage.removeItem(`handbook_${handbookType}_session`);
    sessionStorage.removeItem(`handbook_${handbookType}_timestamp`);
  }

  showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `team-alert team-alert-${type}`;
    
    const icon = type === 'error' ? '🚨' : type === 'success' ? '✅' : 'ℹ️';
    
    alert.innerHTML = `
      <div class="alert-content">
        <span class="alert-icon">${icon}</span>
        <span class="alert-text">${message}</span>
      </div>
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
      alert.remove();
    }, 5000);
  }

  getPlaceholderText() {
    if (this.currentHandbook === 'executive' || this.currentHandbook === 'logs') {
      return 'Enter executive name (natxeula, future, mr80, kat, puzzles, muelio, fortune, adjective)';
    }
    return 'Enter your team member name';
  }

  closeModal() {
    const modal = document.getElementById('teamLoginModal');
    if (modal) {
      modal.remove();
      document.body.style.overflow = '';
    }
  }

  // Admin functions for text file management
  downloadAccessLogs() {
    const logContent = localStorage.getItem('oceancrest_log_content') || 'No logs available';
    const blob = new Blob([logContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `oceancrest-access-logs-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
  }

  getSystemStatus() {
    return {
      authorizedTeamMembers: this.authorizedIPs.size,
      bannedIPs: this.bannedIPs.size,
      totalLogs: this.accessLogs.length,
      lastActivity: this.accessLogs.length > 0 ? this.accessLogs[this.accessLogs.length - 1].timestamp : 'None'
    };
  }
}

// Global function for team member suggestions
function selectTeamMember(member) {
  document.getElementById('teamMemberName').value = member;
  document.getElementById('teamSuggestions').innerHTML = '';
  document.getElementById('accessCode').focus();
}

// Initialize the team security system
window.teamSecurity = new TeamSecuritySystem();
