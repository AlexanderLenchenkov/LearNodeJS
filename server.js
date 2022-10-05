const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

const createPath = page => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, error => {
	if (error) {
		console.log(error);
	} else {
		console.log(`Listening port ${PORT}`);
	}
});

app.get('/', (req, res) => {
	res.render(createPath('index'));
});

app.get('/contacts', (req, res) => {
	res.render(createPath('contacts'));
});

app.get('/about-us', (req, res) => {
	res.render('/contacts');
});

app.get('/posts/:id', (req, res) => {
	res.render(createPath('post'));
});

app.get('/posts', (req, res) => {
	res.render(createPath('posts'));
});
app.get('/add-post', (req, res) => {
	res.render(createPath('add-post'));
});

//! Использовать только в конце!
app.use((req, res) => {
	res.status(404).render(createPath('error'));
});
