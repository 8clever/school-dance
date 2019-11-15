module.exports = {
  apps: [
    {
      name: "balet-deploy",
      script: "./dist/server/index.js"
    }
  ],
  deploy: {
    "production" : {
      "key"  : "/home/ivanv/.ssh/balet.pem",
      "user" : "ubuntu",
      "host" : "13.48.25.23",
      "ref"  : "origin/master",
      "repo" : "https://github.com/8clever/school-dance.git",
      "path" : "/home/ubuntu/deploy",
      "post-deploy" : `
        /home/ubuntu/.nvm/versions/node/v10.17.0/bin/npm install &&
        /home/ubuntu/.nvm/versions/node/v10.17.0/bin/npm run build &&
        pm2 startOrRestart ecosystem.json
      `,
      "pre-setup": "sudo apt-get install git",
      "env": {
        DEVELOPMENT: "",
        SALT: "s@altyS@lt"
      }
    },
  }
}