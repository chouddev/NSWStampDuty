# Jenkins Troubleshooting Guide

## Common Issues and Solutions

### Issue: "sh: sh: command not found" or PATH Issues

This error occurs when Jenkins can't find the required commands in the PATH environment variable.

#### Solution 1: Use NodeJS Tool Configuration (Recommended)

1. **Configure NodeJS Tool in Jenkins:**
   - Go to **Manage Jenkins** → **Global Tool Configuration**
   - Add **NodeJS** installation:
     - Name: `NodeJS-20`
     - Install automatically: ✅
     - Version: `20.x`

2. **Update Jenkinsfile to use tools:**
   ```groovy
   pipeline {
       agent any
       
       tools {
           nodejs 'NodeJS-20'
       }
       
       // Rest of your pipeline...
   }
   ```

3. **Use the alternative Jenkinsfile:**
   - Rename `Jenkinsfile.alt` to `Jenkinsfile`
   - This version uses the NodeJS tool configuration

#### Solution 2: Fix PATH Environment Variable

If you prefer to keep the current Jenkinsfile, update the environment section:

```groovy
environment {
    PATH = "/usr/local/bin:/usr/bin:/bin:/opt/homebrew/bin:/opt/homebrew/opt/node@20/bin:${PATH}"
    NODE_VERSION = '20'
}
```

#### Solution 3: Use Full Paths in Commands

Update your sh commands to use full paths:

```groovy
sh '''
    /opt/homebrew/opt/node@20/bin/npm ci
    /opt/homebrew/opt/node@20/bin/npx cypress run
'''
```

### Issue: Permission Denied for run-tests.sh

**Solution:**
```groovy
sh '''
    chmod +x run-tests.sh
    ./run-tests.sh stamp-duty
'''
```

### Issue: Cypress Installation Fails

**Solution:**
```groovy
sh '''
    npm ci
    npx cypress install
    npx cypress verify
'''
```

### Issue: Report Generation Fails

**Solution:**
```groovy
sh '''
    # Check if report files exist
    if ls cypress/reports/.jsons/mochawesome_*.json 1> /dev/null 2>&1; then
        npx mochawesome-merge "cypress/reports/.jsons/*.json" > cypress/reports/merged-report.json
        npx marge cypress/reports/merged-report.json --reportDir cypress/reports --inline
    else
        echo "No report files found"
    fi
'''
```

## Quick Fix for Current Issue

1. **Stop the current build** in Jenkins
2. **Update your Jenkinsfile** with the fixed version (already updated)
3. **Configure NodeJS tool** in Jenkins Global Tool Configuration
4. **Run the build again**

## Alternative: Use Jenkinsfile.alt

If the main Jenkinsfile still has issues:

1. **Rename files:**
   ```bash
   mv Jenkinsfile Jenkinsfile.backup
   mv Jenkinsfile.alt Jenkinsfile
   ```

2. **Configure NodeJS tool** in Jenkins
3. **Run the build**

## Verification Steps

After applying the fix, verify:

1. **Node.js is available:**
   ```bash
   node --version
   ```

2. **npm is available:**
   ```bash
   npm --version
   ```

3. **Cypress is installed:**
   ```bash
   npx cypress verify
   ```

## Still Having Issues?

1. **Check Jenkins logs** for detailed error messages
2. **Verify Node.js installation** on Jenkins agent
3. **Check file permissions** on the Jenkins workspace
4. **Ensure all dependencies** are properly installed

The updated Jenkinsfile should resolve the PATH and command not found issues.
