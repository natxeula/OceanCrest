# GitHub Integration Setup for Job Applications

This system now submits job applications directly to a GitHub repository, providing server-side storage without needing a database.

## Setup Steps

### 1. Create GitHub Repository

1. Go to GitHub and create a **private repository** named `oceancrest-applications`
2. Initialize with a README
3. Create an `applications` folder in the repository

### 2. Generate GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Set expiration to "No expiration" or your preferred duration
4. Select these scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `write:discussion` (optional, for notifications)

5. Copy the generated token (starts with `github_pat_`)

### 3. Configure the Application

Update these files with your GitHub information:

#### In `job-application.html` (line ~768):

```javascript
const GITHUB_TOKEN = "github_pat_YOUR_ACTUAL_TOKEN_HERE";
const REPO_OWNER = "YourGitHubUsername";
const REPO_NAME = "oceancrest-applications";
```

#### In `applications.js` (line ~66):

```javascript
const GITHUB_TOKEN = "github_pat_YOUR_ACTUAL_TOKEN_HERE";
const REPO_OWNER = "YourGitHubUsername";
const REPO_NAME = "oceancrest-applications";
```

### 4. Test the Integration

1. Submit a test job application
2. Check your GitHub repository at: `https://github.com/YourUsername/oceancrest-applications/tree/main/applications`
3. You should see a new JSON file with the application data

## How It Works

### Application Submission

1. User fills out job application form
2. Form data is submitted to GitHub as a JSON file
3. File is stored in `/applications/` directory
4. Also saved to localStorage as backup

### Admin Panel

1. Applications page loads data from GitHub repository
2. Falls back to localStorage if GitHub is unavailable
3. Displays applications in the same interface

### File Structure

Each application creates a file like:

```
applications/
├── application_app_1704123456789_abc123_2025-01-07.json
├── application_app_1704123457890_def456_2025-01-07.json
└── ...
```

### File Content Example

```json
{
  "id": "app_1704123456789_abc123",
  "submittedAt": "2025-01-07T12:34:56.789Z",
  "preferredName": "John Doe",
  "discordUser": "johndoe#1234",
  "team": "writing",
  "specificRole": "Senior Writer",
  "portfolio": "https://johndoe.portfolio.com",
  "generalDetails": "I am passionate about...",
  "sceneWriting": "Scene content here...",
  "additionalLinks": "Links to additional work...",
  "termsAgree": true,
  "submissionDetails": {
    "userAgent": "Mozilla/5.0...",
    "timestamp": "2025-01-07T12:34:56.789Z",
    "timezone": "America/New_York"
  }
}
```

## Benefits

✅ **Server-side storage** - No more localStorage-only storage  
✅ **Version control** - Full history of all applications  
✅ **Easy backup** - Git repository serves as backup  
✅ **Access control** - Use GitHub permissions  
✅ **Free hosting** - No additional server costs  
✅ **API access** - Can build additional tools using GitHub API  
✅ **Notifications** - Can set up GitHub Actions for email alerts

## Security Notes

- Keep your GitHub token secure and private
- The repository should be private to protect applicant data
- Consider rotating tokens periodically
- Never commit the token to version control

## Troubleshooting

### Applications not submitting to GitHub:

- Check that the token has correct permissions
- Verify repository name and owner are correct
- Check browser console for error messages

### Admin panel not loading GitHub data:

- Verify token and repository settings in applications.js
- Check that the `applications` folder exists in your repo
- Applications will fall back to localStorage if GitHub fails

## Optional Enhancements

### GitHub Actions for Notifications

You can set up a GitHub Action to send email notifications when new applications are submitted:

Create `.github/workflows/notify-application.yml`:

```yaml
name: New Application Notification
on:
  push:
    paths:
      - "applications/**"

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Send notification
        run: echo "New job application submitted!"
        # Add email notification logic here
```

### Webhook Integration

Set up webhooks to notify external systems when applications are submitted.
