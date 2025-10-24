# CI/CD Pipeline Setup for NSW Stamp Duty Test Framework

## Overview

This repository contains a comprehensive CI/CD pipeline setup using Jenkins for automated testing of the NSW Stamp Duty Calculator. The pipeline provides:

- **Automated Testing**: Runs on every push/PR to main branch
- **Comprehensive Reporting**: Mochawesome HTML reports with screenshots and videos
- **Artifact Management**: Automatic archiving of test results and failure artifacts
- **Traceability**: Full Git integration with commit tracking and build history
- **Flexible Execution**: Support for different test types and browsers

## 🏗️ Pipeline Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Git Push/PR   │───▶│   Jenkins CI     │───▶│   Test Reports  │
│   (main branch) │    │   Pipeline       │    │   & Artifacts   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 📋 Prerequisites

### Jenkins Setup
1. **Jenkins Server** (2.400+)
2. **Required Plugins** (see `.jenkins/plugins.txt`)
3. **Node.js** (20.x) installed on Jenkins agents
4. **Git** configured with proper credentials

### Repository Setup
1. **GitHub Repository** with webhook configuration
2. **Branch Protection Rules** for main branch
3. **Required Files**:
   - `Jenkinsfile` (Pipeline definition)
   - `cypress.config.js` (Test configuration)
   - `package.json` (Dependencies)

## 🚀 Quick Start

### 1. Jenkins Configuration

#### Install Required Plugins
```bash
# Install plugins from .jenkins/plugins.txt
jenkins-plugin-cli --plugins-file .jenkins/plugins.txt
```

#### Configure Global Tools
1. Go to **Manage Jenkins** → **Global Tool Configuration**
2. Add **NodeJS** installation:
   - Name: `NodeJS-20`
   - Version: `20.x`
   - Global npm packages: `cypress`, `mochawesome-merge`, `marge`

#### Set Up Credentials
1. Go to **Manage Jenkins** → **Manage Credentials**
2. Add GitHub credentials:
   - Kind: `Secret text`
   - ID: `github-credentials`
   - Secret: [Your GitHub Personal Access Token]

### 2. Create Pipeline Job

#### Option A: Using Jenkins UI
1. **New Item** → **Pipeline**
2. **Pipeline script from SCM**
3. **Git** repository: `https://github.com/your-username/NSWStampDuty.git`
4. **Script Path**: `Jenkinsfile`
5. **Branch**: `*/main`

#### Option B: Using Configuration as Code
```yaml
# Use .jenkins/jenkins.yaml for automated setup
```

### 3. Configure Webhooks

#### GitHub Webhook Setup
1. Go to repository **Settings** → **Webhooks**
2. **Add webhook**:
   - Payload URL: `http://your-jenkins-server/github-webhook/`
   - Content type: `application/json`
   - Events: `Just the push event`

## 📊 Pipeline Stages

### 1. **Checkout**
- Clones repository
- Captures Git metadata (commit, author, message)
- Sets build context

### 2. **Environment Setup**
- Cleans previous artifacts (optional)
- Creates artifact directories
- Sets up environment variables

### 3. **Install Dependencies**
- Runs `npm ci` for clean install
- Verifies Cypress installation
- Installs test dependencies

### 4. **Code Quality Checks**
- **Lint Check**: Code quality validation
- **Security Audit**: `npm audit` for vulnerabilities

### 5. **Run Tests**
- Executes Cypress tests based on selected type
- Captures screenshots and videos
- Generates test results

### 6. **Generate Reports**
- Processes test results
- Creates Mochawesome HTML reports
- Merges multiple test runs

### 7. **Archive Results**
- Publishes HTML reports to Jenkins
- Archives test artifacts
- Stores failure artifacts for debugging

## 🎛️ Pipeline Parameters

| Parameter | Options | Default | Description |
|-----------|---------|---------|-------------|
| `TEST_TYPE` | all, stamp-duty, headed, chrome, firefox | all | Type of tests to execute |
| `CLEAN_ARTIFACTS` | true/false | true | Clean previous artifacts |
| `GENERATE_REPORTS` | true/false | true | Generate detailed reports |

