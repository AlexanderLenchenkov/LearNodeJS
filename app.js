const http = require('http');
const { json } = require('stream/consumers');

const PORT = 3000;

const server = http.createServer((req, res) => {
	console.log('Server request');
	console.log(req.url, req.method);

	res.setHeader('Context-Type', 'application/json');
	// res.write(`<h1>Hello!</h1>`);
	// res.write(`<p>Hello. It is description!</p>`);

	const data = JSON.stringify([
		{ name: 'Alex', age: 19 },
		{ name: 'Daniil', age: 18 },
	]);

	res.end(data);
});

server.listen(PORT, 'localhost', error => {
	error ? console.log(error) : console.log(`Listening port ${PORT}`);
});
