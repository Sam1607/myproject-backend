pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timeout(time: 5, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    environment {
        GITHUB_CREDENTIALS = 'github-ssh'
        EC2_USER  = "ubuntu"
        EC2_IP    = "3.106.206.48"
        SSH_KEY   = "github-ssh"
        APP_DIR = "/home/ubuntu/myproject-backend"
        NODE_PATH = "/home/ubuntu/.nvm/versions/node/v20.19.5/bin"
        GIT_BRANCH = "main"
    }

    stages {

        stage('Clone Repository') {
            steps {
                echo "📥 Cloning repository..."
                git(
                    branch: "${GIT_BRANCH}",
                    credentialsId: "${GITHUB_CREDENTIALS}",
                    url: 'https://github.com/Sam1607/myproject-backend.git'
                )
            }
        }

        stage('Prepare EC2 Directory') {
            steps {
                echo "📂 Preparing backend directory on EC2..."
                sshagent([SSH_KEY]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_IP} \
                        'mkdir -p ${APP_DIR}'
                    """
                }
            }
        }

        stage('Upload Backend to EC2') {
    steps {
        echo "🚀 Uploading backend..."
        sshagent([SSH_KEY]) {
            sh """
                rsync -avz --delete \
                --exclude='.git' \
                -e "ssh -o StrictHostKeyChecking=no" \
                ./ ${EC2_USER}@${EC2_IP}:${APP_DIR}/
            """
        }
    }
}


        stage('Install Backend Dependencies (EC2)') {
            steps {
                echo "📦 Installing backend dependencies..."
                sshagent([SSH_KEY]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_IP} '
                            export PATH=${NODE_PATH}:\$PATH
                            cd ${APP_DIR}
                            yarn install --production --frozen-lockfile
                        '
                    """
                }
            }
        }

        stage('Restart Backend (PM2)') {
            steps {
                echo "♻ Restarting PM2..."
                sshagent([SSH_KEY]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_IP} '
                            export PATH=${NODE_PATH}:\$PATH
                            cd ${APP_DIR}
                            pm2 restart my-first-application --update-env || pm2 start dist/index.js --name my-first-application
                            pm2 save
                        '
                    """
                }
            }
        }
    }

    post {
        success {
            echo "🎉 DEPLOYMENT SUCCESSFUL"
        }
        failure {
            echo "❌ DEPLOYMENT FAILED"
        }
    }
}
