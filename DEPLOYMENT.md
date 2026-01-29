# Deployment Guide for Azure Static Web Apps

This project is configured for **Azure Static Web Apps** using **GitHub Actions**.

## Prerequisites
- A GitHub repository containing this project.
- An Azure account with an active subscription.

## Step 1: Push to GitHub
Ensure all your code is committed and pushed to your default branch (e.g., `main`).

```bash
git add .
git commit -m "Ready for Azure deployment"
git push origin main
```

## Step 2: Create Static Web App
1. Go to the [Azure Portal](https://portal.azure.com).
2. Creating a resource **"Static Web App"**.
3. **Basics Tab**:
   - **Subscription / Resource Group**: Select yours.
   - **Name**: `jhamf-group-landing` (or similar).
   - **Plan Type**: Free (sufficient for this project).
   - **Deployment details**: Select **GitHub**.
   - **Organization / Repository / Branch**: Select your connected repository.
4. **Build Details**:
   - **Build Presets**: `React` (or Custom).
   - **App location**: `/`
   - **Api location**: (Leave empty)
   - **Output location**: `dist`

## Step 3: Review and Create
Click **Review + create**, then **Create**. Azure will automatically:
- Create the resource.
- Commit a workflow file (e.g., `.github/workflows/azure-static-web-apps-....yml`) to your repository.
- Start the first build and deploy.

## Step 4: Environment Variables (Optional)
If your project uses environment variables (e.g., email service IDs):
1. Go to your Static Web App in Azure Portal.
2. Select **Configuration** > **Environment variables**.
3. Add your variables (without `VITE_` prefix if using backend functions, but for Vite client-side, they must be build-time or exposed carefully).
   *Note: Since this is a static site, `VITE_` variables are usually baked in at build time. GitHub Actions secrets are the best place for build-time variables.*

## Step 5: Verify Deployment
Once the GitHub Action completes:
1. Click the **URL** in the Azure Static Web App overview.
2. Verify:
   - Homepage loads.
   - Navigation works (SPA routing).
   - Refreshing a subpage (e.g., `/pqrs`) works (thanks to `staticwebapp.config.json`).
