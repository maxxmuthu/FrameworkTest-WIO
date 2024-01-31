const Utils = require('../library/utils.js')

class AppointPage {

    get appointTitle() {
        return $('//h2[text()="Make Appointment"]')
    }


    async verifylogin() {

        await Utils.objGetText(this.appointTitle);
        //await Utils.getCustomText(this.appointTitle);
        //await console.log()
        //await appointTitle().getText();
        //await Utils.doSetValue(this.passwordTextBox, password);
        //await Utils.objClick(this.loginBtn);
    }

}

module.exports = new AppointPage()