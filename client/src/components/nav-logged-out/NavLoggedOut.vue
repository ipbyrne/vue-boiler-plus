<template>
    <nav id="nav" class="td-nav">
        <a class="nav-brand" href="/">
            Vue Boiler Plus
        </a>
        <div class="nav-items-container">
            <ul>
                <li>
                    <router-link class="nav-link" v-on:click="toggleNav" to="/blog">
                        <span v-on:click="toggleNav">Blog</span>
                    </router-link>
                </li>
                <li>
                    <router-link class="nav-link" v-on:click="toggleNav" to="/contact">
                        <span v-on:click="toggleNav">Contact</span>
                    </router-link>
                </li>
                <li>
                    <router-link class="btn" v-on:click="toggleNav" to="/sign-in">
                        <span v-on:click="toggleNav">Sign In</span>
                    </router-link>
                </li>
            </ul>
            <a href="javascript:void(0);" v-on:click="toggleNav" class="icon nav-mobile-toggler">
                <i id="nav-icon" class="fas fa-bars"></i>
            </a>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'NavLoggedOut',
        methods: {
            toggleNav: function() {
                if (window.innerWidth <= 767) {
                    document.querySelectorAll(".nav-items-container > ul")[0].classList.toggle("responsive");
                    document.getElementById("nav-icon").classList.toggle("fa-bars");
                    document.getElementById("nav-icon").classList.toggle("fa-times");
                    document.getElementsByClassName("nav-mobile-toggler")[0].classList.toggle("responsive");
                }
            }
        }
    }
</script>

<style lang="styl" scoped>
    @import './styles.styl';
</style>