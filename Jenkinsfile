pipeline {
    agent any
    
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
                sh 'npm ci'
            }
        }
        
        stage('Run Tests') {
            steps {
                echo "🧪 Running Cypress tests..."
                sh './run-tests.sh stamp-duty'
            }
        }
        
        stage('Generate Reports') {
            steps {
                echo "📊 Generating Mochawesome reports..."
                sh '''
                    if [ -f "cypress/reports/.jsons/mochawesome_*.json" ]; then
                        npx mochawesome-merge "cypress/reports/.jsons/*.json" > cypress/reports/merged-report.json
                        npx marge cypress/reports/merged-report.json --reportDir cypress/reports --inline
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
                reportFiles: 'mochawesome.html',
                reportName: 'Cypress Test Report'
            ])
        }
        
        failure {
            echo "💥 Tests failed! Check the reports and artifacts for details."
        }
    }
}