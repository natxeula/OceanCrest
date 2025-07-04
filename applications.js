// Applications Management System
class ApplicationsManager {
  constructor() {
    this.applications = [];
    this.currentPage = 1;
    this.itemsPerPage = 5;
    this.filteredApplications = [];
    this.isOnline = navigator.onLine;
    this.lastOnlineCheck = Date.now();
    this.init();
  }

  async init() {
    this.setupOnlineDetection();
    await this.loadApplications();
    this.updateStats();
    this.renderApplications();
    this.setupEventListeners();
  }

  setupOnlineDetection() {
    // Listen for service worker messages
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data && event.data.type === "NETWORK_STATUS") {
          this.handleNetworkStatusChange(
            event.data.online,
            event.data.timestamp,
          );
        }
      });

      // Request immediate status check
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.active) {
          registration.active.postMessage({ type: "CHECK_ONLINE_STATUS" });
        }
      });
    }

    // Listen for browser online/offline events
    window.addEventListener("online", () => {
      console.log("Browser detected online");
      this.checkServerConnection();
    });

    window.addEventListener("offline", () => {
      console.log("Browser detected offline");
      this.handleNetworkStatusChange(false, Date.now());
    });

    // Periodic connection check
    setInterval(() => {
      if (navigator.onLine) {
        this.checkServerConnection();
      }
    }, 60000); // Check every minute
  }

  handleNetworkStatusChange(isOnline, timestamp) {
    const wasOnline = this.isOnline;
    this.isOnline = isOnline;
    this.lastOnlineCheck = timestamp || Date.now();

    console.log(`Network status changed: ${isOnline ? "ONLINE" : "OFFLINE"}`);

    // If we just came back online, reload applications
    if (!wasOnline && isOnline) {
      console.log("🟢 Connection restored! Reloading applications...");
      this.loadApplications();
    }

    // Update status display
    this.updateConnectionStatus();
  }

  async checkServerConnection() {
    try {
      const response = await fetch("/api/applications", {
        method: "HEAD",
        cache: "no-cache",
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });

      this.handleNetworkStatusChange(response.ok, Date.now());
    } catch (error) {
      console.log("Server connection check failed:", error.message);
      this.handleNetworkStatusChange(false, Date.now());
    }
  }

  updateConnectionStatus() {
    const currentTime = Date.now();
    const timeSinceCheck = currentTime - this.lastOnlineCheck;

    // If it's been more than 2 minutes since last check, status is uncertain
    const isStatusCurrent = timeSinceCheck < 120000;

    let source, count;
    if (this.isOnline && isStatusCurrent) {
      source = "database";
      count = this.applications.length;
    } else if (!this.isOnline) {
      source = "localStorage (offline)";
      count = this.applications.length;
    } else {
      source = "status uncertain";
      count = this.applications.length;
    }

    this.showConnectionStatus(source, count);
  }

  setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById("searchApplications");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchApplications(e.target.value);
      });
    }

    // Filter functionality
    const positionFilter = document.getElementById("positionFilter");
    if (positionFilter) {
      positionFilter.addEventListener("change", (e) => {
        this.filterByPosition(e.target.value);
      });
    }

    // Team filter functionality
    const teamFilter = document.getElementById("teamFilter");
    if (teamFilter) {
      teamFilter.addEventListener("change", (e) => {
        this.filterByTeam(e.target.value);
      });
    }

    // Manual refresh button
    const refreshButton = document.getElementById("refreshApplications");
    if (refreshButton) {
      refreshButton.addEventListener("click", () => {
        this.checkServerConnection();
        this.loadApplications();
      });
    }
  }

  async loadApplications() {
    try {
      console.log("🔄 Loading applications from server...");

      const response = await fetch("/api/applications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache", // Always try to get fresh data
      });

      if (response.ok) {
        const data = await response.json();
        const newApplications = data.applications || [];

        // Check for new applications since last load
        const previousCount = this.applications.length;
        const newCount = newApplications.length;

        this.applications = newApplications;
        this.filteredApplications = [...this.applications];

        // Save to localStorage for offline access
        try {
          localStorage.setItem(
            "oceancrest_applications",
            JSON.stringify(this.applications),
          );
        } catch (e) {
          console.warn("Failed to save to localStorage:", e.message);
        }

        console.log(
          `✅ Loaded ${this.applications.length} applications from ${data.source}`,
        );

        // Show notification for new applications
        if (newCount > previousCount) {
          const newAppsCount = newCount - previousCount;
          this.showToast(
            `🎉 ${newAppsCount} new application${newAppsCount > 1 ? "s" : ""} received!`,
            "success",
          );
        }

        // Update online status
        this.handleNetworkStatusChange(true, Date.now());
      } else {
        console.error(
          `❌ Server error ${response.status}: Failed to load applications`,
        );
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (error) {
      console.error(
        "❌ Failed to load from server, trying localStorage:",
        error.message,
      );

      // Update offline status
      this.handleNetworkStatusChange(false, Date.now());

      // Fallback to localStorage
      try {
        const savedApplications = localStorage.getItem(
          "oceancrest_applications",
        );
        if (savedApplications) {
          this.applications = JSON.parse(savedApplications);
          this.filteredApplications = [...this.applications];
          console.log(
            `💾 Loaded ${this.applications.length} applications from localStorage`,
          );
        } else {
          this.applications = [];
          this.filteredApplications = [];
          console.log("📭 No applications found in localStorage");
        }
      } catch (localError) {
        console.error("❌ Failed to load from localStorage:", localError);
        this.applications = [];
        this.filteredApplications = [];
      }
    }
  }

  showConnectionStatus(source, count) {
    // Create or update status indicator
    let statusElement = document.getElementById("connectionStatus");
    if (!statusElement) {
      statusElement = document.createElement("div");
      statusElement.id = "connectionStatus";
      statusElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: 0.9rem;
        z-index: 1000;
        transition: all 0.3s ease;
        cursor: pointer;
      `;

      // Add click to refresh functionality
      statusElement.addEventListener("click", () => {
        this.checkServerConnection();
        this.loadApplications();
      });

      document.body.appendChild(statusElement);
    }

    let statusText = "";
    let statusColor = "";
    const currentTime = Date.now();
    const timeSinceCheck = currentTime - this.lastOnlineCheck;

    // Use actual online status from our detection system
    if (this.isOnline && timeSinceCheck < 120000) {
      // Status is current (within 2 minutes)
      statusText = `🟢 Online - Server Connected (${count} apps)`;
      statusColor = "#238636";
    } else if (!this.isOnline) {
      statusText = `🔴 Offline Mode (${count} apps cached)`;
      statusColor = "#f85149";
    } else {
      // Status is uncertain
      statusText = `🟡 Connection Status Unknown (${count} apps)`;
      statusColor = "#d1a500";
    }

    // Add last check time for offline/uncertain states
    if (!this.isOnline || timeSinceCheck > 120000) {
      const lastCheckTime = new Date(this.lastOnlineCheck).toLocaleTimeString();
      statusText += ` • Last check: ${lastCheckTime}`;
    }

    statusElement.textContent = statusText;
    statusElement.style.backgroundColor = statusColor;
    statusElement.style.color = "white";
    statusElement.title = "Click to refresh connection";

    // Only auto-hide for successful online connections
    if (this.isOnline && timeSinceCheck < 30000) {
      setTimeout(() => {
        if (statusElement && statusElement.parentNode) {
          statusElement.style.opacity = "0.7";
        }
      }, 5000);
    } else {
      // Keep offline/uncertain status visible
      statusElement.style.opacity = "1";
    }
  }

  saveApplications() {
    // Note: Individual applications are saved via the form submission
    // This method exists for compatibility but doesn't need to do anything
    // since we're now reading directly from the server file
  }

  updateStats() {
    const today = new Date().toDateString();
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const todayCount = this.applications.filter(
      (app) => new Date(app.submittedAt).toDateString() === today,
    ).length;

    const weekCount = this.applications.filter(
      (app) => new Date(app.submittedAt) >= weekAgo,
    ).length;

    const totalElement = document.getElementById("totalApplications");
    const todayElement = document.getElementById("todayApplications");
    const weekElement = document.getElementById("weekApplications");

    if (totalElement) totalElement.textContent = this.applications.length;
    if (todayElement) todayElement.textContent = todayCount;
    if (weekElement) weekElement.textContent = weekCount;
  }

  searchApplications(query) {
    const searchTerm = query.toLowerCase().trim();

    if (!searchTerm) {
      this.filteredApplications = [...this.applications];
    } else {
      this.filteredApplications = this.applications.filter((app) => {
        const fullName =
          app.preferredName ||
          `${app.firstName || ""} ${app.lastName || ""}`.trim();
        const contact = app.discordUser || app.email || "";
        const role =
          app.specificRole || this.getPositionDisplayName(app.position) || "";
        const team = app.team ? this.getTeamDisplayName(app.team) : "";

        return (
          fullName.toLowerCase().includes(searchTerm) ||
          contact.toLowerCase().includes(searchTerm) ||
          role.toLowerCase().includes(searchTerm) ||
          team.toLowerCase().includes(searchTerm)
        );
      });
    }

    this.currentPage = 1;
    this.renderApplications();
  }

  filterByPosition(position) {
    if (!position) {
      this.filteredApplications = [...this.applications];
    } else {
      this.filteredApplications = this.applications.filter(
        (app) => app.position === position,
      );
    }

    this.currentPage = 1;
    this.renderApplications();
  }

  filterByTeam(team) {
    if (!team) {
      this.filteredApplications = [...this.applications];
    } else {
      this.filteredApplications = this.applications.filter(
        (app) => app.team === team,
      );
    }

    this.currentPage = 1;
    this.renderApplications();
  }

  renderApplications() {
    const container = document.getElementById("applicationsContainer");
    const noApplicationsElement = document.getElementById("noApplications");

    if (!container) return;

    if (this.filteredApplications.length === 0) {
      container.innerHTML = "";
      if (noApplicationsElement) {
        noApplicationsElement.style.display = "block";
      }
      this.hidePagination();
      return;
    }

    if (noApplicationsElement) {
      noApplicationsElement.style.display = "none";
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const pageApplications = this.filteredApplications.slice(
      startIndex,
      endIndex,
    );

    const applicationsHTML = pageApplications
      .map((app) => this.createApplicationCard(app))
      .join("");
    container.innerHTML = applicationsHTML;

    this.updatePagination();
  }

  createApplicationCard(application) {
    const submittedDate = new Date(
      application.submittedAt,
    ).toLocaleDateString();

    // Handle both old and new form structures
    const applicantName =
      application.preferredName ||
      `${application.firstName || ""} ${application.lastName || ""}`.trim() ||
      "N/A";

    const contactInfo = application.discordUser || application.email || "N/A";
    const contactIcon = application.discordUser ? "💬" : "📧";

    const positionTitle =
      application.specificRole ||
      this.getPositionDisplayName(application.position) ||
      "N/A";

    const teamBadge = application.team
      ? `<div class="team-badge">${this.getTeamDisplayName(application.team)}</div>`
      : "";

    return `
      <div class="application-card glass-card" data-id="${application.id}">
        <div class="application-header">
          <div class="applicant-info">
            <h3>${applicantName}</h3>
            <p>${contactIcon} ${contactInfo}</p>
            ${application.portfolio ? `<p>🌐 <a href="${application.portfolio}" target="_blank" class="gradient-link">Portfolio</a></p>` : ""}
            ${application.linkedin ? `<p>💼 <a href="${application.linkedin}" target="_blank" class="gradient-link">LinkedIn</a></p>` : ""}
          </div>
          <div class="application-date">${submittedDate}</div>
        </div>

        <div class="badges-container">
          <div class="position-badge">${positionTitle}</div>
          ${teamBadge}
          ${application.experience ? `<div class="experience-badge">${this.getExperienceDisplayName(application.experience)}</div>` : ""}
        </div>

        <div class="application-actions">
          <button class="btn btn-primary btn-small" onclick="toggleApplicationDetails('${application.id}')">
            View Details
          </button>
          <button class="btn btn-secondary btn-small" onclick="contactApplicant('${contactInfo}', '${applicantName}')">
            Contact
          </button>
          <button class="btn btn-warning btn-small" onclick="deleteApplication('${application.id}')">
            Delete
          </button>
        </div>

        <div class="application-expanded" id="details-${application.id}">
          ${
            application.generalDetails
              ? `
            <div class="detail-item">
              <span class="detail-label">General Details</span>
              <div class="general-details-text">${application.generalDetails}</div>
            </div>
          `
              : ""
          }
          ${
            application.motivation
              ? `
            <div class="detail-item" style="margin-top: 1rem;">
              <span class="detail-label">Motivation</span>
              <div class="motivation-text">${application.motivation}</div>
            </div>
          `
              : ""
          }
          ${
            application.experienceDetail
              ? `
            <div class="detail-item" style="margin-top: 1rem;">
              <span class="detail-label">Experience & Skills</span>
              <div class="experience-detail-text">${application.experienceDetail}</div>
            </div>
          `
              : ""
          }
          ${
            application.sceneWriting
              ? `
            <div class="detail-item" style="margin-top: 1rem;">
              <span class="detail-label">Writing Sample</span>
              <div class="scene-writing-text">${application.sceneWriting}</div>
            </div>
          `
              : ""
          }
          ${
            application.additionalLinks
              ? `
            <div class="detail-item" style="margin-top: 1rem;">
              <span class="detail-label">Additional Links</span>
              <div class="additional-links-text">${application.additionalLinks}</div>
            </div>
          `
              : ""
          }
          ${
            application.availability
              ? `
            <div class="detail-item" style="margin-top: 1rem;">
              <span class="detail-label">Availability</span>
              <div class="availability-text">${this.getAvailabilityDisplayName(application.availability)}</div>
            </div>
          `
              : ""
          }
        </div>
      </div>
    `;
  }

  getPositionDisplayName(position) {
    const positions = {
      writer: "Writer / Script Writer",
      director: "Director",
      producer: "Producer",
      cinematographer: "Cinematographer",
      editor: "Editor",
      "sound-engineer": "Sound Engineer",
      "vfx-artist": "VFX Artist",
      "production-manager": "Production Manager",
      "marketing-specialist": "Marketing Specialist",
      "business-development": "Business Development",
      other: "Other",
    };
    return positions[position] || position;
  }

  getExperienceDisplayName(experience) {
    const levels = {
      "0-1": "0-1 years (Entry Level)",
      "2-3": "2-3 years",
      "4-6": "4-6 years",
      "7-10": "7-10 years",
      "10+": "10+ years (Senior Level)",
    };
    return levels[experience] || experience;
  }

  getAvailabilityDisplayName(availability) {
    const availabilities = {
      immediate: "Available Immediately",
      "2-weeks": "2 weeks notice",
      "1-month": "1 month notice",
      negotiable: "Negotiable",
    };
    return availabilities[availability] || availability;
  }

  getTeamDisplayName(team) {
    const teams = {
      executive: "Executive Team",
      writing: "Writing Team",
      acting: "Acting Team",
      building: "Building Team",
      "post-production": "Post-Production Team",
      storyboard: "Storyboard Team",
      cameras: "Cameras Team",
      marketing: "Marketing Team",
      lore: "Lore Team",
      qa: "QA Team",
    };
    return teams[team] || team;
  }

  updatePagination() {
    const totalPages = Math.ceil(
      this.filteredApplications.length / this.itemsPerPage,
    );
    const paginationElement = document.getElementById("applicationsPagination");
    const paginationInfo = document.getElementById("paginationInfo");
    const prevButton = document.getElementById("prevPage");
    const nextButton = document.getElementById("nextPage");

    if (totalPages <= 1) {
      this.hidePagination();
      return;
    }

    if (paginationElement) {
      paginationElement.style.display = "flex";
    }

    if (paginationInfo) {
      paginationInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;
    }

    if (prevButton) {
      prevButton.disabled = this.currentPage === 1;
    }

    if (nextButton) {
      nextButton.disabled = this.currentPage === totalPages;
    }
  }

  hidePagination() {
    const paginationElement = document.getElementById("applicationsPagination");
    if (paginationElement) {
      paginationElement.style.display = "none";
    }
  }

  changePage(direction) {
    const totalPages = Math.ceil(
      this.filteredApplications.length / this.itemsPerPage,
    );
    const newPage = this.currentPage + direction;

    if (newPage >= 1 && newPage <= totalPages) {
      this.currentPage = newPage;
      this.renderApplications();
    }
  }

  async deleteApplication(id) {
    if (
      !confirm(
        "Are you sure you want to delete this application? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Remove from local arrays
        this.applications = this.applications.filter((app) => app.id !== id);
        this.filteredApplications = this.filteredApplications.filter(
          (app) => app.id !== id,
        );
        this.updateStats();
        this.renderApplications();

        this.showToast("Application deleted successfully", "success");
      } else {
        throw new Error("Failed to delete application");
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      this.showToast("Error deleting application. Please try again.", "error");
    }
  }

  async clearAllApplications() {
    if (
      !confirm(
        "Are you sure you want to delete ALL applications? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      const response = await fetch("/api/applications", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        this.applications = [];
        this.filteredApplications = [];
        this.updateStats();
        this.renderApplications();

        this.showToast("All applications deleted successfully", "success");
      } else {
        throw new Error("Failed to delete applications");
      }
    } catch (error) {
      console.error("Error clearing applications:", error);
      this.showToast("Error deleting applications. Please try again.", "error");
    }
  }

  exportApplications() {
    if (this.applications.length === 0) {
      alert("No applications to export.");
      return;
    }

    const csvContent = this.convertToCSV(this.applications);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `oceancrest_applications_${new Date().toISOString().split("T")[0]}.csv`,
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  showToast(message, type = "info") {
    // Create toast notification
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "success" ? "#238636" : type === "error" ? "#f85149" : "#0d1117"};
      color: white;
      padding: 1rem;
      border-radius: 8px;
      z-index: 1000;
      transform: translateX(400px);
      transition: transform 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.transform = "translateX(0)";
    }, 100);

    setTimeout(() => {
      toast.style.transform = "translateX(400px)";
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  convertToCSV(applications) {
    const headers = [
      "Submitted Date",
      "Name",
      "Contact Info",
      "Team",
      "Position/Role",
      "Experience",
      "Portfolio",
      "Details",
      "Additional Info",
    ];

    const csvRows = [headers.join(",")];

    applications.forEach((app) => {
      const fullName =
        app.preferredName ||
        `${app.firstName || ""} ${app.lastName || ""}`.trim() ||
        "N/A";
      const contact = app.discordUser || app.email || "N/A";
      const position =
        app.specificRole || this.getPositionDisplayName(app.position) || "N/A";
      const details = app.generalDetails || app.motivation || "N/A";
      const additionalInfo =
        [
          app.sceneWriting ? "Writing Sample: Yes" : "",
          app.additionalLinks ? "Additional Links: Yes" : "",
          app.experienceDetail ? "Experience Details: Yes" : "",
          app.linkedin ? "LinkedIn: Yes" : "",
        ]
          .filter(Boolean)
          .join("; ") || "N/A";

      const row = [
        new Date(app.submittedAt).toLocaleDateString(),
        `"${fullName}"`,
        `"${contact}"`,
        `"${app.team ? this.getTeamDisplayName(app.team) : "N/A"}"`,
        `"${position}"`,
        `"${app.experience ? this.getExperienceDisplayName(app.experience) : "N/A"}"`,
        `"${app.portfolio || "N/A"}"`,
        `"${details.replace(/"/g, '""')}"`,
        `"${additionalInfo}"`,
      ];
      csvRows.push(row.join(","));
    });

    return csvRows.join("\n");
  }
}

// Global functions for onclick handlers
function toggleApplicationDetails(id) {
  const detailsElement = document.getElementById(`details-${id}`);
  if (detailsElement) {
    detailsElement.classList.toggle("visible");
  }
}

function contactApplicant(discordUser, name) {
  // Copy Discord username to clipboard and show notification
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(discordUser)
      .then(() => {
        alert(
          `Discord username "${discordUser}" copied to clipboard! You can now contact ${name} on Discord.`,
        );
      })
      .catch(() => {
        alert(`Contact ${name} on Discord: ${discordUser}`);
      });
  } else {
    alert(`Contact ${name} on Discord: ${discordUser}`);
  }
}

function deleteApplication(id) {
  applicationsManager.deleteApplication(id);
}

function clearAllApplications() {
  applicationsManager.clearAllApplications();
}

function exportApplications() {
  applicationsManager.exportApplications();
}

function changePage(direction) {
  applicationsManager.changePage(direction);
}

// Initialize the applications manager
let applicationsManager;

document.addEventListener("DOMContentLoaded", async () => {
  applicationsManager = new ApplicationsManager();
  // Make it globally accessible for service worker messages
  window.applicationsManager = applicationsManager;
});
