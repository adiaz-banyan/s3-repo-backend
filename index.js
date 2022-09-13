const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;
const route = require('./routes/routeOne');

app.use(cors());
app.use(express.static('src'));
app.use('/api', route);

app.listen(port, () => console.log(`server running on ${port}`));
