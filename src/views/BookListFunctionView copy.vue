<template>
    <div class="container">
        <div class="row">
            <h1 class="text-center">Get Firebase Books by Function</h1>
            <table class="table table-striped table-bordered table-hover" style="margin-top: 20px;">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ISBN</th>
                        <th scope="col">Book Name</th>
                        <th scope="col">Category</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(book, index) in books" :key="book.id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ book.isbn }}</td>
                        <td>{{ book.name }}</td>
                        <td>{{ book.category }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            books: [],
        };
    },
    created() {
        this.fetchBooks();
    },
    methods: {
        async fetchBooks() {
            try{
                const response = await axios.get('https://getbooks-fqquxhhbva-uc.a.run.app');
                console.log(response.data)
                this.books = response.data; 
            }catch (error){
                console.error("Error fetching books:", error);
            }
        }
    }
};

</script>