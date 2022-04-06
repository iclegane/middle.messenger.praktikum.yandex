const fallback = require('express-history-api-fallback');
const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;

app.use(express.static(path.resolve('dist')));
app.use(fallback('index.html', { root: 'dist' }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
