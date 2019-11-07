<template>
    <section class="wrapper-bg-tan">
        <p>Privacy Policy</p>
    </section>
</template>

<script>
import seo_helper from '../../js/seo_helper.js'

export default {
  name: 'PrivacyPolicy',
  beforeCreate: function () {
    seo_helper.setSEOData("Privacy Policy- Vue Boiler Plus", "A Boiler plate app.");
  },
}
</script>

<style scoped>
  
</style>
