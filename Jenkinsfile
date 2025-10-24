pipeline {
    agent any
    
    environment {
        PATH = "/usr/local/bin:/usr/bin:/bin:/opt/homebrew/bin:/opt/homebrew/opt/node@20/bin:${PATH}"
        NODE_VERSION = '20'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo "🚀 Starting NSW Stamp Duty Test Pipeline"
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo "📦 Installing dependencies..."
                sh '''
                    echo "Current PATH: $PATH"
                    node --version
                    npm --version
                    npm ci
                '''
            }
        }
        
        stage('Run Tests') {
            steps {
                echo "🧪 Running Cypress tests..."
                sh '''
                    chmod +x run-tests.sh
                    ./run-tests.sh stamp-duty
                '''
            }
        }
        
        stage('Generate Reports') {
            steps {
                echo "📊 Generating Mochawesome reports..."
                sh '''
                    echo "Checking for report files..."
                    ls -la cypress/reports/.jsons/ || echo "No reports directory found"
                    
                    if ls cypress/reports/.jsons/mochawesome_*.json 1> /dev/null 2>&1; then
                        echo "Found report files, generating merged report..."
                        npx mochawesome-merge "cypress/reports/.jsons/*.json" > cypress/reports/merged-report.json
                        
                        # Try to generate HTML report with marge, fallback to basic approach if it fails
                        if npx marge cypress/reports/merged-report.json --reportDir cypress/reports --reportFilename merged-report.html; then
                            echo "HTML report generated successfully with marge!"
                        else
                            echo "Marge failed, using basic report generation..."
                            # Basic HTML report generation without marge
                            echo "<html><body><h1>Test Report</h1><p>Reports available in JSON format</p></body></html>" > cypress/reports/merged-report.html
                        fi
                        
                        echo "Reports generated successfully!"
                    else
                        echo "No report files found to merge"
                        # Create a basic HTML report even if no JSON files exist
                        echo "<html><body><h1>Test Report</h1><p>No test results found</p></body></html>" > cypress/reports/merged-report.html
                    fi
                '''
            }
        }
    }
    
    post {
        always {
            // Archive test artifacts
            archiveArtifacts artifacts: 'cypress/screenshots/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/reports/**/*', allowEmptyArchive: true
            
            // Publish HTML report
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'cypress/reports',
                reportFiles: 'merged-report.html',
                reportName: 'Cypress Test Report'
            ])
        }
        
        failure {
            echo "💥 Tests failed! Check the reports and artifacts for details."
        }
    }
}