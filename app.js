const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('./docs/text.txt');
const writeStream = fs.createWriteStream('./docs/new-text.txt');
const compressStream = zlib.createGzip();

// readStream.on('data', chunk => {
// 	writeStream.write('-------------------------------------------');
// 	writeStream.write(chunk);
// });
// Функция для остановки потока при ошибке
const handleError = () => {
	console.log('Error');
	readStream.destroy();
	writeStream.end('Finished with error...');
};
readStream.on('error', handleError).pipe(compressStream).pipe(writeStream).on('error', handleError);
