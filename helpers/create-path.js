const path = require('path');

// создание пути до нужного файла ejs
const createPath = page => path.resolve(__dirname, '../ejs-views', `${page}.ejs`);

module.exports = createPath;
