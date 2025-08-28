# GitHub Actions CI/CD Pipeline

This directory contains comprehensive CI/CD workflows for the React Native Todo App.

## 📋 Workflow Overview

### 1. **CI Pipeline** (`.github/workflows/ci.yml`)
- **Triggers**: Push to `main`/`develop`, Pull Requests
- **Jobs**:
  - **Test & Lint**: ESLint, TypeScript checks, Jest tests with coverage
  - **Web Build**: Builds web version and uploads artifacts
  - **Android Build**: Builds Android APK using Gradle
  - **iOS Build**: Builds iOS app using Xcode (macOS only)

### 2. **Deployment Pipeline** (`.github/workflows/deploy.yml`)
- **Triggers**: Push to `main`, Manual dispatch
- **Jobs**:
  - **Deploy Web**: GitHub Pages, Vercel (staging/production)
  - **Deploy Mobile**: Firebase App Distribution, GitHub Releases

### 3. **Security Pipeline** (`.github/workflows/security.yml`)
- **Triggers**: Push/PR to `main`/`develop`, Weekly schedule
- **Jobs**:
  - **Dependency Scan**: npm audit, Snyk vulnerability scanning
  - **Code Scanning**: CodeQL, SonarCloud analysis
  - **License Check**: License compliance verification

### 4. **Pull Request Checks** (`.github/workflows/pr-checks.yml`)
- **Triggers**: Pull Requests to `main`/`develop`
- **Jobs**:
  - **PR Quality Checks**: Linting, formatting, type checking, tests
  - **Dependency Review**: Security review of dependency changes
  - **PR Size Label**: Automatically labels PRs by size
  - **Auto Merge**: Enables auto-merge for approved PRs

### 5. **Nightly Pipeline** (`.github/workflows/nightly.yml`)
- **Triggers**: Daily at 2 AM UTC, Manual dispatch
- **Jobs**:
  - **Nightly Tests**: Comprehensive testing across Node versions
  - **Dependency Updates**: Checks for outdated packages
  - **Performance Monitoring**: Bundle size and build time analysis
  - **Security Audit**: Daily security scanning

## 🔧 Required Secrets

### For Deployment
```bash
# Vercel (Web Deployment)
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# Firebase (Mobile Distribution)
FIREBASE_APP_ID_ANDROID=your_firebase_app_id
FIREBASE_SERVICE_ACCOUNT=your_service_account_json

# SonarCloud (Code Quality)
SONAR_TOKEN=your_sonarcloud_token

# Snyk (Security Scanning)
SNYK_TOKEN=your_snyk_token
```

### For Notifications
```bash
# Slack (Optional)
SLACK_WEBHOOK_URL=your_slack_webhook_url

# Discord (Optional)
DISCORD_WEBHOOK_URL=your_discord_webhook_url
```

## 🚀 Quick Start

1. **Enable GitHub Actions** in your repository settings
2. **Add required secrets** in Settings → Secrets and variables → Actions
3. **Push to main branch** to trigger the first CI run
4. **Monitor workflows** in the Actions tab

## 📊 Workflow Status Badges

Add these badges to your README.md:

```markdown
![CI](https://github.com/{owner}/{repo}/workflows/CI/badge.svg)
![Deploy](https://github.com/{owner}/{repo}/workflows/Deploy/badge.svg)
![Security](https://github.com/{owner}/{repo}/workflows/Security/badge.svg)
![Nightly](https://github.com/{owner}/{repo}/workflows/Nightly/badge.svg)
```

## 🔍 Monitoring & Alerts

### Workflow Notifications
- **Success**: Green checkmark in GitHub UI
- **Failure**: Red X with detailed error logs
- **Artifacts**: Downloadable build outputs and reports

### Quality Gates
- **Test Coverage**: Minimum 80% coverage required
- **Security**: No high/critical vulnerabilities
- **Performance**: Bundle size under 1MB
- **Dependencies**: All dependencies up to date

## 🛠️ Customization

### Environment-Specific Configurations
```yaml
# In workflow files, modify these sections:
env:
  NODE_ENV: production
  REACT_APP_API_URL: ${{ secrets.API_URL }}
```

### Branch Protection Rules
Enable these in repository settings:
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Require pull request reviews
- ✅ Dismiss stale PR approvals

### Workflow Permissions
```yaml
permissions:
  contents: read
  pull-requests: write
  issues: write
  actions: read
```

## 📈 Performance Optimization

### Caching Strategies
- **npm cache**: Reduces dependency installation time
- **Gradle cache**: Speeds up Android builds
- **CocoaPods cache**: Optimizes iOS builds

### Parallel Execution
- Jobs run in parallel where possible
- Matrix builds for multiple Node versions
- Separate runners for different platforms

## 🔒 Security Best Practices

1. **Secrets Management**: Never hardcode secrets in workflows
2. **Dependency Scanning**: Regular vulnerability checks
3. **Code Scanning**: Static analysis with CodeQL
4. **License Compliance**: Verify all dependencies are compliant
5. **Access Control**: Minimal required permissions for workflows

## 📝 Troubleshooting

### Common Issues

**Build Failures**
```bash
# Check logs in Actions tab
# Verify Node.js version compatibility
# Ensure all dependencies are installed
```

**Deployment Issues**
```bash
# Verify secrets are correctly set
# Check environment variables
# Ensure target platforms are accessible
```

**Performance Issues**
```bash
# Enable caching for faster builds
# Use matrix builds for parallel execution
# Optimize Docker images if using containers
```

## 🤝 Contributing

When contributing to the CI/CD setup:

1. **Test locally** before pushing changes
2. **Update documentation** for new workflows
3. **Add appropriate labels** to PRs
4. **Review security implications** of changes
5. **Monitor workflow performance** impact

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [React Native CI/CD Best Practices](https://reactnative.dev/docs/ci-cd)
- [Security Best Practices](https://security.github.com/)
- [Performance Optimization](https://github.com/actions/cache)
