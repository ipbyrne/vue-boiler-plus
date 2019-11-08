let validation_helper = {
    emailIsValid: function (email) {
        try {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        catch (ex) {
            console.log(ex);
        }
        return false;
    },
    emailIsNotInUse: function(email) {
        try {
            return true;
        }
        catch (ex) {
            console.log(ex);
        }
        return false;
    },
    passwordIsValid: function (password) {
        try {
            return true;
        }
        catch (ex) {
            console.log(ex);
        }
        return false;
    }
}
export default validation_helper;