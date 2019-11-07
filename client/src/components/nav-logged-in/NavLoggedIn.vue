<template>
    <nav id="nav" class="td-nav">
        <a class="nav-brand" href="/">
            Vue Boiler Plus
        </a>
        <div class="nav-items-container">
            <ul>
                <li>
                    <router-link class="nav-link" v-on:click="toggleNav" to="/app/my-account">
                        <span v-on:click="toggleNav">My Account</span>
                    </router-link>
                </li>
                <li>
                    <a href="javascript:void()" class="btn" v-on:click="logOut">
                        <span>Log Out</span>
                    </a>
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
        name: 'NavLoggedIn',
        methods: {
            logOut: function () {
                localStorage.setItem('token', "")
                window.location.href = "/sign-in"
            },
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