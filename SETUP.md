# Quick Setup Guide

## Prerequisites
- Jenkins server running
- GitHub repository
- Node.js 20.x installed on Jenkins

## Jenkins Setup

### 1. Install Required Plugins
- Git Plugin
- GitHub Plugin
- HTML Publisher Plugin
- NodeJS Plugin
- Pipeline Plugin

### 2. Configure Global Tools
- **NodeJS**: Install version 20.x
- **Global npm packages**: `cypress`, `mochawesome-merge`, `marge`

### 3. Set Up Credentials (Manual Configuration)
1. Go to **Manage Jenkins** → **Manage Credentials**
2. **Add Credentials**:
   - Kind: `Secret text`
   - ID: `github-credentials`
   - Secret: [Your GitHub Personal Access Token]
   - Description: GitHub Personal Access Token

### 4. Create Pipeline Job
1. **New Item** → **Pipeline**
2. **Pipeline script from SCM**
3. **Git** repository: `https://github.com/your-username/NSWStampDuty.git`
4. **Script Path**: `Jenkinsfile`
5. **Branch**: `*/main`

## Testing
1. Go to your Jenkins job
2. Click **"Build Now"** to run the pipeline manually
3. View test reports in Jenkins build results

## Manual Execution
The pipeline is configured for **manual execution only**. You can run it by:
- Clicking **"Build Now"** in Jenkins UI
- Using Jenkins REST API
- Triggering from Jenkins CLI

## Security Notes
- Never commit credentials to Git
- Use Jenkins credentials store for sensitive data
- Configure webhooks securely
- Keep dependencies updated

That's it! Your pipeline is ready for manual execution whenever you need it.
