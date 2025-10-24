# Jenkins Docker setup for NSW Stamp Duty Test Pipeline
FROM jenkins/jenkins:2.426-jdk17

# Switch to root user to install packages
USER root

# Install required system packages
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    unzip \
    xvfb \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 20.x
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Install global npm packages
RUN npm install -g \
    cypress \
    mochawesome-merge \
    marge \
    npm-check-updates

# Switch back to jenkins user
USER jenkins

# Copy plugins list
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt

# Install Jenkins plugins
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt

# Copy Jenkins configuration
COPY jenkins.yaml /usr/share/jenkins/ref/jenkins.yaml

# Set environment variables
ENV JENKINS_OPTS="--httpPort=8080"
ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:8080/login || exit 1

# Start Jenkins
CMD ["jenkins.sh"]
