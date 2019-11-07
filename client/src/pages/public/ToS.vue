<template>
    <section class="wrapper-bg-tan">
        <p>TOS</p>
    </section>
</template>

<script>
import seo_helper from '../../js/seo_helper.js'

export default {
  name: 'ToS',
  beforeCreate: function () {
    seo_helper.setSEOData("Terms of Service - Vue Boiler Plus", "A Boiler plate app.");
  }
}
</script>

<style scoped>
  
</style>
