const Logger = require('./log.js');

const logger = new Logger();

logger.on('some_event', args => {
	const { id, text } = args;
	console.log(id, text);
});

logger.on('User Logged!');
