let client_config =  {
  base_url: window.location.origin == "http://localhost:8080" || window.location.origin == "HOSTED DEV URL" ? "http://localhost:5000" : "https://www.tracingdelta.com",
  wordpress_url: 'https://public-api.wordpress.com/rest/v1.1/sites/<wp site id>',
  posts_per_page: 12
}
export default client_config;