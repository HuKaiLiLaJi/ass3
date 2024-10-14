<template>
    <pre v-if="jsondata">{{jsondata}}</pre>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            jsondata: null
        }
    },
    mounted() {
        this.getBookCountAPI();
    },
    methods: {
        async getBookCountAPI() {
            try{
                const response = await axios.get('https://getbooks-fqquxhhbva-uc.a.run.app');
                const processedBooks = response.data.map(book => {
                    return {
                        isbn: book.isbn,
                        name: book.name,
                        category: book.category,
                        creator: book.creator
                    };
                });
                this.jsondata = {code: 200, status: 'success', message:'get all books successful', data: processedBooks};
            }catch (error){
                console.error("Error fetching books:", error);
                this.jsondata = {code: 400, status: 'failed', message:'get all books failed', data: null};
            }
        }
    }
};

</script>