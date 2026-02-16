pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://your-repo-url.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test --reporter=junit'
            }
        }

        stage('Publish Reports') {
            steps {
                junit '**/test-results/*.xml'
                archiveArtifacts artifacts: 'playwright-report/**'
            }
        }
    }
}