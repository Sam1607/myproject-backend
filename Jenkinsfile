pipeline {
    agent any

    environment {
        EC2_IP = "13.211.37.30"
        APP_DIR = "/home/ubuntu/myproject-backend"
        BACKEND_NAME = "my-first-backend-server"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Sam1607/myproject-backend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-key']) {
                    sh """
                    # Sync backend code to EC2
                    rsync -avz ./ ubuntu@${EC2_IP}:${APP_DIR}/

                    # Connect to EC2 and restart backend
                    ssh ubuntu@${EC2_IP} '
                        cd ${APP_DIR}
                        npm install
                        pm2 restart ${BACKEND_NAME} || pm2 start server.js --name ${BACKEND_NAME}
                    '
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Backend deployed successfully to EC2!"
        }
        failure {
            echo "Deployment failed. Check Jenkins logs."
        }
    }
}

