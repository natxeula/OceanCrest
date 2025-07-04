# GitHub Integration Setup for Job Applications

This system submits job applications directly to the current repository in an `applications` folder, providing server-side storage without needing a database.

## Setup Steps

### 1. Create GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Set expiration to "No expiration" or your preferred duration
4. Select these scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `write:discussion` (optional, for notifications)

5. Copy the generated token (starts with `github_pat_`)

### 2. Configure the Application

Update these files with your GitHub information:

#### In `job-application.html` (line ~768):

```javascript
const GITHUB_TOKEN = "github_pat_YOUR_ACTUAL_TOKEN_HERE";
const REPO_OWNER = "YourGitHubUsername";
const REPO_NAME = "oceancrest"; // Current repository name
```

#### In `applications.js` (line ~66):

```javascript
const GITHUB_TOKEN = "github_pat_YOUR_ACTUAL_TOKEN_HERE";
const REPO_OWNER = "YourGitHubUsername";
const REPO_NAME = "oceancrest"; // Current repository name
```

### 3. Test the Integration

1. Submit a test job application
2. Check your repository at: `https://github.com/YourUsername/oceancrest/tree/main/applications`
3. You should see a new JSON file with the application data

## How It Works

### Application Submission

1. User fills out job application form
2. Form data is submitted to GitHub as a JSON file in `/applications/` folder
3. File is stored in the current repository
4. Also saved to localStorage as backup

### Admin Panel

1. Applications page loads data from GitHub repository `/applications/` folder
2. Falls back to localStorage if GitHub is unavailable
3. Displays applications in the same interface

### File Structure

Each application creates a file in the current repo like:

```
applications/
├── application_app_1704123456789_abc123_2025-01-07.json
├── application_app_1704123457890_def456_2025-01-07.json
├── README.md
└── ...
```

### Benefits

✅ **Everything in one repository** - No need for separate repos  
✅ **Server-side storage** - No more localStorage-only storage  
✅ **Version control** - Full history of all applications  
✅ **Easy backup** - Git repository serves as backup  
✅ **Free hosting** - No additional server costs  
✅ **Simple setup** - Uses your existing repository

## Security Notes

- Keep your GitHub token secure and private
- Consider making the repository private to protect applicant data
- Consider rotating tokens periodically
- Never commit the token to version control
- Add `applications/*.json` to `.gitignore` if you want to exclude application files from commits

## Optional: Add to .gitignore

If you don't want application files committed to your repository, add this to `.gitignore`:

```
# Job applications (optional - remove if you want to commit them)
applications/*.json
```

This way the applications folder structure remains but the actual application files aren't committed to version control.

## Repository Structure

Your repository will look like:

```
oceancrest/
├── applications/
│   ├── README.md
│   ├── application_*.json (job applications)
├── index.html
├── job-application.html
├── applications.html
├── applications.js
├── styles.css
├── app.js
└── ... (other website files)
```

## Troubleshooting

### Applications not submitting to GitHub:

- Check that the token has correct permissions for this repository
- Verify repository name and owner are correct in the configuration
- Check browser console for error messages

### Admin panel not loading GitHub data:

- Verify token and repository settings in applications.js
- Check that the `applications` folder exists in your repo
- Applications will fall back to localStorage if GitHub fails
