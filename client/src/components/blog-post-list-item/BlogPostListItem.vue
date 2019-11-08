<template>
    <div class="col-12 col-sm-6">
        <div class="blog-post card">
            <h3>{{post.title}}</h3>
            <div class="post-excerpt" v-html="post.excerpt">
                {{post.excerpt}}
            </div>
            <div class="post-footer">
                <router-link class="btn btn-block" :to="{ name: 'blog-single', params: {slug: post.URL } }">Read More</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BlogPostListItem',
        props: ['post'],
    }
</script>

<style lang="styl" scoped>
    @import './styles.styl';
</style>