const express = require('express');
const app = express();
const path = require('path');
const port = 8000;
app.use('/', express.static(path.join(__dirname, 'docs/')));

app.listen(port, () => { console.log(`Documentation is now served on http://localhost:${port}`) });