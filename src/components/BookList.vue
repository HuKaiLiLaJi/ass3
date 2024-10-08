<script>
import db from '../firebase/init.js'
import { collection, query, where, getDocs, doc, orderBy, deleteDoc, getDoc, limit, updateDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      title: '',
      books: [],
      search_category: '',
      isEdit: false
    };
  },
  created() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        const q = query(collection(db, 'books'), where('isbn', '>', 1000), orderBy("isbn"), limit(10))
        const querySnapshot = await getDocs(q)
        const booksArray = []
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() })
        });
        this.books = booksArray
        this.title = 'Top 10 Books With ISBN > 1000 In Firebase'
      } catch (error) {
        console.log('Error fetching books: ', error)
      }
    },
    async searchBook() {
      console.log(this.search_category)
      try {
        if (this.search_category != '') {
          const q = query(collection(db, 'books'), where('category', '==', this.search_category), orderBy("isbn"))
          const querySnapshot = await getDocs(q)
          const booksArray = []
          querySnapshot.forEach((doc) => {
            booksArray.push({ id: doc.id, ...doc.data() })
          });
          this.books = booksArray
          this.title = 'Books With Category: ' + this.search_category + ' In Firebase'
        } else {
          this.fetchBooks()
        }
      } catch (error) {
        console.log('Error fetching books: ', error)
      }
    },
    openEdit(){
      this.isEdit = true;
    },
    closeEdit(){
      this.isEdit = false;
    },
    // edit book
    async editBook(book) {
      const updateBook = doc(db, "books", book.id);
      updateBook.name = book.name
      try{
        await updateDoc(updateBook, {
          name: book.name
        });
        alert("Update book name successfully!")
        this.isEdit = false
      } catch(error){
        console.log("Edit book error:", error)
      }
      
    },
    async deleteBook(id) {
      try {
        const snap = await getDoc(doc(db, "books", id));
        if (snap.exists()) {
          const role = sessionStorage.getItem('role')
          if (role == 'admin') {
            deleteDoc(doc(db, "books", id))
            this.fetchBooks()
          } else {
            alert("Only the admin can delete book");
          }
        } else {
          console.log("The book to be deleted does not exist");
        }
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    } // deleteBook end
  }
};

</script>
<template>
  <div class="container">
    <div class="row">
      <h1 class="text-center">{{ title }}</h1>
      <form class="row row-cols-lg-auto align-items-center justify-content-center" action="#" style="margin-bottom: 20px;">
        <div class="col-12">
          <label class="visually-hidden" for="search_category">Category</label>
          <select class="form-select" id="search_category" v-model="search_category">
            <option value="" selected>Choose Category...</option>
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Horror">Horror</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
          </select>
        </div>
        <div class="col-12">
          <button type="button" class="btn btn-primary" @click="searchBook()">Search</button>
        </div>
      </form>
      <button v-if="!isEdit" class="btn btn-info" @click="openEdit()">Open Book Name Edit</button>
      <button v-if="isEdit" class="btn btn-info" @click="closeEdit()">Close Book Name Edit</button>
      <table class="table table-striped table-bordered table-hover" style="margin-top: 20px;">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ISBN</th>
            <th scope="col">Book Name</th>
            <th scope="col">Category</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(book, index) in books" :key="book.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ book.isbn }}</td>
            <td><input type="text" v-model="book.name" :disabled="!isEdit"></td>
            <td>{{ book.category }}</td>
            <td>
              <button class="btn btn-primary mx-2" @click="editBook(book)">Edit</button>
              <button class="btn btn-danger mx-2" @click="deleteBook(book.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>
