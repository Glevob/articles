const express = require('express');
const cors = require('cors');
const articleRoutes = require('./routes/article');
const commentRoutes = require('./routes/comment');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', articleRoutes);
app.use('/', commentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});