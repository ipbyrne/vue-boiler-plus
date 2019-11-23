// DEV VERSION
module.exports = !process.env.PORT ? {
    secret: "super-secret",
    token_expiration: 1440,
    mongo_connection_string: "mongodb+srv://<username>:<password>@<mongu_url>.mongodb.net/<dev db name>?retryWrites=true&w=majority",
    smtp_server: "smtp-relay.gmail.com",
    smpt_port: 465,
    smtp_user: "email@gmail.com",
    smtp_password: "password",
    default_server_email: "email@gmail.com",
} : {
    secret: "10986",
    token_expiration: 1440,
    mongo_connection_string: "mongodb+srv://<username>:<password>@<mongu_url>.mongodb.net/<prod db name>?retryWrites=true&w=majority",
    smtp_server: "smtp-relay.gmail.com",
    smpt_port: 465,
    smtp_user: "email@gmail.com",
    smtp_password: "password",
    default_server_email: "email@gmail.com",
}
