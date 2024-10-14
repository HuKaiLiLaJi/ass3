<template>
  <header v-if="showHeader">
    <BHeader />
  </header>

  <main>
    <router-view></router-view>
  </main>
  <footer v-if="showHeader">
    <BFooter></BFooter>
  </footer>
</template>

<script>
import BHeader from './components/BHeader.vue'
import BFooter from './components/Footer.vue';

export default {
  name: 'APP',
  components: {
    BHeader, BFooter
  },
  computed: {
    showHeader() {
      return (this.$route.name !== 'UserAPI' && this.$route.name !== 'GetAllBookAPI');
    }
  }
}

</script>


<style scoped>
  main {
    min-height: 90%;
  }
</style>
