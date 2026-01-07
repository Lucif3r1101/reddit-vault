🚀 RedditVault - Deployment Guide

> Deploy to Netlify in 15 minutes

---

## 📋 Before You Start

- ✅ Code pushed to GitHub (without `.env`)
- ✅ Both backend and frontend work locally
- ✅ Netlify account (free at https://netlify.com)
- ✅ Reddit API credentials ready
- ✅ Your Reddit username & password

---

## 🔐 Security First

### ⚠️ CRITICAL

**NEVER push `.env` files to GitHub!**

Your `.env` files contain:
- Reddit Client ID & Secret
- Reddit username & password
- API keys

These will be added in Netlify dashboard, NOT in code.

---

## 🚀 Step 1: Deploy Backend

### 1.1 Go to Netlify

1. Visit https://netlify.com
2. Sign in or create account (free)
3. Click "Add new site" → "Import an existing project"

### 1.2 Connect GitHub

1. Select GitHub
2. Authorize Netlify
3. Find and select `reddit-vault` repo

### 1.3 Configure Backend

**Build settings:**
- Build command: `npm install && npm start`
- Publish directory: `.` (root)
- Base directory: `backend`

### 1.4 Add Environment Variables

Click "Environment variables" and add:
PORT = 5000
NODE_ENV = production
REDDIT_CLIENT_ID = your_client_id_here
REDDIT_CLIENT_SECRET = your_client_secret_here
REDDIT_USERNAME = your_reddit_username
REDDIT_PASSWORD = your_reddit_password
REDDIT_USER_AGENT = RedditVault/2.0
FRONTEND_URL = https://your-frontend-url.netlify.app
RATE_LIMIT_WINDOW = 60000
RATE_LIMIT_MAX_REQUESTS = 5

### 1.5 Deploy

Click "Deploy"

**Wait for completion** ✅

You'll get a URL like: `https://reddit-vault-backend.netlify.app`

### 1.6 Test Backend

Visit: `https://reddit-vault-backend.netlify.app/api/health`

Should return:
```json
{"status":"ok","timestamp":"..."}
```

---

## 🎨 Step 2: Deploy Frontend

### 2.1 Update Frontend .env

In your local `frontend/.env`:
REACT_APP_API_URL = https://your-backend-url.netlify.app

### 2.2 Push to GitHub
```bash
git add .
git commit -m "Update frontend API URL"
git push
```

### 2.3 Go to Netlify

1. Click "Add new site" → "Import an existing project"
2. Select GitHub
3. Select `reddit-vault` repo

### 2.4 Configure Frontend

**Build settings:**
- Build command: `npm run build`
- Publish directory: `build`
- Base directory: `frontend`

### 2.5 Add Environment Variables

Click "Environment variables" and add:
REACT_APP_API_URL = https://your-backend-url.netlify.app

### 2.6 Deploy

Click "Deploy"

**Wait for completion** ✅

You'll get a URL like: `https://reddit-vault-frontend.netlify.app`

---

## ✅ Verification

### Backend Check

Visit backend health endpoint:
https://your-backend-url.netlify.app/api/health

Should show:
```json
{"status":"ok","timestamp":"2024-01-07T..."}
```

### Frontend Check

Visit frontend URL:
https://your-frontend-url.netlify.app

Should show:
- RedditVault landing page
- Purple logo
- "Get Started" button

### Full Test

1. Click "Get Started"
2. Enter Reddit credentials
3. Enter subreddit name
4. Click "Scrape Now"
5. Download CSV

---

## 🔄 Update Process

### When you update code:
```bash
# Make changes locally
# Edit files

# Test locally
npm start  # backend
npm start  # frontend

# Push to GitHub
git add .
git commit -m "Update message"
git push
```

Netlify automatically redeploys! ✨

### When you update credentials:

1. Go to Netlify dashboard
2. Find your site
3. Site settings → Build & deploy → Environment
4. Edit environment variables
5. Redeploy manually

---

## 🐛 Troubleshooting

### Backend not deploying

**Problem:** Build fails on Netlify

**Solution:**
- Check logs: Click deploy → View logs
- Verify all files are in `backend/` folder
- Ensure `server.js` exists
- Check `package.json` has correct scripts

### Frontend shows blank page

**Problem:** Frontend loads but nothing shows

**Solution:**
- Check browser console for errors
- Verify `REACT_APP_API_URL` is correct
- Check frontend logs in Netlify

### "Cannot connect to backend"

**Problem:** Frontend can't reach backend

**Solution:**
- Verify `REACT_APP_API_URL` matches backend URL
- Check backend is deployed and running
- Check backend health: `/api/health`
- Ensure CORS is enabled in backend

### "Invalid credentials"

**Problem:** Reddit API returns 401

**Solution:**
- Verify Client ID in Netlify env variables
- Verify Client Secret (not username/password)
- Get fresh credentials from https://reddit.com/prefs/apps
- Check for spaces or quotes in environment variables

### Rate limit exceeded

**Problem:** "Too many requests" error

**Solution:**
- Wait 1 minute
- Rate limit is 5 requests per 60 seconds per IP
- Netlify free tier may have IP restrictions

---

## 📊 Your Deployment URLs

After deployment, you'll have:

**Backend:**
https://your-backend-name.netlify.app
API: https://your-backend-name.netlify.app/api/scrape
Health: https://your-backend-name.netlify.app/api/health

**Frontend:**
https://your-frontend-name.netlify.app

**Bookmark these!**

---

## 🔐 Security Checklist

- [ ] `.env` file NOT pushed to GitHub
- [ ] Environment variables added in Netlify
- [ ] Backend `FRONTEND_URL` matches frontend URL
- [ ] Frontend `REACT_APP_API_URL` matches backend URL
- [ ] HTTPS enabled (Netlify provides this)
- [ ] Credentials never appear in code
- [ ] Rate limiting is enabled
- [ ] CORS is configured

---

## 📝 Netlify Environment Variables Reference

### Backend Environment Variables
PORT=5000
NODE_ENV=production
REDDIT_CLIENT_ID=your_actual_id
REDDIT_CLIENT_SECRET=your_actual_secret
REDDIT_USERNAME=your_actual_username
REDDIT_PASSWORD=your_actual_password
REDDIT_USER_AGENT=RedditVault/2.0
FRONTEND_URL=https://your-frontend.netlify.app
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX_REQUESTS=5
CACHE_TTL=300

### Frontend Environment Variables
REACT_APP_API_URL=https://your-backend.netlify.app

---

## 🎯 Quick Checklist

- [ ] GitHub repo created
- [ ] Code pushed (without .env)
- [ ] Backend deployed to Netlify
- [ ] Backend environment variables set
- [ ] Frontend deployed to Netlify
- [ ] Frontend environment variables set
- [ ] Frontend API URL updated and pushed
- [ ] Both URLs working
- [ ] Full test completed

---

## 📞 Common Commands
```bash
# View backend logs
netlify logs --function=scrape

# Rebuild site
netlify deploy --prod

# Check environment
netlify env:list

# Add environment variable
netlify env:set REDDIT_CLIENT_ID your_id
```

---

**Congratulations! Your RedditVault is LIVE! 🎉**

Share your URLs:
- Frontend: `https://your-app.netlify.app`
- Backend: `https://your-api.netlify.app`

---

**Remember:** Keep your credentials safe! Never share `.env` files! 🔒