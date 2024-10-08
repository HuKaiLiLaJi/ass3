/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

// count book
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const bookCollection = admin.firestore().collection("books");
      const snapshot = await bookCollection.get();

      const count = snapshot.size;

      res.status(200).send({count});
    } catch (error) {
      console.log("Error counting books:", error.message);
      logger.error("Error:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

// add book
exports.createBook = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const newBook = req.body;
      const bookCollection = admin.firestore().collection("books");
      const bookRef = await bookCollection.add(newBook);
      res.status(200).send({"message": `Book created with ID: ${bookRef.id}`});
    } catch (error) {
      console.log("Error add books:", error.message);
      logger.error("Error:", error.message);
      res.status(500).send("Error add book");
    }
  });
});

// query book
exports.getBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const bookCollection = admin.firestore().collection("books");
      const snapshot = await bookCollection.get();
      const books = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
      res.status(200).json(books);
    } catch (error) {
      console.log("Error get books:", error.message);
      logger.error("Error:", error.message);
      res.status(500).send("Error get book");
    }
  });
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
