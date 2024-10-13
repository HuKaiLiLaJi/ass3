<template>
    <div class="container mt-5">
      <div class="row">
        <h1 class="text-center">Add Book to My Collection</h1>
        <form @submit.prevent="addBook">
          <div class="mb-3">
            <label for="isbn" class="form-label">ISBN:</label>
            <input type="text" class="form-control" id="isbn" v-model="book.isbn" required />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" v-model="book.name" required />
          </div>
          <div class="mb-3">
            <label for="category" class="form-label">Category:</label>
            <select class="form-select" id="category" v-model="book.category" required>
              <option value="Fiction">Fiction</option>
              <option value="Science">Science</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Horror">Horror</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
            </select>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Add Book</button>
          </div>
        </form>
  
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: sessionStorage.getItem('user'),
        book: {
          isbn: '',
          name: '',
          category: '',
          creator: this.user,
          createdAt: new Date()
        }
      }
    },
    methods: {
       // Convert book attribute values uppercase
       toUpperCaseBook(book) {
        return {
          isbn: book.isbn.toUpperCase(),
          name: book.name.toUpperCase(),
          category: book.category,
          creator: this.user,
          createdAt: new Date()
        };
      },
      
      async addBook() {
        try {
          const upperCaseBook = this.toUpperCaseBook(this.book);
          await axios.post('https://createbook-fqquxhhbva-uc.a.run.app', upperCaseBook);
          alert('Add Book Successfully');
          this.book.isbn = '';
          this.book.name = '';
          this.book.category = '';
        } catch (error) {
          console.error("Error add book:", error);
        }
      }
    }
  };
  
  </script>