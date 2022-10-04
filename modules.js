const os = require('os');

const { userName: user, sayHi } = require('./test.js');

console.log(user);
sayHi();
console.log(os.platform(), os.release());
