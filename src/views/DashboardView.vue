<template>
    <div class="container">
        <div class="row">
            <h1 class="text-center">Books List</h1>
            <table class="table table-striped table-bordered table-hover" style="margin-top: 20px;">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ISBN</th>
                        <th scope="col">Book Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Creator</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(book, index) in books" :key="book.id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ book.isbn }}</td>
                        <td>{{ book.name }}</td>
                        <td>{{ book.category }}</td>
                        <td>{{ book.creator }}</td>
                    </tr>
                </tbody>
            </table>
            <hr>
            <h1 class="text-center">Users List</h1>
            <h3>Admin: {{ admin }}, Customer: {{ customer }}</h3>
            <table class="table table-striped table-bordered table-hover" style="margin-top: 20px;">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Email</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in users" :key="user.id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ user.email }}</td>
                        <td>{{ user.gender }}</td>
                        <td :class="user.role === 'admin' ? 'text-danger' : 'text-primary'">{{ user.role }}</td>
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
            users: [],
            admin: 0,
            customer: 0
        };
    },
    created() {
        this.fetchBooks();
    },
    methods: {
        async fetchBooks() {
            try{
                const response = await axios.get('https://getbooks-fqquxhhbva-uc.a.run.app');
                this.books = response.data; 

                const users = await axios.get('https://getusers-fqquxhhbva-uc.a.run.app');
                this.users = users.data;

                const counterUsers = await axios.get('https://countusers-fqquxhhbva-uc.a.run.app');
                this.admin = counterUsers.data.admin;
                this.customer = counterUsers.data.customer;

            }catch (error){
                console.error("Error fetching books:", error);
            }
        }
    }
};

</script>