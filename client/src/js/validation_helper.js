module.exports = {
    emailIsValid(email) {
        try {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        catch (ex) {
            console.log(ex);
        }
        return false;
    },
    emailIsNotInUse(email) {
        try {
            return true;
        }
        catch (ex) {
            console.log(ex);
        }
        return false;
    },
    passwordIsValid(password) {
        try {
            return true;
        }
        catch (ex) {
            console.log(ex);
        }
        return false;
    }
}