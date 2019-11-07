<template>
    <section class="wrapper-bg-tan">
        <div class="container post-content">
            <div class="post-header">
                <h1>{{post.title}}</h1>
                <span><strong>Posted On {{post.date}}</strong></span>
            </div>
            <div v-html="post.content" class="post-data">
                {{post.content}}
            </div>
            <div class="comments">
                <vue-disqus shortname="tracing-delta" :identifier="post.ID" :url="url"></vue-disqus>
            </div>
        </div>
    </section> 
</template>

<script>
    import axios from 'axios'
    import seo_helper from '../../js/seo_helper.js'
    import client_config from '../../js/client_config.js'

    export default {
        name: 'BlogSingle',

        data() {
            return {
            post: {
                title: "",
                date: "",
                author: {
                    name: ""
                },
                content: ""
            },
            url: ""
            }
        },

        created: function () {
            this.fetchData()
        },

        watch: {
            '$route': 'fetchData'
        },

        methods: {
            fetchData: function () {
                axios.get(client_config.wordpress_url + '/posts/slug:' + this.$route.params.slug)
                .then((resp) => {
                    this.post = resp.data
                    this.post.ID = this.post.ID.toString();
                    this.url = client_config.base_url + "/blog/" + this.post.slug;
                    let date = new Date(this.post.date)
                    this.post.date = date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear()
                    seo_helper.setSEOData(this.post.title, this.post.excerpt)
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style>
    .post-content {
        max-width: 768px;
        display: block;
        margin: auto;
        margin-bottom: 32px;
    }

    .post-content img {
        max-width: 100%;
        display: block;
        margin: auto;
    }

    .post-header {
        margin-bottom: 16px;
        text-align: center;
    }

    .post-data {
        text-align: justify;
    }
    
    .comments {
        max-width: 600px;
        margin: auto;
    }
</style>