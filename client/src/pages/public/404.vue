<template>
  <section class="wrapper-bg-tan">
    <div class="container">
      <h1>404!</h1>
    </div>
  </section>
</template>

<script>
import seo_helper from '../../js/seo_helper.js'

export default {
  name: 'NotFound',
  beforeCreate: function () {
    seo_helper.setSEOData("404! - Vue Boiler Plus", "A Boiler plate app.");
  },
}
</script>

<style scoped>

</style>
