<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home (Ass3)</router-link>
        </li>
        <li v-if="!user" class="nav-item">
          <router-link to="/fireLogin" class="nav-link" active-class="active">Firebase Login</router-link>
        </li>
        <li v-if="!user" class="nav-item">
          <router-link to="/fireRegister" class="nav-link" active-class="active">Firebase Register</router-link>
        </li>
        <!-- week 9 -->
        <li class="nav-item">
          <router-link to="/GetBookCount" class="nav-link" active-class="active">Get Book Count</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addBookFunction" class="nav-link" active-class="active">Add Book by Function</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/booksFunction" class="nav-link" active-class="active">Query Book by Function</router-link>
        </li>
        <!-- week 9 end -->
        <!-- week 10 -->
        <li v-if="user != null && user !== ''" class="nav-item">
          <router-link to="/WeatherCheck" class="nav-link" active-class="active">Get Weather</router-link>
        </li>
        <li v-if="user != null && user !== ''" class="nav-item">
          <router-link to="/CountBookAPI" class="nav-link" active-class="active">Count Book API</router-link>
        </li>
        <li v-if="user != null && user !== ''" class="nav-item">
          <router-link to="/GetAllBookAPI" class="nav-link" active-class="active">Get All Book API</router-link>
        </li>
        <!-- week 10 end -->
        <!-- week 8-->
        <li v-if="user != null && user !== ''" class="nav-item">
          <router-link to="/logout" class="nav-link" active-class="active">Logout</router-link>
        </li>
        <li v-if="user != null && user !== ''" class="nav-item">
          <router-link to="/addBook" class="nav-link" active-class="active">Add Book</router-link>
        </li>
        <li v-if="user != null && user !== ''" class="nav-item">
          <router-link to="/bookList" class="nav-link" active-class="active">Book List</router-link>
        </li>
        <li v-if="user != null && user !== ''" class="nav-item">
          <router-link to="/SendMail" class="nav-link" active-class="active">Send Mail</router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}

.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>


<script setup>
const user = sessionStorage.getItem('user')
// console.log("header:" + user)
// console.log(user)
</script>