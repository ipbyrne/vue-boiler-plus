module.exports.setSEOData = function (title, description) {
    try {
        let url = window.location.href;
        let image = "";
        // Google / Schema.org Markup
        document.title = title;
        document.getElementsByTagName('meta')["name"].content = title;
        document.getElementsByTagName('meta')["description"].content = description;
        document.getElementsByTagName('meta')["image"].content = image;
        //document.getElementsByTagName('meta')["keywords"].content = "My new page keywords!!"

        // Open Graph Data
        document.getElementsByTagName('meta')["og:title"].content = title;
        document.getElementsByTagName('meta')["og:site_name"].content = "Tracing Delta";
        document.getElementsByTagName('meta')["og:type"].content = 'website';
        document.getElementsByTagName('meta')["og:url"].content = url;
        document.getElementsByTagName('meta')["og:image"].content = image;
        document.getElementsByTagName('meta')["og:description"].content = description;

        // Twitter Card Data
        document.getElementsByTagName('meta')["twitter:card"].content = description;
        document.getElementsByTagName('meta')["twitter:site"].content = url;
        document.getElementsByTagName('meta')["twitter:title"].content = title;
        document.getElementsByTagName('meta')["twitter:description"].content = description;
        document.getElementsByTagName('meta')["twitter:creator"].content = '@TracingDelta';
        document.getElementsByTagName('meta')["twitter:image:src"].content = image;
    } catch(ex) {
        console.log(ex);
    }
}