# Al Safa Global Website - Deployment Guide (Render)

## 🚀 Quick Deploy to Render (Static Site)

### Step 1: Prepare Your Repository
1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 2: Create a Static Site on Render
1. Go to `https://render.com` and sign up/login
2. Click "New" → "Static Site"
3. Connect your GitHub repository
4. Configure:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `client/build`
   - Node Version: use `package.json` engines (>=16) or set 18.x in the Render UI
5. Click "Create Static Site"

### Step 3: SPA Routing Fallback
Ensure `static.json` exists in the repository root:
```json
{
  "headers": [
    { "source": "/static/**", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000" }] }
  ],
  "routes": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
This enables client-side routing to work on refresh.

## 🔧 Backend (Optional)
If you need API endpoints (`/api/*`), deploy `server/` as a Render Web Service:
- Type: Web Service
- Build Command: `npm install`
- Start Command: `node server/index.js`
- Environment Variables: copy from `.env` as needed
- Update the frontend to call the deployed API origin

## 📁 Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── server/                 # Node.js backend (optional for static site)
│   ├── index.js
│   ├── models/
│   ├── routes/
│   └── utils/
├── static.json             # Render SPA fallback rules
└── package.json            # Root package.json
```

## 🔒 Security Checklist (when backend is deployed)
- [ ] Environment variables set
- [ ] JWT secret is strong and unique
- [ ] Email credentials configured
- [ ] CORS settings updated for production
- [ ] Rate limiting enabled
- [ ] Helmet security headers active

## 🔍 Post-Deployment Testing
- [ ] Homepage loads correctly
- [ ] Navigation works and deep links load on refresh
- [ ] Mobile responsiveness
- [ ] Performance acceptable

## 🛠️ Troubleshooting
- Confirm the Publish Directory is `client/build`
- Ensure `static.json` is in the repository root
- Verify Node version in Render build settings if build fails