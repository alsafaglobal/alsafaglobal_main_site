#!/bin/bash

# Al Safa Global Website - Deployment Script (Render)
echo "🚀 Starting deployment process..."

# Check if git is initialized
if [ ! -d \".git\" ]; then
    echo \"📁 Initializing git repository...\"
    git init
fi

# Add all files
echo \"📦 Adding files to git...\"
git add .

# Commit changes
echo \"💾 Committing changes...\"
git commit -m \"Deploy Al Safa Global website - $(date)\"

# Check if remote exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo \"⚠️  No remote repository configured.\"
    echo \"Please run these commands manually:\"
    echo \"1. Create a repository on GitHub\"
    echo \"2. Run: git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git\"
    echo \"3. Run: git branch -M main\"
    echo \"4. Run: git push -u origin main\"
    echo \"\"
    echo \"Then create a Static Site on Render:\"
    echo \"1. Go to https://render.com\"
    echo \"2. Click 'New' → 'Static Site'\"
    echo \"3. Connect your repository\"
    echo \"4. Build Command: npm install && npm run build\"
    echo \"5. Publish Directory: client/build\"
    echo \"6. (Optional) Set Node version to 18.x\"
    exit 1
fi

# Push to GitHub
echo \"⬆️  Pushing to GitHub...\"
git push origin main

echo \"✅ Code pushed to GitHub successfully!\"
echo \"\"
echo \"🌐 Next steps (Render):\"
echo \"1. Go to https://render.com\"
echo \"2. Create a Static Site and connect your repo\"
echo \"3. Set Build Command: npm install && npm run build\"
echo \"4. Set Publish Directory: client/build\"
echo \"5. (Optional) Set Node version to 18.x\"
echo \"\"
echo \"🎉 Your website will be live at your Render domain once built.\" 