# 🔐 OCEANCREST TEAM SECURITY SYSTEM

## 📋 Overview

The OceanCrest Entertainment handbook security system uses **team member authentication with access session logging** to protect sensitive company documentation. This system logs all activity to text files and automatically bans unauthorized access sessions.

## 🎯 How It Works

### 1. **Team Member Authentication**
- Login with your OceanCrest team member name
- Enter the handbook-specific access code
- System logs your access session to `authorized_access_sessions.txt`

### 2. **Access Session Protection**
- Your access session is registered and associated with your team member name
- If anyone tries to access from a different session using your name, they get **automatically banned**
- All access attempts are logged to `access_logs.txt`

### 3. **Text File Logging**
All security data is stored in simulated text files:
- **`access_logs.txt`** - Complete access history
- **`authorized_access_sessions.txt`** - Team member access session registrations
- **`banned_access_sessions.txt`** - List of banned access sessions

## 👥 Authorized Team Members

```
natxeula, nat, nate
future, the future, futuristic  
mr. 80, mr80, eighty
kat, katherine
mr puzzles, mrpuzzles, puzzles
fork
whi
don, poseidonokeanos, lucifercelestis
robo, robomg07
teo
emplexity
```

## 🔑 Access Codes

Each handbook has a unique access code:

- **Executive Handbook**: `EXEC_ULTRA_SECURE_2025`
- **Internal Handbook**: `INTERNAL_TEAM_ACCESS_2025`  
- **Executive Logs**: `LOGS_CLASSIFIED_2025`

## 🚨 Security Features

### **Automatic Access Session Banning**
- If your registered access session doesn't match, the new session gets banned immediately
- No warnings - instant ban for security
- Bans are logged to `banned_access_sessions.txt`

### **Session Management**
- 2-hour session timeouts
- Sessions tied to specific team members
- Automatic cleanup on browser close

### **Complete Audit Trail**
Every action is logged with:
- Timestamp
- Team member name
- Access session details
- Action type (login, access, ban, etc.)
- User agent information

## 🛠️ Admin Panel

Access the admin panel at `/admin-logs.html` to:

- **View Real-time Stats**: Authorized access sessions, banned access sessions, total logs
- **Monitor Access Logs**: Filter by event type
- **Download Text Files**: Export `access_logs.txt` and `authorized_access_sessions.txt`
- **System Management**: Clear sessions, unban access sessions, reset system

### Admin Functions
- 🔄 **Refresh Data** - Update all displays
- 📥 **Download Logs** - Export `access_logs.txt`
- 📥 **Download Access Sessions** - Export `authorized_access_sessions.txt`
- ⚠️ **Clear Sessions** - End all active sessions
- 🚫 **Unban Access Sessions** - Clear all access session bans
- 🔄 **Reset System** - Complete system reset

## 📊 Log File Formats

### `access_logs.txt`
```
[2025-01-14T10:30:00.000Z] ACCESS_GRANTED: Handbook access granted (Access Session IP: 192.168.1.100) Team: natxeula
[2025-01-14T10:31:00.000Z] PAGE_ACCESS: Executive handbook accessed (Access Session IP: 192.168.1.100) Team: natxeula
[2025-01-14T10:32:00.000Z] ACCESS_SESSION_MISMATCH_BANNED: Unauthorized access session 192.168.1.201 banned. Expected: 192.168.1.100 (Team: natxeula)
```

### `authorized_access_sessions.txt`
```
OCEANCREST AUTHORIZED ACCESS SESSIONS
====================================

natxeula: 192.168.1.100 (Session: sess_abc123)
future: 192.168.1.105 (Session: sess_def456)
kat: 192.168.1.110 (Session: sess_ghi789)
```

### `banned_access_sessions.txt`
```
192.168.1.201
192.168.1.202  
10.0.0.50
```

## 🔄 Login Process

1. **Click "Team Login"** on any handbook
2. **Enter team member name** (with auto-suggestions)
3. **Enter access code** for the specific handbook
4. **System checks**:
   - Valid team member name
   - Correct access code
   - Access session authorization status
5. **First time**: Access session gets registered
6. **Return visits**: Access session must match registered session
7. **Different Session**: Automatic ban and access denied

## ⚠️ Security Warnings

### **Access Session Mismatch = Instant Ban**
- If you try to access from a different location/session, you'll be banned
- This protects against account hijacking
- Contact admin to reset if you have a legitimate session change

### **No Warnings Given**
- System immediately bans unauthorized access sessions
- All attempts are logged for investigation
- Security is prioritized over convenience

## 🛡️ Protection Levels

| Handbook | Security Level | Features |
|----------|---------------|----------|
| Executive | Highest | Team auth + access session tracking + full logging |
| Internal | High | Team auth + access session tracking + monitoring |
| Logs | Highest | Team auth + access session banning + sensitive logging |

## 💻 Technical Details

### **Browser Storage**
- Uses `localStorage` to simulate text file system
- `sessionStorage` for active session management
- Automatic cleanup and garbage collection

### **Access Session Simulation**
- Generates consistent simulated access session per browser
- In production, would use server-side session detection
- Maintains session consistency across browser sessions

### **Session Security**
- Unique session tokens per access
- 2-hour automatic expiry
- Cleared on page unload

## 🔧 Troubleshooting

### **"Invalid team member name"**
- Check spelling and use suggestions
- Name must be in authorized list exactly

### **"Access denied - Access session banned"**
- Your access session was banned for security
- Contact admin to investigate and potentially unban

### **"Session expired"**
- Sessions expire after 2 hours
- Simply re-authenticate to continue

### **Admin panel not working**
- Ensure team security system is loaded
- Check browser console for errors
- Try refreshing the page

## 📞 Support

- **Security Issues**: Check admin panel logs
- **Access Session Problems**: Review `banned_access_sessions.txt` 
- **Access Denied**: Verify team member name and access code
- **System Reset**: Use admin panel reset function

---

**🔒 Security Notice**  
This system prioritizes security over convenience. All access is monitored and logged. Unauthorized access attempts result in immediate access session banning.

**📝 File-Based Logging**  
All security data is stored in text file format for easy review and portability. Admin panel provides real-time access to all logs and system status.
