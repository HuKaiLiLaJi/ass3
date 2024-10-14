const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
const sgMail = require("@sendgrid/mail");

const {GoogleGenerativeAI} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyDmL96zqboEKr1K0chCMEAiSOSkBYCrk1M");

admin.initializeApp();

// eslint-disable-next-line max-len
sgMail.setApiKey("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");

// Count the number of books in the database
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // Get the books collection from Firestore
      const bookCollection = admin.firestore().collection("books");
      const snapshot = await bookCollection.get();

      const count = snapshot.size;
      // Return the count
      res.status(200).send({count});
    } catch (error) {
      // Log and return an error if an exception occurs
      console.log("Error counting books:", error.message);
      logger.error("Error:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

// Add a new book to the database
exports.createBook = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const newBook = req.body;
      if (newBook.isbn == null || newBook.isbn.length === 0) {
        res.status(500).send("Book isbn is required");
      }
      if (newBook.name == null || newBook.name.length === 0) {
        res.status(500).send("Book name is required");
      }
      if (newBook.category == null || newBook.category.length === 0) {
        res.status(500).send("Book category is required");
      }
      const bookCollection = admin.firestore().collection("books");
      const bookRef = await bookCollection.add(newBook);
      // Return a success message containing the book's ID
      res.status(200).send({"message": `Book created with ID: ${bookRef.id}`});
    } catch (error) {
      // Log and return an error if an exception occurs
      console.log("Error add books:", error.message);
      logger.error("Error:", error.message);
      res.status(500).send("Error add book");
    }
  });
});

// Query all books in the database
exports.getBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // Get the books collection from Firestore
      const bookCollection = admin.firestore().collection("books");
      const snapshot = await bookCollection.get();
      // Convert the snapshot to an array of objects containing book information
      const books = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
      // Return the array of books
      res.status(200).json(books);
    } catch (error) {
      // Log and return an error if an exception occurs
      console.log("Error get books:", error.message);
      logger.error("Error:", error.message);
      res.status(500).send("Error get book");
    }
  });
});

// Send an email to the specified recipient
exports.sendMail = onRequest((req, res) => {
  cors(req, res, async () => {
    const {to, subject, text, html} = req.body;
    // Check that the recipient email list is not empty
    if (!Array.isArray(to) || to.length === 0) {
      return res.status(400).send("Recipient emails are required");
    }
    // Generate an array of email messages
    const messages = to.map((email) => ({
      to: email,
      from: "yupengliu92@gmail.com", // my email
      subject,
      text,
      html,
    }));
    try {
      // Send the array of email messages
      await sgMail.send(messages);
      // console.log(response);
      res.status(200).send("Email sent successfully");
    } catch (error) {
      // console.log(error);
      console.error("Error sending email:", error);
      res.status(500).send("Failed to send email");
    }
  });
});

// count users
exports.countUsers = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // Firestore users collection
      const usersRef = admin.firestore().collection("users");
      // get all users
      const snapshot = await usersRef.get();
      // create roleCounts object to store counts for each role
      const roleCounts = {};
      // iterate over all documents in the snapshot
      snapshot.forEach((doc) => {
        const userData = doc.data();
        const role = userData.role;
        // if this role doesn't exist, initialize it with a count of 0
        if (!roleCounts[role]) {
          roleCounts[role] = 0;
        }
        // increment this role
        roleCounts[role] += 1;
      });
      // return counts
      res.status(200).json(roleCounts);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).send("Error fetching user data");
    }
  });
});

// Query all users in the database
exports.getUsers = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // Get the users collection from Firestore
      const userCollection = admin.firestore().collection("users");
      const snapshot = await userCollection.get();
      const users = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
      // Return the array of users
      res.status(200).json(users);
    } catch (error) {
      // Log and return an error if an exception occurs
      console.log("Error get users:", error.message);
      logger.error("Error:", error.message);
      res.status(500).send("Error get users");
    }
  });
});

// Chat with the AI model
exports.chat = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // Get the user's question from the request body
      const prompt = req.body.question;
      // Check that the question is not empty
      if (prompt == null || prompt.length === 0) {
        return res.status(400).send("Question are required");
      }
      // Get the generative AI model
      const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});
      // Generate a response to the question
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      // Return the AI's response
      res.status(200).json(text);
    } catch (error) {
      // Log and return an error if an exception occurs
      logger.error("Error:", error.message);
      res.status(500).send("Error chat:", error.message);
    }
  });
});

