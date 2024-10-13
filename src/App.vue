<template>
  <header v-if="showHeader">
    <BHeader />
  </header>

  <main>
    <!--LibraryRegistrationForm /-->
    <!-- <JSONLab /> -->
    <router-view></router-view>
  </main>
</template>

<script>
import BHeader from './components/BHeader1.vue'

export default {
  name: 'APP',
  components: {
    BHeader
  },
  computed: {
    showHeader() {
      return (this.$route.name !== 'CountBookAPI' && this.$route.name !== 'GetAllBookAPI');
    }
  }
}

</script>


<style scoped>
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
