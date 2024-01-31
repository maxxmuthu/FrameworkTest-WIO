const Utils = require('../library/utils.js')


class IndexPage {

  /*  constructor() {
        this.utils = new Utils();  // Create an instance of the Utils class
    } */

    get makeAppoint() {
        return $('#btn-make-appointment');
    }

    async appointment() {
        
        await Utils.objClick(this.makeAppoint);
    }
}

module.exports = new IndexPage()