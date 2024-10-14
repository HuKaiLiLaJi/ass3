<template>
    <div class="px-4 py-2 my-2 text-center">
        <img class="d-block mx-auto mb-4" src="/Tools.png" alt="">
        <h1 class="display-5 fw-bold">Welcome to Tools — Your One-Stop Life Assistant</h1>
        <div class="col-lg-6 mx-auto">
            <h3>Simplifying and Enhancing Your Daily Life</h3>
            <p class="lead mb-4">In today's fast-paced world, we understand the need for a reliable companion to help manage your daily tasks. Tools is a multi-functional platform designed to simplify your life by providing one-stop solutions for various needs.</p>
            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <button type="button" class="btn btn-primary btn-lg px-4 gap-3">Click Login to Join Tools</button>
                <button type="button" class="btn btn-outline-secondary btn-lg px-4">Click Sign Up to Learn More</button>
            </div>
        </div>
    </div>
    

    <div class="album py-5 bg-light">
    <div class="container">

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col">
          <div class="card shadow-sm">
            <img src="/book.svg" alt="book" width="420px" height="225px">
            <div class="card-body">
                <h2>Book Collection</h2>
              <p class="card-text">Our book collection feature allows you to easily manage your reading list.</p>
              <div class="d-flex justify-content-between align-items-center">
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card shadow-sm">
            <img src="/email.svg" alt="email" width="420px" height="225px">
            <div class="card-body">
                <h2>Email Sending</h2>
              <p class="card-text">Send emails quickly and securely, keeping you connected with ease.</p>
              <div class="d-flex justify-content-between align-items-center">
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card shadow-sm">
            <img src="/weather.svg" alt="weather" width="420px" height="225px">
            <div class="card-body">
                <h2>Weather Forecast</h2>
              <p class="card-text">We provide accurate local weather forecasts to ensure you are always in the know.</p>
              <div class="d-flex justify-content-between align-items-center">
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card shadow-sm">
            <img src="/Location.svg" alt="Location" width="420px" height="225px">
            <div class="card-body">
                <h2>Search Places</h2>
              <p class="card-text">You can easily search for specific locations using a dynamic search bar powered by geolocation data.</p>
              <div class="d-flex justify-content-between align-items-center">
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card shadow-sm">
            <img src="/navigation.svg" alt="navigation" width="420px" height="225px">
            <div class="card-body">
                <h2>Navigation</h2>
              <p class="card-text">You can get turn-by-turn directions from one location to another with for various travel modes.</p>
              <div class="d-flex justify-content-between align-items-center">
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card shadow-sm">
            <img src="/chat.svg" alt="" width="420px" height="225px">
            <div class="card-body">
                <h2>GenAI Chat</h2>
              <p class="card-text">You can ask questions or get help navigating the site with real-time, AI-driven responses.</p>
              <div class="d-flex justify-content-between align-items-center">
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>

</template>

<script>
// import axios from 'axios';

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
            try {
                // const response = await axios.get('https://getbooks-fqquxhhbva-uc.a.run.app');
                // this.books = response.data;
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        }
    }
};


</script>
<style scoped>
#main {
    width: 60%;
}
</style>