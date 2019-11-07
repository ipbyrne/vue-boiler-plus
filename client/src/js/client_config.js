module.exports =  {
  base_url: window.location.origin == "http://localhost:8080" || window.location.origin == "HOSTED DEV URL" ? "http://localhost:5000" : "https://www.tracingdelta.com",
  posts_per_page: 12
}