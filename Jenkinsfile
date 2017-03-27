pipeline {
  agent any
  stages {
    stage('pull') {
      steps {
        git(url: 'https://github.com/Vyapi/vyapi.git', branch: 'master')
      }
    }
  }
}