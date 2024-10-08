<script>
import { ref } from 'vue'
import db from '../firebase/init.js'
import { collection, addDoc } from 'firebase/firestore';


export default {
  setup() {
    const isbn = ref('')
    const name = ref('');
    const category = ref('')

    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number');
          return;
        }

        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,
          name: name.value,
          category: category.value
        });

        isbn.value = ''
        name.value = ''
        category.value = ''
        alert('Add Book Successfully');

      } catch (error) {
        console.log("Error add book: ", error)
      }
    };
    return {
      isbn,
      name,
      category,
      addBook
    };
  }
};

</script>
<template>
  <div class="container mt-5">
    <div class="row">
      <h1 class="text-center">Add Book To Firebase</h1>
      <form @submit.prevent="addBook">
        <div class="mb-3">
          <label for="isbn" class="form-label">ISBN:</label>
          <input type="text" class="form-control" id="isbn" v-model="isbn" required />
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">Name:</label>
          <input type="text" class="form-control" id="name" v-model="name" required />
        </div>
        <div class="mb-3">
          <label for="category" class="form-label">Category:</label>
          <select class="form-select" id="category" v-model="category" required>
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