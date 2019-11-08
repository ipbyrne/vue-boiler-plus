<template>
    <section class="wrapper-bg-tan">
        <div class="container">
            <p>TOS</p>
        </div> 
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
