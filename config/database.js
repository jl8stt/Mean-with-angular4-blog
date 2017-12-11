const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
      //uri: 'mongodb://localhost:27017/mean-angular-4',
      //or uri: 'mongodb://localhost/mean-angular-4',
      uri: 'mongodb://jianhua:jianhua@ds137246.mlab.com:37246/mean-stack-app',
      secret: crypto,
      //db: 'mean-angular-4'
      db: 'mean-stack-app'
}
