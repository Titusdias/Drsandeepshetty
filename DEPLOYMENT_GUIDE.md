# 📋 CMS Admin Panel - Setup & Deployment Guide

## Pre-Deployment Checklist

- [ ] Firebase project created
- [ ] Firestore database initialized
- [ ] Firebase authentication enabled
- [ ] Environment variables configured in `.env.local`
- [ ] Admin account created at `/admin/login`
- [ ] Database seeded using `/admin/settings` button
- [ ] All editors tested and working
- [ ] Content added/updated as needed

## Firebase Setup (Step-by-Step)

### 1. Create Firebase Project
1. Go to https://console.firebase.google.com
2. Click "Create project"
3. Enter project name: "Dr. Sandeep Shetty Clinic"
4. Continue through setup

### 2. Enable Firestore Database
1. Left sidebar → Firestore Database
2. Click "Create database"
3. Select "Start in test mode" (then change rules before production)
4. Choose region (closest to your users)
5. Click "Enable"

### 3. Enable Authentication
1. Left sidebar → Authentication
2. Click "Get started"
3. Select "Email/Password"
4. Enable email/password provider
5. Click "Save"

### 4. Get Firebase Credentials
1. Click settings icon (top left) → Project settings
2. Scroll to "Your apps" section
3. Click "Web" icon
4. Copy the configuration

### 5. Update .env.local
Create file at project root:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=yourproject.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=yourproject-abc123
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=yourproject.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123...

# EmailJS Configuration (if using contact form)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=public_key_...
```

## Local Development

### Start Dev Server
```bash
npm install
npm run dev
```

### Access Admin Panel
- Website: http://localhost:3000
- Admin login: http://localhost:3000/admin/login
- Create test account with any email/password

### Test Editors
1. Go to `/admin/settings` → Click "Seed Database"
2. Navigate to each editor (/admin/home, /admin/services, etc.)
3. Edit content and verify changes appear on website

## Deployment

### Deploy to Vercel (Recommended)

#### 1. Connect Repository
```bash
git init
git add .
git commit -m "Add CMS admin panel"
# Push to GitHub/GitLab/Bitbucket
```

#### 2. Deploy on Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Select your Git repository
4. Configure environment variables (paste from `.env.local`)
5. Click "Deploy"

#### 3. Set Production Environment Variables
1. After deployment, go to project settings → Environment Variables
2. Add all Firebase credentials for production
3. Keep different keys for dev/prod if needed

### Deploy to Other Platforms

**Netlify:**
- Connect Git repository
- Add environment variables in UI
- Deploy

**AWS Amplify:**
- Connect Git repository
- Configure build settings
- Add environment variables
- Deploy

## Firestore Security Rules (Production)

Replace default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read and write
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

To update:
1. Firebase Console → Firestore Database → Rules tab
2. Replace existing rules
3. Click "Publish"

## Backup & Restore

### Export Data (Backup)
```bash
# Using Firebase CLI (install first: npm install -g firebase-tools)
firebase init
firebase firestore:export gs://your-bucket-backup/export-$(date +%s)
```

### Import Data (Restore)
```bash
firebase firestore:import gs://your-bucket-backup/export-12345
```

## Monitoring & Maintenance

### Check Firestore Usage
1. Firebase Console → Firestore Database → Data
2. Monitor document count and size
3. Check read/write operations under Quotas

### View Admin Activity
1. Firebase Console → Authentication
2. See all admin accounts
3. Can disable accounts if needed

### Troubleshoot Issues
1. Firebase Console → Logs
2. Check for errors or failed operations
3. Verify Firestore rules allow operations

## User Management

### Add New Admin Account
1. Go to `/admin/login`
2. Create new account with email/password
3. Firebase automatically creates user

### Disable Admin Account
1. Firebase Console → Authentication
2. Find user email
3. Click "Disable" button

### Reset Admin Password
1. Firebase Console → Authentication
2. Find user
3. Send "Password Reset" email

## Performance Optimization

### Reduce Firestore Read Costs
1. Use pagination on testimonials/services lists
2. Cache data with React context
3. Only fetch data when needed

### Database Indexing
- Firestore automatically indexes all fields
- Create composite indexes for complex queries (Firebase suggests when needed)

### Content Delivery
1. Vercel edge caching handles static content
2. Firestore queries cached in browser
3. Images served from original URLs

## Scaling Considerations

**Current Setup Handles:**
- Up to 1,000 daily visitors
- Unlimited admin editors
- Standard Firestore quotas

**If You Scale Up:**
1. Enable caching layers (Cloudflare)
2. Implement CDN for images
3. Use Firestore transactions for consistency
4. Consider Database Migration for millions of users

## Common Issues & Solutions

### Issue: "Permission denied" errors
**Solution:** Check Firestore rules - ensure authenticated users have read/write access

### Issue: Images not loading
**Solution:** Ensure image URLs are HTTPS and not blocked by CORS

### Issue: Admin login not working
**Solution:** 
1. Verify Firebase authentication enabled
2. Check environment variables
3. Clear browser cache/cookies

### Issue: Changes not appearing on website
**Solution:**
1. Clear Vercel cache: Project Settings → git history
2. Redeploy: git push triggers automatic redeploy
3. Check Firestore: verify changes saved to database

### Issue: Database seeding fails
**Solution:**
1. Ensure Firestore database created
2. Check authentication enabled
3. Verify security rules allow writes

## Monitoring Checklist (Weekly)

- [ ] Check Firestore usage/costs
- [ ] Review admin login activity
- [ ] Verify website displays latest content
- [ ] Check for any error logs
- [ ] Test admin login still works
- [ ] Backup database

## Support Resources

- **Firebase Docs:** https://firebase.google.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Firestore Database:** https://firebase.google.com/docs/firestore
- **Firebase Auth:** https://firebase.google.com/docs/auth

## Next Steps After Launch

1. **Monitor Performance:** Check Vercel analytics
2. **Collect Feedback:** Ask clinic staff about usability
3. **Plan Enhancements:** Discuss new features
4. **Schedule Training:** Train all admin users
5. **Document Processes:** Create internal wiki for staff

---

**Happy Publishing!** 🚀 Your clinic's CMS is now live.
