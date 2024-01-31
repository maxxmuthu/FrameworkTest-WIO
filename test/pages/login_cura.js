const Utils = require('../library/utils.js')

class LoginPage {

    get usernameTextBox() {
        return $('#txt-username')
    }

    get passwordTextBox() {
        return $('#txt-password')
    }

    get loginBtn() {
        return $('#btn-login')
    }

    async login(username, password) {

        await Utils.doSetValue(this.usernameTextBox, username);
        await Utils.doSetValue(this.passwordTextBox, password);
        await Utils.objClick(this.loginBtn);
    }

}

module.exports = new LoginPage()