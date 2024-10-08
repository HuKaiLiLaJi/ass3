import express from 'express';

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});