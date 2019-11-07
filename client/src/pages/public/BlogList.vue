<template>
    <section class="wrapper-bg-tan">
        <div class="container">
            <div class="row blog-list-row">
                <BlogPostListItem 
                    v-for="post in posts"
                    v-bind:key="post.id"
                    v-bind:post="post" 
                ></BlogPostListItem>
            </div>
            <br/>
            <div class="row pagination-row">
                <div class="col-6">
                    <button id="previousPage" class="btn btn-block" style="display: none;" v-on:click="previousPage">Previous</button>
                </div>
                <div class="col-6">
                    <button id="nextPage" class="btn btn-block" style="display: none;" v-on:click="nextPage">Next</button>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import axios from 'axios'
    import client_config from '../../js/client_config.js'
    import seo_helper from '../../js/seo_helper.js'
    import BlogPostListItem from '../../components/blog-post-list-item/BlogPostListItem.vue';

    export default {
        name: 'BlogList',
        components: {
            BlogPostListItem
        },
        data() {
            return {
            posts: {},
            total_posts: 0,
            posts_per_page: client_config.posts_per_page,
            page_index: 1
            }
        },
        beforeCreate: function () {
            seo_helper.setSEOData("Blog - Vue Boiler Plus", "A Boiler plate app.");
        },
        created() {
            this.fetchData()
        },
        mounted() {
            this.togglePaginationButtons()
        },
        updated() {
            this.togglePaginationButtons()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData() {
                axios.get(client_config.wordpress_url + '/posts/?number=' + this.posts_per_page + '&pretty=true&page=' + this.page_index)
                .then((resp) => {
                    resp.data.posts.forEach(post => {
                        let slug = post.URL.split("/")[post.URL.split("/").length - 2]
                        post.URL = slug
                    })
                    this.posts = resp.data.posts
                    this.total_posts = resp.data.found
                    this.posts_per_page = this.posts.length
                })
                .catch((err) => {
                    console.log(err)
                })
            },
            nextPage() {
                this.page_index = this.page_index + 1
                this.togglePaginationButtons()
                this.fetchData()
            },
            previousPage() {
                this.page_index = this.page_index - 1
                this.togglePaginationButtons()
                this.fetchData()
            },
            togglePaginationButtons() {
                if (this.page_index === 1) {
                    document.getElementById('previousPage').classList.add('hide')
                } else {
                    document.getElementById('previousPage').classList.remove('hide')
                }
                if (this.page_index === Math.floor(this.total_posts/this.posts_per_page)) {
                    document.getElementById('nextPage').classList.add('hide')
                } else {
                    document.getElementById('nextPage').classList.remove('hide')
                }
            }
        }
    }
</script>

<style scoped>
    .blog-list-row {
        padding: 16px;
    }
    .blog-post {
        max-width: 550px;
        margin: auto;
        border: 1px solid #000;
        padding: 32px 16px;
        margin-bottom: 32px;
        height: 297px;
        position:relative
    }

    .post-excerpt {
        height: 125px;
        overflow: hidden
    }
    
    .pagination-row {
        max-width: 360px;
        margin: auto;
    }

    .post-footer {
        position: absolute;
        bottom: 32px !important;
        left: 16px;
        width: calc(100% - 32px);
        max-width: 516px; 
    }
</style>