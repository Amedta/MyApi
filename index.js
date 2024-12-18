const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { readdirSync } = require('fs');
require('dotenv').config();
// Database connections
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));
// Routes
readdirSync('./Routes')
    .map((r) => app.use('/api', require('./Routes/' + r)));
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
