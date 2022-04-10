const fallback = require('express-history-api-fallback');
const express = require('express');
const path = require('path');

const app = express();



app.use(express.static(path.resolve('dist')));
app.use(fallback('index.html', { root: 'dist' }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
