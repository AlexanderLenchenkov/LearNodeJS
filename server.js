const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();

// для использования шаблонизатора
app.set('view engine', 'ejs');

// константы
const PORT = 3000;
const DB_URL = 'mongodb://localhost:27017/node-blog';

// подключение к БД
mongoose
	.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(res => console.log('Connected to DB'))
	.catch(error => console.log(error));

// создание пути до нужного файла html
const createPath = page => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, error => {
	error ? console.log(error) : console.log(`listening port ${PORT}`);
});

// выводит информацию о запросе в консоль
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));

// для подключения статического файла, который изначально запрещён
app.use(express.static('styles'));

app.get('/', (req, res) => {
	const title = 'Home';
	res.render(createPath('index'), { title });
});

app.get('/contacts', (req, res) => {
	const title = 'Contacts';
	const contacts = [
		{ name: 'YouTube', link: 'http://youtube.com/YauhenKavalchuk' },
		{ name: 'Twitter', link: 'http://github.com/YauhenKavalchuk' },
		{ name: 'GitHub', link: 'http://twitter.com/YauhenKavalchuk' },
	];
	res.render(createPath('contacts'), { contacts, title });
});

app.get('/posts/:id', (req, res) => {
	const title = 'Post';
	const post = {
		id: '1',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
		title: 'Post title',
		date: '05.05.2021',
		author: 'Yauhen',
	};
	res.render(createPath('post'), { title, post });
});

app.get('/posts', (req, res) => {
	const title = 'Posts';
	const posts = [
		{
			id: 1,
			text: 'LOrem',
			title: 'Super',
			date: 'date',
			author: 'Alexander Lenchenkov',
		},
		{
			id: 2,
			text: 'LOrem',
			title: 'lorem	',
			date: 'date',
			author: 'Alexander Lenchenkov',
		},
	];
	res.render(createPath('posts'), { title, posts });
});

app.post('/add-post', (req, res) => {
	const { title, author, text } = req.body;
	const post = new Post({ title, author, text });
	post
		.save()
		.then(result => res.send(result))
		.catch(error => {
			console.log(error);
			res.render(createPath('error'), { title: 'Error' });
		});
});

app.get('/add-post', (req, res) => {
	const title = 'Add Post';
	res.render(createPath('add-post'), { title });
});

// Если ни один из энд поинтов не подошел, вызывается ошибка
app.use((req, res) => {
	const title = 'Error Page';
	res.status(404).render(createPath('error'), { title });
});
