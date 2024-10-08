<template>
    <!-- 🗄️ W3. Library Registration Form -->
    <div class="container mt-5">
        <div class="row">
            <h1 class="text-center">Book Counter</h1>
            <button type="submit" class="btn btn-primary me-2" @click="getBookCount">Get Book Count</button>

            <p class="text-center bg-info" v-if="count !== null">Total number of books: {{
                count }}</p>
            <p class="text-center bg-error" v-if="error">Error message: {{ error }}</p>

        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            count: null,
            error: null
        }
    },
    methods: {
        async getBookCount() {
            try{
                const response = await axios.get('https://countbooks-fqquxhhbva-uc.a.run.app');
                this.count = response.data.count;
                this.error = null;
            }catch (error){
                console.error("Error fetching book count:", error);
                this.error = error;
                this.count = null;
            }
        }
    }
};

</script>
