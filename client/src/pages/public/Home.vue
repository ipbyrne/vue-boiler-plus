<template>
    <div>
        <section class="wrapper-bg-tan">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h1>Home Page</h1>
                    </div>
                </div>
            </div>
        </section>
        <section class="wrapper-bg-white">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h2 class="text-center">Another section!</h2>
                    </div>
                </div>
            </div>
        </section>

        <section class="wrapper-bg-light-gray">
            <div class="container">
                <div class="col-12">
                    <h3>Section 3</h3>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import seo_helper from '../../js/seo_helper.js'

export default {
    name: 'Home',
    beforeCreate: function () {
        seo_helper.setSEOData("Vue Boiler Plus", "A Boiler plate app.");
    },
}
</script>

<style scoped>

</style>
