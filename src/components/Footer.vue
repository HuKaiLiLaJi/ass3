<template>
  <div class="container mt-5">
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div class="col-md-4 d-flex align-items-center">
        <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
          <svg class="bi" width="30" height="24">
            <use xlink:href="#bootstrap" />
          </svg>
        </a>
        <span class="mb-3 mb-md-0 text-muted">&copy; 2024 <strong>Yupeng Liu</strong>. All rights reserved.</span>
      </div>

      <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li class="ms-3"><a class="text-muted" href="#"><img src="/twitter.png" alt="twitter" width="30" height="30"></a></li>
        <li class="ms-3"><a class="text-muted" href="#"><img src="/instagram.png" alt="instagram" width="30" height="30"></a></li>
        <li class="ms-3"><a class="text-muted" href="mailto:yupengliu92@gmail.com" ><img src="/email.png" alt="email" width="30" height="30"></a></li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'FooterCopyright',
};
</script>

<style scoped>

</style>