# 🔐 OCEANCREST TEAM SECURITY SYSTEM

## 📋 Overview

The OceanCrest Entertainment handbook security system uses **team member authentication with IP logging** to protect sensitive company documentation. This system logs all activity to text files and automatically bans unauthorized IP addresses.

## 🎯 How It Works

### 1. **Team Member Authentication**
- Login with your OceanCrest team member name
- Enter the handbook-specific access code
- System logs your IP address to `authorized_ips.txt`

### 2. **IP Protection**
- Your IP is registered and associated with your team member name
- If anyone tries to access from a different IP using your name, they get **automatically banned**
- All access attempts are logged to `access_logs.txt`

### 3. **Text File Logging**
All security data is stored in simulated text files:
- **`access_logs.txt`** - Complete access history
- **`authorized_ips.txt`** - Team member IP registrations  
- **`banned_ips.txt`** - List of banned IP addresses

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

### **Automatic IP Banning**
- If your registered IP doesn't match, the new IP gets banned immediately
- No warnings - instant ban for security
- Bans are logged to `banned_ips.txt`

### **Session Management**
- 2-hour session timeouts
- Sessions tied to specific team members
- Automatic cleanup on browser close

### **Complete Audit Trail**
Every action is logged with:
- Timestamp
- Team member name
- IP address
- Action type (login, access, ban, etc.)
- User agent information

## 🛠️ Admin Panel

Access the admin panel at `/admin-logs.html` to:

- **View Real-time Stats**: Authorized IPs, banned IPs, total logs
- **Monitor Access Logs**: Filter by event type
- **Download Text Files**: Export `access_logs.txt` and `authorized_ips.txt`
- **System Management**: Clear sessions, unban IPs, reset system

### Admin Functions
- 🔄 **Refresh Data** - Update all displays
- 📥 **Download Logs** - Export `access_logs.txt`
- 📥 **Download IPs** - Export `authorized_ips.txt`  
- ⚠️ **Clear Sessions** - End all active sessions
- 🚫 **Unban IPs** - Clear all IP bans
- 🔄 **Reset System** - Complete system reset

## 📊 Log File Formats

### `access_logs.txt`
```
[2025-01-14T10:30:00.000Z] ACCESS_GRANTED: Handbook access granted (IP: 192.168.1.100) Team: natxeula
[2025-01-14T10:31:00.000Z] PAGE_ACCESS: Executive handbook accessed (IP: 192.168.1.100) Team: natxeula
[2025-01-14T10:32:00.000Z] IP_MISMATCH_BANNED: Unauthorized IP 192.168.1.201 banned. Expected: 192.168.1.100 (Team: natxeula)
```

### `authorized_ips.txt`
```
OCEANCREST AUTHORIZED IPs
========================

natxeula: 192.168.1.100
future: 192.168.1.105
kat: 192.168.1.110
```

### `banned_ips.txt`
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
   - IP authorization status
5. **First time**: IP gets registered
6. **Return visits**: IP must match registered IP
7. **Different IP**: Automatic ban and access denied

## ⚠️ Security Warnings

### **IP Mismatch = Instant Ban**
- If you try to access from a different location/IP, you'll be banned
- This protects against account hijacking
- Contact admin to reset if you have a legitimate IP change

### **No Warnings Given**
- System immediately bans unauthorized IPs
- All attempts are logged for investigation
- Security is prioritized over convenience

## 🛡️ Protection Levels

| Handbook | Security Level | Features |
|----------|---------------|----------|
| Executive | Highest | Team auth + IP tracking + full logging |
| Internal | High | Team auth + IP tracking + monitoring |
| Logs | Highest | Team auth + IP banning + sensitive logging |

## 💻 Technical Details

### **Browser Storage**
- Uses `localStorage` to simulate text file system
- `sessionStorage` for active session management
- Automatic cleanup and garbage collection

### **IP Simulation**
- Generates consistent simulated IP per browser
- In production, would use server-side IP detection
- Maintains IP consistency across sessions

### **Session Security**
- Unique session tokens per access
- 2-hour automatic expiry
- Cleared on page unload

## 🔧 Troubleshooting

### **"Invalid team member name"**
- Check spelling and use suggestions
- Name must be in authorized list exactly

### **"Access denied - IP banned"**  
- Your IP was banned for security
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
- **IP Problems**: Review `banned_ips.txt` 
- **Access Denied**: Verify team member name and access code
- **System Reset**: Use admin panel reset function

---

**🔒 Security Notice**  
This system prioritizes security over convenience. All access is monitored and logged. Unauthorized access attempts result in immediate IP banning.

**📝 File-Based Logging**  
All security data is stored in text file format for easy review and portability. Admin panel provides real-time access to all logs and system status.
