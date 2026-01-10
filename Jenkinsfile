pipeline {
  agent any

  environment {
    EC2_IP = "13.211.37.30"
    APP_DIR = "/home/ubuntu/myproject-backend"
    BACKEND_NAME = "my-first-backend-…" // PM2 process name
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/YOUR_USERNAME/backend-repo.git'
      }
    }

    stage('Install Backend Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Deploy to EC2') {
      steps {
        sshagent(['ec2-key']) {
          sh """
          rsync -avz ./ ubuntu@${EC2_IP}:${APP_DIR}/

          ssh ubuntu@${EC2_IP} '
            cd ${APP_DIR}
            npm install
            pm2 restart ${myproject-backend} || pm2 start server.js --name ${myproject-backend}
          '
          """
        }
      }
    }
  }
}
