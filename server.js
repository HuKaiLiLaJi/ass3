import express from 'express';

import bodyParser from 'body-parser'
import cors from 'cors'
import sgMail from '@sendgrid/mail'


const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

sgMail.setApiKey('need to add soon');

app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
});

// send mail API
app.post('/send-email', async (req, res) => {
    const { to, subject, text, html } = req.body;

    if (!Array.isArray(to) || to.length === 0) {
        return res.status(400).send('Recipient emails are required');
    }

    const messages = to.map(email => ({
        to: email,
        from: 'yupengliu92@gmail.com', // my email
        subject,
        text,
        html,
    }));


    try {
        const response = await sgMail.send(messages);
        console.log(response);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.log(error)
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port localhost:${port}`);
});