## 📈 Test Reports & Artifacts

### Mochawesome Reports
- **Location**: `cypress/reports/mochawesome.html`
- **Features**: 
  - Interactive test results
  - Embedded screenshots
  - Test duration charts
  - Failure analysis

### Artifacts
- **Screenshots**: `cypress/screenshots/`
- **Videos**: `cypress/videos/`
- **JSON Reports**: `cypress/reports/.jsons/`
- **Build Info**: `build-info.json`

### Failure Artifacts
- **Location**: `cypress/artifacts/failures/`
- **Contents**: Failed test screenshots and videos
- **Purpose**: Debugging failed test runs

## 🔧 Customization

### Adding New Test Types
1. Update `run-tests.sh` with new test command
2. Modify `getTestCommand()` function in Jenkinsfile
3. Add new parameter option in pipeline

### Custom Reporting
```javascript
// cypress.config.js
reporterOptions: {
  reportDir: "cypress/reports",
  overwrite: true,
  html: true,
  json: true,
  charts: true,
  embeddedScreenshots: true
}
```

### Environment Variables
```bash
# Set in Jenkins Global Properties
NODE_ENV=test
CYPRESS_CACHE_FOLDER=/tmp/cypress-cache
CYPRESS_RECORD_KEY=[Your Cypress Record Key]
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Cypress Installation Fails
```bash
# Solution: Install Cypress manually
npm install cypress --save-dev
npx cypress install
```

#### 2. Tests Timeout
```javascript
// Increase timeout in cypress.config.js
defaultCommandTimeout: 15000,
requestTimeout: 15000,
responseTimeout: 15000
```

#### 3. Screenshot Issues
```bash
# Ensure proper permissions
chmod -R 755 cypress/screenshots/
chmod -R 755 cypress/videos/
```

#### 4. Jenkins Agent Issues
```bash
# Check Node.js installation
node --version
npm --version

# Verify Cypress installation
npx cypress verify
```

### Debug Mode
```bash
# Run pipeline with debug output
DEBUG=cypress:* ./run-tests.sh stamp-duty
```

## 📚 Best Practices

### 1. **Test Organization**
- Keep tests focused and atomic
- Use descriptive test names
- Group related tests in describe blocks

### 2. **Artifact Management**
- Clean artifacts between runs
- Archive only necessary files
- Set appropriate retention policies

### 3. **Performance Optimization**
- Use `npm ci` for faster installs
- Cache node_modules between runs
- Parallel test execution when possible

### 4. **Security**
- Use Jenkins credentials for sensitive data
- Regular security audits
- Keep dependencies updated

## 🔗 Integration Examples

### Slack Notifications
```groovy
// Add to Jenkinsfile post section
slackSend(
  channel: '#test-results',
  color: currentBuild.result == 'SUCCESS' ? 'good' : 'danger',
  message: "Build ${currentBuild.result}: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
)
```

### Email Notifications
```groovy
// Add to Jenkinsfile post section
emailext(
  subject: "Build ${currentBuild.result}: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
  body: "Build ${currentBuild.result} for commit ${env.GIT_COMMIT_SHORT}",
  to: "team@company.com"
)
```

## 📝 Monitoring & Maintenance

### Build Retention
- **Builds**: Keep last 50 builds
- **Artifacts**: Keep for 7 days
- **Reports**: Keep for 30 days

### Regular Maintenance
- Update dependencies monthly
- Review and clean old artifacts
- Monitor pipeline performance
- Update test coverage

## 🎯 Success Metrics

- **Build Success Rate**: >95%
- **Test Execution Time**: <10 minutes
- **Artifact Generation**: 100% success
- **Report Accessibility**: Always available

## 📞 Support

For issues or questions:
1. Check Jenkins build logs
2. Review test artifacts
3. Consult this documentation
4. Contact the development team

---

**Last Updated**: October 2024  
**Version**: 1.0.0  
**Maintainer**: Test Automation Team
