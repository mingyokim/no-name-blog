import path from 'path';
import router from './router';

const express = require('express');
const os = require('os');

const app = express();
console.log('********', __dirname);
console.log('*******', path.join(__dirname, '../../dist'));
app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('*', router);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
