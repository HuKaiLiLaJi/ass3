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
                const response = await axios.get('https://getusers-fqquxhhbva-uc.a.run.app');
                const processedUsers = response.data.map(user => {
                    return {
                        email: user.email,
                        gender: user.gender
                    };
                });
                this.jsondata = {code: 200, status: 'success', message:'get all users successful', data: processedUsers};
            }catch (error){
                console.error("Error fetching book count:", error);
                this.jsondata = {code: 400, status: 'failed', message:'get all users failed', data: null};
            }
        }
    }
};

</script>