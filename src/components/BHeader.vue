<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <link rel="icon" href="/favicon.ico">
  <div class="container">
    <header class="d-flex justify-content-center py-2 border-bottom">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <img class="d-block mx-auto" src="/Tools.png" alt="Tools" width="40" height="32">
        <span class="fs-4">Tools</span>
      </a>
      <ul class="nav nav-pills">
        <li v-if="user != null && user !== '' && role == 'admin'" class="nav-item">
          <router-link to="/dashboard" class="nav-link" active-class="active" aria-current="page">Dash</router-link>
        </li>
        <li v-if="user == null || user == ''" class="nav-item">
          <router-link to="/GetAllBookAPI" class="nav-link" active-class="active">Books API</router-link>
        </li>
        <li v-if="user == null || user == ''" class="nav-item">
          <router-link to="/UserAPI" class="nav-link" active-class="active">Users API</router-link>
        </li>
        <li v-if="user != null && user !== ''" class="nav-item">
          <router-link to="/admin" class="nav-link" active-class="active" aria-current="page">Admin</router-link>
        </li>
        <li v-if="user != null && user !== ''" class="nav-item">
          <router-link to="/addBook" class="nav-link" active-class="active">Add Book</router-link>
        </li>
        <li v-if="user != null && user !== ''" class="nav-item">
          <router-link to="/sendMail" class="nav-link" active-class="active" aria-current="page">Mail</router-link>
        </li>
        <li v-if="user != null && user !== ''" class="nav-item">
          <router-link to="/WeatherCheck" class="nav-link" active-class="active">Weather</router-link>
        </li>
        <li v-if="user != null && user !== ''" class="nav-item">
          <router-link to="/map" class="nav-link" active-class="active">Map</router-link>
        </li>
        <li v-if="user != null && user !== ''" class="nav-item">
          <router-link to="/pathNav" class="nav-link" active-class="active">Path</router-link>
        </li>
        <li v-if="user != null && user !== ''" class="nav-item">
          <router-link to="/ai" class="nav-link" active-class="active">GenAI</router-link>
        </li>
      </ul>
      <div class="col-md-3 text-end">
        <button v-if="user == null || user == ''" type="button" class="btn btn-outline-primary me-2"><router-link to="/login" class="nav-link">Login</router-link></button>
        <button v-if="user == null || user == ''" type="button" class="btn btn-outline-success me-2"><router-link to="/register" class="nav-link">Sign-up</router-link></button>
        <button v-if="user != null && user != ''" type="button" class="btn btn-outline-secondary me-2"><router-link to="/logout" class="nav-link">{{ user }}</router-link></button>
      </div>
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

ul li {
  font-size: 24px;
}
</style>


<script setup>
const user = sessionStorage.getItem('user')
const role = sessionStorage.getItem('role')
</script>